import { formatDateTime } from "@/utils/dateTime";
import { v4 as uuidv4 } from "uuid";

/**
 * Base application error class.
 *
 * Not exported directly. Acts as a foundation for all custom error types.
 */
class AppError extends Error {
  /**
   * Creates an instance of AppError.
   *
   * @param {string} message - A human-readable description of the error.
   * @param {object} [options] - Optional error context.
   * @param {string} [options.errorType='app'] - Category/type of the error (e.g., 'validation', 'api', 'auth').
   * @param {string|number|null} [options.errorCode=null] - Application-specific or API-specific error code.
   * @param {object} [options.metadata={}] - Additional metadata useful for debugging (e.g., userId, context info).
   * @param {string|null} [options.errorRunId=null] - Unique ID for this specific error instance. Auto-generated if not provided.
   */
  constructor(
    message,
    {
      errorType = "app",
      errorCode = null,
      metadata = {},
      errorRunId = null,
    } = {}
  ) {
    super(message);

    // Set the error name to match the class name
    this.name = this.constructor.name;

    // Assign classification and metadata
    this.errorType = errorType;
    this.errorCode = errorCode;
    this.metadata = { ...metadata };

    // Generate or reuse a unique error ID for this occurrence
    this.errorRunId = errorRunId || uuidv4();

    // Timestamp the error for logging and tracing
    this.timestamp = formatDateTime(new Date(), "yyyy-MM-dd HH:mm:ss");

    // Capture the stack trace (for V8 environments)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * Error class for validation-related issues.
 *
 * Example: missing required fields, invalid input format.
 */
class ValidationError extends AppError {
  constructor(message, options = {}) {
    super(message, {
      errorType: "validation",
      errorCode: "VALIDATION_ERROR",
      ...options,
    });
  }
}

/**
 * Error class for API-related failures.
 *
 * Example: HTTP errors, server responses with non-2xx status codes.
 */
class ApiError extends AppError {
  /**
   * @param {string} message - Error message from the API or describing the issue.
   * @param {number} statusCode - HTTP status code returned by the API.
   * @param {object} [options] - Optional additional error details.
   */
  constructor(message, statusCode, options = {}) {
    super(message, {
      errorType: "api",
      errorCode: `API_ERROR_${statusCode}`,
      ...options,
    });

    this.statusCode = statusCode;
  }
}

/**
 * Error class for authentication or authorization issues.
 *
 * Example: invalid tokens, insufficient permissions.
 */
class AuthError extends AppError {
  constructor(message, options = {}) {
    super(message, {
      errorType: "auth",
      errorCode: "AUTH_ERROR",
      ...options,
    });
  }
}

// Export only specific error types
export { ValidationError, ApiError, AuthError, AppError };
