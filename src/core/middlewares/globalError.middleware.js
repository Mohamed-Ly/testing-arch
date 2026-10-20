// ======================= GLOBAL ERROR HANDLER =======================
// Centralized error handling middleware
// Handles operational errors, validation errors, Sequelize errors, and unknown errors

import { ERROR_MESSAGES } from "../../config/messages.js";
import AppError from "../utils/AppError.js";

const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return res.status(400).json({
      status: "fail",
      key: "VALIDATION_ERROR",
      message: ERROR_MESSAGES.VALIDATION_FAILED,
      errors,
    });
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    const field = err.errors[0]?.path || "field";
    return res.status(409).json({
      status: "fail",
      key: "DUPLICATE_ENTRY",
      message: `${field} already exists`,
    });
  }

  if (err.name === "SequelizeForeignKeyConstraintError") {
    return res.status(400).json({
      status: "fail",
      key: "FOREIGN_KEY_ERROR",
      message: "Invalid reference ID provided",
    });
  }

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      key: err.key,
      message: err.message,
      errors: err.errors,
    });
  }

  console.error("ERROR 💥", err);
  return res.status(500).json({
    status: "error",
    key: "INTERNAL_SERVER_ERROR",
    message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
  });
};

export default globalError;