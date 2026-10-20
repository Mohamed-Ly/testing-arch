// ======================= MODEL RELATIONSHIPS =======================
// Defines all Sequelize model associations (hasMany, belongsTo, belongsToMany)
// Called once during server startup to establish relationships

import Category from "../modules/categories/models/category.model.js";
import Product from "../modules/products/models/product.model.js";
import User from "../modules/users/models/user.model.js";
import UserPermission from "../modules/users/models/userPermission.model.js";

export const relationships = () => {
  // User <-> UserPermission
  User.hasMany(UserPermission, {
    foreignKey: "userId",
    as: "permissions",
  });

  UserPermission.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });

  // Category <-> Product
  Category.hasMany(Product, {
    foreignKey: "categoryId",
    as: "products",
  });

  Product.belongsTo(Category, {
    foreignKey: "categoryId",
    as: "category",
  });
};