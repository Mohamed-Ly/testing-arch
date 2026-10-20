// ======================= USERS SERVICE =======================
// Business logic for user management
// Handles profile, password, admin CRUD, and soft deletes

import { Op } from "sequelize";
import User from "../models/user.model.js";
import { USER_MESSAGES } from "../users.config.js";
import { SUCCESS_MESSAGES } from "../../../config/messages.js";
import { hashPassword, comparePassword } from "../../../core/utils/password.utils.js";
import {
  pagination,
  responsePagination,
} from "../../../core/utils/pagination.js";

const safeAttributes = {
  exclude: ["createdAt", "updatedAt", "password", "isDeleted"],
};

export const getOwnProfile = async (id) => {
  const user = await User.findOne({
    where: { id, isDeleted: false },
    attributes: { exclude: ["password", "createdAt", "updatedAt", "isDeleted"] },
  });
  if (!user) return USER_MESSAGES.ERROR.NOT_FOUND;
  return user;
};

export const updateOwnProfile = async (id, data) => {
  const user = await User.findOne({
    where: { id, isDeleted: false },
    attributes: ["id", "userName"],
  });
  if (!user) return USER_MESSAGES.ERROR.NOT_FOUND;

  if (data.userName) {
    const existing = await User.findOne({
      where: {
        userName: data.userName,
        isDeleted: false,
        id: { [Op.ne]: id },
      },
      attributes: ["id"],
    });
    if (existing) return USER_MESSAGES.ERROR.USERNAME_EXISTS;
  }

  const payload = {};
  if (data.fullName !== undefined) payload.fullName = data.fullName;
  if (data.userName !== undefined) payload.userName = data.userName;

  const [updated] = await User.update(payload, {
    where: { id, isDeleted: false },
  });
  if (updated === 0) return USER_MESSAGES.ERROR.UPDATE_FAILED;

  return SUCCESS_MESSAGES.OPERATION_SUCCESSFUL;
};

export const changeOwnPassword = async (id, { currentPassword, newPassword }) => {
  const user = await User.findOne({
    where: { id, isDeleted: false },
    attributes: ["id", "password"],
  });
  if (!user) return USER_MESSAGES.ERROR.NOT_FOUND;

  const isMatch = await comparePassword(currentPassword, user.password);
  if (!isMatch) return USER_MESSAGES.ERROR.CURRENT_PASSWORD_INCORRECT;

  if (currentPassword === newPassword) return USER_MESSAGES.ERROR.SAME_PASSWORD;

  const hashedPassword = await hashPassword(newPassword);
  const [updated] = await User.update(
    { password: hashedPassword },
    { where: { id, isDeleted: false } },
  );
  if (updated === 0) return USER_MESSAGES.ERROR.UPDATE_FAILED;

  return SUCCESS_MESSAGES.OPERATION_SUCCESSFUL;
};

export const createUser = async (payload) => {
  const { isAdmin, status, ...userData } = payload;

  const existing = await User.findOne({
    where: {
      [Op.or]: [{ email: userData.email }, { userName: userData.userName }],
      isDeleted: false,
    },
  });
  if (existing) {
    if (existing.email === userData.email) return USER_MESSAGES.ERROR.EMAIL_EXISTS;
    if (existing.userName === userData.userName) return USER_MESSAGES.ERROR.USERNAME_EXISTS;
  }

  const hashedPassword = await hashPassword(userData.password);

  await User.create({
    ...userData,
    password: hashedPassword,
    isAdmin: isAdmin || false,
    status: status !== undefined ? status : true,
  });

  return SUCCESS_MESSAGES.OPERATION_SUCCESSFUL;
};

export const listUsers = async (pageQuery, sizeQuery, search) => {
  const { limit, offset } = pagination(pageQuery, sizeQuery);

  const whereCondition = { isDeleted: false };

  if (search) {
    whereCondition[Op.or] = [
      { fullName: { [Op.like]: `%${search}%` } },
      { userName: { [Op.like]: `%${search}%` } },
      { email: { [Op.like]: `%${search}%` } },
    ];
  }

  const result = await User.findAndCountAll({
    where: whereCondition,
    attributes: { exclude: ["password", "isDeleted"] },
    limit,
    offset,
    order: [["createdAt", "DESC"]],
    distinct: true,
  });

  return responsePagination(result, pageQuery, limit, "users");
};

export const getUserById = async (id) => {
  const user = await User.findOne({
    where: { id, isDeleted: false },
    attributes: { exclude: ["password", "isDeleted"] },
  });
  if (!user) return USER_MESSAGES.ERROR.NOT_FOUND;
  return user;
};

export const updateUser = async (id, data) => {
  const user = await User.findOne({ where: { id, isDeleted: false } });
  if (!user) return USER_MESSAGES.ERROR.NOT_FOUND;

  if (data.userName) {
    const existing = await User.findOne({
      where: {
        userName: data.userName,
        isDeleted: false,
        id: { [Op.ne]: id },
      },
    });
    if (existing) return USER_MESSAGES.ERROR.USERNAME_EXISTS;
  }

  if (data.email) {
    const existing = await User.findOne({
      where: {
        email: data.email,
        isDeleted: false,
        id: { [Op.ne]: id },
      },
    });
    if (existing) return USER_MESSAGES.ERROR.EMAIL_EXISTS;
  }

  if (data.password) {
    data.password = await hashPassword(data.password);
  }

  await User.update(data, { where: { id, isDeleted: false } });
  return SUCCESS_MESSAGES.OPERATION_SUCCESSFUL;
};

export const softDeleteUser = async (id, currentUserId) => {
  if (id === currentUserId) return USER_MESSAGES.ERROR.CANNOT_DELETE_SELF;

  const user = await User.findOne({ where: { id, isDeleted: false } });
  if (!user) return USER_MESSAGES.ERROR.NOT_FOUND;
  if (user.isAdmin) return USER_MESSAGES.ERROR.CANNOT_DELETE_ADMIN;

  const [affectedRows] = await User.update(
    { isDeleted: true },
    { where: { id, isDeleted: false } },
  );

  if (affectedRows === 0) return USER_MESSAGES.ERROR.NOT_FOUND;
  return SUCCESS_MESSAGES.OPERATION_SUCCESSFUL;
};

export const uploadProfilePicture = async (id, profilePicture) => {
  const [updated] = await User.update(
    { profilePicture },
    { where: { id, isDeleted: false } },
  );
  if (updated === 0) return USER_MESSAGES.ERROR.UPDATE_FAILED;
  return SUCCESS_MESSAGES.OPERATION_SUCCESSFUL;
};