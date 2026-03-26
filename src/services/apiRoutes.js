const UMS_ROUTES = {};

const FMS_ROUTES = {};

const DMS_ROUTES = {
  kLinkes: {
    klines: {
      path: "/klines",
      method: "GET",
      auth: false,
      bodyType: "raw",
    },
  },
};

const API_ROUTES = {
  ums: UMS_ROUTES,
  fms: FMS_ROUTES,
  dms: DMS_ROUTES,
};

/**
 * Get the full route object using a dot-separated path or multiple arguments.
 * Examples:
 *  - getApiRoute("ums.user.login")
 *  - getApiRoute("ums", "user", "login")
 */
export function getApiRoute(...args) {
  if (!args.length) return undefined;

  const keys = args.flatMap((arg) =>
    typeof arg === "string" ? arg.split(".") : [],
  );
  if (!keys.length) return undefined;

  const [service, ...rest] = keys;
  const root = API_ROUTES[service];
  if (!root) return undefined;

  return rest.reduce((acc, key) => acc?.[key], root);
}

/**
 * Get only the `.path` string from the route
 */
export function getApiPath(...args) {
  const route = getApiRoute(...args);
  return typeof route?.path === "string" ? route.path : undefined;
}

/**
 * Search route object by exact `path` string
 */
export function getRouteByPath(targetPath) {
  if (!targetPath || typeof targetPath !== "string") return undefined;

  function search(obj) {
    for (const key in obj) {
      const value = obj[key];
      if (value?.path === targetPath) return value;
      if (typeof value === "object" && value !== null) {
        const result = search(value);
        if (result) return result;
      }
    }
    return undefined;
  }

  return [UMS_ROUTES, FMS_ROUTES, DMS_ROUTES, SRM_ROUTES]
    .map(search)
    .find(Boolean);
}
