// ======================= AUTH ROUTES =======================
// Public authentication routes (no authentication required)
// Login, register, token refresh, logout

import { Router } from "express";
import * as authController from "../../controllers/auth.controller.js";
import { validation } from "../../../../core/middlewares/validation.js";
import * as authValidation from "../../validations/auth.validation.js";

const router = Router();

router.post(
  "/login",
  validation(authValidation.login),
  authController.login,
);

router.post(
  "/register",
  validation(authValidation.register),
  authController.register,
);

router.post(
  "/refresh-token",
  validation(authValidation.refreshToken),
  authController.refreshToken,
);

router.post(
  "/logout",
  validation(authValidation.logout),
  authController.logout,
);

export default router;