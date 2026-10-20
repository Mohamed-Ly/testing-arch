// ======================= AUTH CONTROLLER =======================
// Request handlers for authentication endpoints
// Uses handleAsync wrapper for automatic error catching

import handleAsync from "../../../core/utils/handleAsync.js";
import AppError from "../../../core/utils/AppError.js";
import { AUTH_MESSAGES } from "../auth.config.js";
import { SUCCESS_MESSAGES } from "../../../config/messages.js";
import * as authService from "../services/auth.service.js";
import { verifyRefreshToken } from "../../../core/middlewares/auth.middleware.js";

export const login = handleAsync(async (req, res, next) => {
  const { identifier, password } = req.body;
  const result = await authService.login(identifier, password);

  if (typeof result === "string") {
    return next(new AppError(result, 401, "INVALID_CREDENTIALS"));
  }

  return res.status(200).json({
    message: AUTH_MESSAGES.SUCCESS.LOGIN,
    data: result,
  });
});

export const register = handleAsync(async (req, res, next) => {
  const result = await authService.register(req.body);

  if (typeof result === "string") {
    const statusCode = result === AUTH_MESSAGES.ERROR.EMAIL_EXISTS || result === AUTH_MESSAGES.ERROR.USERNAME_EXISTS ? 409 : 400;
    return next(new AppError(result, statusCode, "REGISTRATION_FAILED"));
  }

  return res.status(201).json({
    message: AUTH_MESSAGES.SUCCESS.REGISTER,
    data: result,
  });
});

export const refreshToken = handleAsync(async (req, res, next) => {
  const { refreshToken } = req.body;
  const result = await authService.refreshAccessToken(refreshToken);

  if (typeof result === "string") {
    return next(new AppError(result, 401, "TOKEN_REFRESH_FAILED"));
  }

  return res.status(200).json({
    message: AUTH_MESSAGES.SUCCESS.TOKEN_REFRESHED,
    data: result,
  });
});

export const logout = handleAsync(async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return next(new AppError(AUTH_MESSAGES.VALIDATION.TOKEN_REQUIRED, 400, "TOKEN_REQUIRED"));
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);
    await authService.logout(decoded.id);
  } catch (error) {
    // Token invalid or expired — still allow logout (client already has no valid session)
    return res.status(200).json({
      message: AUTH_MESSAGES.SUCCESS.LOGOUT,
    });
  }

  return res.status(200).json({
    message: AUTH_MESSAGES.SUCCESS.LOGOUT,
  });
});