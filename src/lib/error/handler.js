import { ValidationError, ApiError, AuthError } from "@/lib/error";

/**
 * Handles an error by logging it and optionally showing a toast notification (client-side only).
 *
 * @param {Error} error - The error object to handle.
 * @param {Object} options - Optional configuration.
 * @param {boolean} [options.showToast=true] - Whether to show a toast notification (only on client).
 * @param {string} [options.title] - Optional custom toast title to override default.
 * @param {Function} toast - The toast function (e.g., from useToast).
 */
export function handleError(error, options = {}, toast) {
  const isClient = typeof window !== "undefined";

  if (!isClient) {
    return;
  }

  const showToast = options.showToast !== undefined ? options.showToast : true;

  console.error(
    `[${error.timestamp}] ${error.name} (${error.errorRunId}):`,
    error,
  );

  if (!showToast || typeof toast !== "function") return;

  // Error → toast mapping
  const toastMap = new Map([
    [ValidationError, { title: "Validation Warning", variant: "warning" }],
    [AuthError, { title: "Authentication Error", variant: "destructive" }],
    [
      ApiError,
      { title: `API Error (${error.statusCode})`, variant: "destructive" },
    ],
  ]);

  let toastInfo = [...toastMap.entries()].find(
    ([ErrorClass]) => error instanceof ErrorClass,
  )?.[1];

  // Default fallback
  toastInfo = toastInfo || { title: "Error", variant: "destructive" };

  // Use custom title from options if provided, else default title from mapping
  const toastTitle = options.title || toastInfo.title;

  toast({
    title: toastTitle,
    description: error.message || "Something went wrong.",
    variant: toastInfo.variant,
  });
}
