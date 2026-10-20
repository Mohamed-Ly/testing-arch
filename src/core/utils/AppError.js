// ======================= CUSTOM ERROR CLASS =======================
// Operational error class for consistent error handling
// Extends Error with statusCode, status, key, and operational flag

class AppError extends Error {
  constructor(message, statusCode, key, errors) {
    super(message);
    this.statusCode = statusCode ? statusCode : 500;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.key = key || "UNKNOWN_ERROR";
    this.errors = errors;
    this.isOperational = true;
  }
}

export default AppError;