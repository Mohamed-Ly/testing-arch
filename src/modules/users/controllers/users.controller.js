// ======================= USERS CONTROLLER =======================
// Request handlers for user management endpoints
// Profile management, admin user CRUD, password change

import handleAsync from "../../../core/utils/handleAsync.js";
import AppError from "../../../core/utils/AppError.js";
import { USER_MESSAGES } from "../users.config.js";
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from "../../../config/messages.js";
import * as usersService from "../services/users.service.js";
import path from "path";

export const getOwnProfile = handleAsync(async (req, res, next) => {
  const result = await usersService.getOwnProfile(req.authUser.id);

  if (result === USER_MESSAGES.ERROR.NOT_FOUND) {
    return next(new AppError(result, 404, "NOT_FOUND"));
  }

  return res.status(200).json({
    data: result,
  });
});

export const updateOwnProfile = handleAsync(async (req, res, next) => {
  const result = await usersService.updateOwnProfile(req.authUser.id, req.body);

  switch (result) {
    case USER_MESSAGES.ERROR.NOT_FOUND:
      return next(new AppError(result, 404, "NOT_FOUND"));
    case USER_MESSAGES.ERROR.USERNAME_EXISTS:
      return next(new AppError(result, 409, "DUPLICATE_USERNAME"));
    case USER_MESSAGES.ERROR.UPDATE_FAILED:
      return next(new AppError(result, 500, "UPDATE_FAILED"));
    default:
      return res.status(200).json({
        message: SUCCESS_MESSAGES.OPERATION_SUCCESSFUL,
      });
  }
});

export const changeOwnPassword = handleAsync(async (req, res, next) => {
  const result = await usersService.changeOwnPassword(req.authUser.id, req.body);

  switch (result) {
    case USER_MESSAGES.ERROR.NOT_FOUND:
      return next(new AppError(result, 404, "NOT_FOUND"));
    case USER_MESSAGES.ERROR.CURRENT_PASSWORD_INCORRECT:
      return next(new AppError(result, 401, "INVALID_PASSWORD"));
    case USER_MESSAGES.ERROR.SAME_PASSWORD:
      return next(new AppError(result, 400, "SAME_PASSWORD"));
    case USER_MESSAGES.ERROR.UPDATE_FAILED:
      return next(new AppError(result, 500, "UPDATE_FAILED"));
    default:
      return res.status(200).json({
        message: SUCCESS_MESSAGES.OPERATION_SUCCESSFUL,
      });
  }
});

export const createUser = handleAsync(async (req, res, next) => {
  const result = await usersService.createUser(req.body);

  switch (result) {
    case USER_MESSAGES.ERROR.EMAIL_EXISTS:
      return next(new AppError(result, 409, "DUPLICATE_EMAIL"));
    case USER_MESSAGES.ERROR.USERNAME_EXISTS:
      return next(new AppError(result, 409, "DUPLICATE_USERNAME"));
    default:
      return res.status(201).json({
        message: SUCCESS_MESSAGES.OPERATION_SUCCESSFUL,
      });
  }
});

export const listUsers = handleAsync(async (req, res, next) => {
  const { page, size, search } = req.query;
  const result = await usersService.listUsers(page, size, search);

  return res.status(200).json({
    ...result,
  });
});

export const getUserById = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await usersService.getUserById(id);

  if (user === USER_MESSAGES.ERROR.NOT_FOUND) {
    return next(new AppError(USER_MESSAGES.ERROR.NOT_FOUND, 404, "NOT_FOUND"));
  }

  return res.status(200).json({
    data: user,
  });
});

export const updateUser = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await usersService.updateUser(id, req.body);

  switch (result) {
    case USER_MESSAGES.ERROR.NOT_FOUND:
      return next(new AppError(result, 404, "NOT_FOUND"));
    case USER_MESSAGES.ERROR.USERNAME_EXISTS:
      return next(new AppError(result, 409, "DUPLICATE_USERNAME"));
    case USER_MESSAGES.ERROR.EMAIL_EXISTS:
      return next(new AppError(result, 409, "DUPLICATE_EMAIL"));
    default:
      return res.status(200).json({
        message: SUCCESS_MESSAGES.OPERATION_SUCCESSFUL,
      });
  }
});

export const softDeleteUser = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await usersService.softDeleteUser(id, req.authUser.id);

  switch (result) {
    case USER_MESSAGES.ERROR.NOT_FOUND:
      return next(new AppError(result, 404, "NOT_FOUND"));
    case USER_MESSAGES.ERROR.CANNOT_DELETE_SELF:
      return next(new AppError(result, 409, "CANNOT_DELETE_SELF"));
    case USER_MESSAGES.ERROR.CANNOT_DELETE_ADMIN:
      return next(new AppError(result, 409, "CANNOT_DELETE_ADMIN"));
    default:
      return res.status(200).json({
        message: SUCCESS_MESSAGES.OPERATION_SUCCESSFUL,
      });
  }
});

export const uploadProfilePicture = handleAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError(ERROR_MESSAGES.IMAGE_REQUIRED, 400));
  }
  const relativePath = path.join(req.uploadPath.relativePath, req.file.filename);

  const result = await usersService.uploadProfilePicture(req.authUser.id, relativePath);

  if (result === USER_MESSAGES.ERROR.UPDATE_FAILED) {
    return next(new AppError(result, 500, "UPLOAD_FAILED"));
  }

  return res.status(200).json({
    message: USER_MESSAGES.SUCCESS.PICTURE_UPLOADED,
    data: { profilePicture: relativePath },
  });
});