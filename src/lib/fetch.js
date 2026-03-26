import { ApiError } from "@/lib/error";
import { getApiRoute } from "@/services/apiRoutes";
// import { BACKEND_URLS } from "@/utils/constants";
import { buildQueryString } from "@/utils/url";

function getBackendBaseUrlFromHost() {
  if (import.meta.env.VITE_HOSTING_ENVIRONMENT !== "cloud")
    return import.meta.env.VITE_BACKEND_BASE_URL;

  const hostname = window.location.hostname;

  // if (hostname.endsWith(".vercel.app")) {
  //   return BACKEND_URLS.demo;
  // }

  if (hostname === import.meta.env.VITE_CLOUD_HOSTNAME)
    return import.meta.env.VITE_BACKEND_BASE_URL;

  const subdomain =
    hostname.split(".")[0] === "www"
      ? hostname.split(".")[1]
      : hostname.split(".")[0];

  const allowedTenants = import.meta.env.VITE_TENANTS?.split(",") || [];

  if (!allowedTenants.includes(subdomain)) {
    throw new Error(`TENANT NOT ALLOWED`);
  }

  const backendBaseUrl = BACKEND_URLS[subdomain];
  if (!backendBaseUrl) {
    throw new Error(`MISSING API URL FOR TENANT`);
  }

  return backendBaseUrl;
}

export async function fetchResponseFromDB(routeKey, options = {}) {
  const route = getApiRoute(routeKey);
  if (!route) throw new Error(`Invalid route: ${routeKey}`);

  const { path, method, auth, contentType } = route;
  // const token = cookieStoreGetAuthToken();

  if (auth && !token) throw new Error("No Auth Token Found!");

  const normalizedAdditionalPath = options.additionalPath
    ? options.additionalPath.startsWith("/")
      ? options.additionalPath
      : `/${options.additionalPath}`
    : "";

  const fullPathWithoutQuery = `${path}${normalizedAdditionalPath}`;

  const queryString =
    method === "GET" && options.query ? buildQueryString(options.query) : "";

  const fullPath = queryString
    ? `${fullPathWithoutQuery}?${queryString}`
    : fullPathWithoutQuery;

  const baseUrl = getBackendBaseUrlFromHost();

  const fullUrl = /^https?:\/\//.test(fullPath) ? fullPath : baseUrl + fullPath;

  const isFormData = options.body instanceof FormData;

  const headers = {
    ...(isFormData ? {} : contentType ? { "Content-Type": contentType } : {}),
    ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options?.headers || {}),
  };

  const { additionalPath, ...fetchOptions } = options;

  return fetch(fullUrl, {
    method,
    ...fetchOptions,
    headers,
  });
}

export async function fetchFromDB(routeKey, options = {}) {
  try {
    const response = await fetchResponseFromDB(routeKey, options);
    const result = await response.json();

    if (!response.ok) {
      const errorMsg =
        result?.error ||
        result?.detail ||
        result?.message ||
        "Unknown API Error";

      throw new ApiError(errorMsg, response.status, {
        metadata: { routeKey, responseBody: result },
      });
    }

    return result;
  } catch (error) {
    if (error instanceof ApiError) throw error;

    throw new ApiError(error.message || "Unexpected fetch error", 500, {
      metadata: { routeKey, originalError: error },
    });
  }
}
