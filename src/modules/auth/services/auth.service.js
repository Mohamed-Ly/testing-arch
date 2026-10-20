// ======================= AUTH SERVICE =======================
// Business logic for authentication (login, register, token refresh, logout)
// Handles user verification, token generation, and permission loading

import { Op } from "sequelize";
import bcrypt from "bcrypt";
import User from "../../users/models/user.model.js";
import UserPermission from "../../users/models/userPermission.model.js";
import { AUTH_MESSAGES } from "../auth.config.js";
import { SUCCESS_MESSAGES } from "../../../config/messages.js";
import { comparePassword } from "../../../core/utils/password.utils.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../../core/middlewares/auth.middleware.js";
import { mapPermissionsToFullDetails } from "../../../config/permissions.js";

// ==========================================
//   Helper: Build user payload with permissions
// ==========================================
const buildUserPayload = async (user) => {
  const permissions = await UserPermission.findAll({
    where: { userId: user.id },
    attributes: ["permission", "operations"],
  });

  return {
    id: user.id,
    userName: user.userName,
    email: user.email,
    isAdmin: user.isAdmin,
    permissions: mapPermissionsToFullDetails(
      permissions.map((p) => ({
        permissionId: p.permission,
        operations: p.operations,
      }))
    ),
  };
};

export const login = async (identifier, password) => {
  const user = await User.findOne({
    where: {
      [Op.or]: [{ email: identifier }, { userName: identifier }],
      isDeleted: false,
      status: true,
    },
  });

  if (!user) return AUTH_MESSAGES.ERROR.INVALID_CREDENTIALS;

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) return AUTH_MESSAGES.ERROR.INVALID_CREDENTIALS;

  const payload = await buildUserPayload(user);

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  await User.update({ isLogin: true }, { where: { id: user.id } });

  return {
    user: {
      id: user.id,
      fullName: user.fullName,
      userName: user.userName,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    accessToken,
    refreshToken,
  };
};

export const register = async (data) => {
  const { fullName, userName, email, password } = data;

  // Check uniqueness
  const existing = await User.findOne({
    where: {
      [Op.or]: [{ email }, { userName }],
      isDeleted: false,
    },
  });

  if (existing) {
    if (existing.email === email) return AUTH_MESSAGES.ERROR.EMAIL_EXISTS;
    if (existing.userName === userName) return AUTH_MESSAGES.ERROR.USERNAME_EXISTS;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({
    fullName,
    userName,
    email,
    password: hashedPassword,
    status: true,
  });

  const payload = await buildUserPayload(user);

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  return {
    user: {
      id: user.id,
      fullName: user.fullName,
      userName: user.userName,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    accessToken,
    refreshToken,
  };
};

export const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) return AUTH_MESSAGES.ERROR.REFRESH_TOKEN_REQUIRED;

  try {
    const decoded = verifyRefreshToken(refreshToken);
    const user = await User.findOne({
      where: { id: decoded.id, isDeleted: false, status: true },
    });

    if (!user) return AUTH_MESSAGES.ERROR.USER_NOT_FOUND;

    const payload = await buildUserPayload(user);

    const newAccessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload);

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  } catch (error) {
    if (error.name === "TokenExpiredError") return AUTH_MESSAGES.ERROR.TOKEN_EXPIRED;
    return AUTH_MESSAGES.ERROR.INVALID_TOKEN;
  }
};

export const logout = async (userId) => {
  await User.update({ isLogin: false }, { where: { id: userId } });
  return SUCCESS_MESSAGES.OPERATION_SUCCESSFUL;
};

// ==========================================
//   Generate Admin with all permissions
//   Called once on server startup
// ==========================================
export const generateAdmin = async () => {
  const config = (await import("../../../config/env.config.js")).default;

  const adminUserName = config.admin?.name || process.env.ADMIN_NAME || "admin";
  const existingAdmin = await User.findOne({
    where: { userName: adminUserName, isDeleted: false },
  });

  if (existingAdmin) return;

  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || "Admin@1234",
    10
  );

  const admin = await User.create({
    fullName: process.env.ADMIN_NAME || "Admin",
    userName: adminUserName,
    email: process.env.ADMIN_EMAIL || "admin@example.com",
    password: hashedPassword,
    isAdmin: true,
    status: true,
  });

  // Assign ALL permissions with ALL operations
  const { PERMISSIONS, OPERATIONS } = await import("../../../config/permissions.js");
  const allOperations = Object.values(OPERATIONS);

  for (const perm of Object.values(PERMISSIONS)) {
    await UserPermission.create({
      userId: admin.id,
      permission: perm.id,
      operations: allOperations,
    });
  }

  console.log(`✅ Admin user "${adminUserName}" created with all permissions`);
};