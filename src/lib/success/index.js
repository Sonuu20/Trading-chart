import { formatDateTime } from "@/utils/dateTime";

/**
 * Base application success class.
 * Structured success messages with optional custom title and metadata.
 */
class AppSuccess {
  /**
   * @param {string} message - The success message.
   * @param {object} [options] - Optional additional details.
   * @param {string} [options.title='Success'] - Title for the success message.
   * @param {object} [options.metadata={}] - Additional metadata.
   */
  constructor(message, { title = "Success", metadata = {} } = {}) {
    this.message = message;
    this.title = title;
    this.metadata = metadata;
    this.timestamp = formatDateTime(new Date(), "yyyy-MM-dd HH:mm:ss");
  }
}

/**
 * Success class for creation operations.
 */
class CreateSuccess extends AppSuccess {
  constructor(message, options = {}) {
    super(message, { title: "Created Successfully", ...options });
  }
}

/**
 * Success class for update operations.
 */
class UpdateSuccess extends AppSuccess {
  constructor(message, options = {}) {
    super(message, { title: "Updated Successfully", ...options });
  }
}

/**
 * Success class for deletion operations.
 */
class DeleteSuccess extends AppSuccess {
  constructor(message, options = {}) {
    super(message, { title: "Deleted Successfully", ...options });
  }
}

export { AppSuccess, CreateSuccess, UpdateSuccess, DeleteSuccess };
