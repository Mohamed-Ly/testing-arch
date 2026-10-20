// ======================= AUTH MIDDLEWARE =======================
// JWT authentication middleware and token utilities
// Handles token verification, access/refresh token generation

import jwt from "jsonwebtoken";
import config from "../../config/env.config.js";
import AppError from "../utils/AppError.js";
import { ERROR_MESSAGES } from "../../config/messages.js";

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError(ERROR_MESSAGES.NO_TOKEN_PROVIDED, 401, "UNAUTHORIZED"));
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, config.jwt.accessSecret);
    req.authUser = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new AppError(ERROR_MESSAGES.INVALID_ACCESS_TOKEN, 401, "TOKEN_EXPIRED"));
    }
    return next(new AppError(ERROR_MESSAGES.INVALID_TOKEN, 401, "INVALID_TOKEN"));
  }
};

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, config.jwt.accessSecret, {
    expiresIn: config.jwt.accessExpire,
  });
};

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpire,
  });
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, config.jwt.refreshSecret);
};