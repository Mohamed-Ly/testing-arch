// ======================= USER AUTHORIZATION =======================
// Permission and operation-based authorization middleware
// Checks if user has required page permission and operation permission

import AppError from "../utils/AppError.js";
import { ERROR_MESSAGES } from "../../config/messages.js";
import { PERMISSIONS, OPERATIONS } from "../../config/permissions.js";

const hasPermission = (permissionId) => {
  return (req, res, next) => {
    const userPermissions = req.authUser?.permissions || [];
    const hasPerm = userPermissions.some((p) => p.permissionId === permissionId);
    if (!hasPerm) {
      return next(new AppError(ERROR_MESSAGES.PAGE_PERMISSION_DENIED, 403, "FORBIDDEN"));
    }
    next();
  };
};

const hasOperation = (operationId) => {
  return (req, res, next) => {
    const userPermissions = req.authUser?.permissions || [];
    // Get the lowercase name of the operation (e.g., "create", "read", "update", "delete")
    const operationName = Object.keys(OPERATIONS).find(
      (key) => OPERATIONS[key] === operationId
    )?.toLowerCase();

    const hasOp = userPermissions.some((p) => {
      let ops = p.operations;
      if (typeof ops === "string") {
        ops = JSON.parse(ops);
      }
      // Operations can be stored as numbers [1,2,3] or strings ["create","read","update"]
      return ops.some((op) => op === operationId || op === operationName);
    });

    if (!hasOp) {
      return next(new AppError(ERROR_MESSAGES.OPERATION_NOT_ALLOWED, 403, "OPERATION_NOT_ALLOWED"));
    }
    next();
  };
};

export { hasPermission, hasOperation };