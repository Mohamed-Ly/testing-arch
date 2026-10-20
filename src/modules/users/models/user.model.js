// ======================= USER MODEL =======================
// Sequelize model for User entity
// Includes soft delete, status, and admin flag

import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/database.js";

const User = sequelize.define(
  "User",
  {
    fullName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        notContains: " ",
      },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    isLogin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

export default User;