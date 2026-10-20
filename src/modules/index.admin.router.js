// ======================= ADMIN ROUTES AGGREGATOR =======================
// Aggregates all admin module routes with authentication and permissions
// Applies JWT validation, auth middleware, and page-level permissions

import { Router } from "express";

import { requireAuth } from "../core/middlewares/auth.middleware.js";

import authRouter from "./auth/routes/v1/auth.routes.js";
import usersRouter from "./users/routes/v1/users.routes.js";
import categoriesRouter from "./categories/routes/v1/category.routes.js";
import productsRouter from "./products/routes/v1/product.routes.js";
import { hasPermission } from "../core/middlewares/user.authorization.js";
import * as pagecheck from "../config/permissions.js";
import { validation } from "../core/middlewares/validation.js";
import { token } from "../core/utils/global.schema.js";

const router = Router();

// Public auth routes (no authentication required)
router.use("/auth/v1", authRouter);

// Protected routes - validation token by ajv
router.use(validation(token));
// verify token
router.use(requireAuth);

// User management
router.use(
  "/users/v1",
  hasPermission(pagecheck.PERMISSIONS.USERS.id),
  usersRouter,
);

// Categories
router.use(
  "/categories/v1",
  hasPermission(pagecheck.PERMISSIONS.CATEGORIES.id),
  categoriesRouter,
);

// Products
router.use(
  "/products/v1",
  hasPermission(pagecheck.PERMISSIONS.PRODUCTS.id),
  productsRouter,
);

export default router;