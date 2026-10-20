// ======================= USER PERMISSION MODEL =======================
// Sequelize model for User-Permission relationship (pivot table)
// Stores which pages and operations each user can access

import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/database.js";

const UserPermission = sequelize.define(
  "UserPermission",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    permission: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    operations: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    tableName: "user_permissions",
    timestamps: true,
  }
);

export default UserPermission;