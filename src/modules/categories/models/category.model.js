import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/database.js";

const Category = sequelize.define(
  "Category",
  {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "categories",
    timestamps: true,
  }
);

export default Category;