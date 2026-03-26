import {
  AppSuccess,
  CreateSuccess,
  UpdateSuccess,
  DeleteSuccess,
} from "@/lib/success";

/**
 * Handles a success message by logging it and optionally showing a toast notification (client-side only).
 *
 * @param {AppSuccess|Object|string} success - The success object, plain object, or string message.
 * @param {Object} options - Optional configuration.
 * @param {boolean} [options.showToast=true] - Whether to show a toast notification (only on client).
 * @param {string} [options.toastTitle] - Optional toast title override.
 * @param {string} [options.toastDescription] - Optional toast description override.
 * @param {Function} toast - The toast function (e.g., from useToast).
 */
export function handleSuccess(success, options = {}, toast) {
  const isClient = typeof window !== "undefined";

  // Normalize to AppSuccess instance
  let successData;
  if (success instanceof AppSuccess) {
    successData = success;
  } else if (typeof success === "object" && success !== null) {
    successData = new AppSuccess(success.message || "", {
      title: success.title,
      metadata: success.metadata,
    });
  } else {
    successData = new AppSuccess(success);
  }

  if (!isClient) {
    // SSR: just log with timestamp and title

    return;
  }

  // Client side log

  const showToast = options.showToast !== undefined ? options.showToast : true;
  if (!showToast || typeof toast !== "function") return;

  // Map success classes to toast config (title, variant)
  const toastMap = new Map([
    [CreateSuccess, { title: "Created Successfully", variant: "default" }],
    [UpdateSuccess, { title: "Updated Successfully", variant: "default" }],
    [DeleteSuccess, { title: "Deleted Successfully", variant: "default" }],
    [AppSuccess, { title: successData.title, variant: "default" }],
  ]);

  // Find matching toast info based on instance
  let toastInfo = [...toastMap.entries()].find(
    ([SuccessClass]) => successData instanceof SuccessClass,
  )?.[1];

  // Fallback default
  toastInfo = toastInfo || { title: successData.title, variant: "default" };

  toast({
    title: options.toastTitle || toastInfo.title,
    description: options.toastDescription || successData.message,
    variant: toastInfo.variant,
  });
}
