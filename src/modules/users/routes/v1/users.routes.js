// ======================= USERS ROUTES =======================
// User management routes with validation and authorization
// Profile routes (authenticated user), Admin routes (permission required)

import { Router } from "express";
import * as usersController from "../../controllers/users.controller.js";
import { validation } from "../../../../core/middlewares/validation.js";
import { hasOperation } from "../../../../core/middlewares/user.authorization.js";
import { OPERATIONS } from "../../../../config/permissions.js";
import * as usersValidation from "../../validations/users.validation.js";
import * as globalSchema from "../../../../core/utils/global.schema.js";
import { createDir, uploadProfileImage } from "../../../../core/middlewares/upload.middleware.js";

const router = Router();

// Profile routes (authenticated user)
router.get("/profile", usersController.getOwnProfile);

router.patch(
  "/profile",
  validation(usersValidation.updateOwnProfile),
  usersController.updateOwnProfile,
);

router.patch(
  "/password",
  validation(usersValidation.changeOwnPassword),
  usersController.changeOwnPassword,
);

router.patch(
  "/profile/picture",
  createDir("profiles", "users"),
  uploadProfileImage.single("image"),
  usersController.uploadProfilePicture,
);

// Admin routes (require permission)
router.get(
  "/",
  validation(globalSchema.paginationQuery),
  hasOperation(OPERATIONS.READ),
  usersController.listUsers,
);

router.post(
  "/",
  validation(usersValidation.createUser),
  hasOperation(OPERATIONS.CREATE),
  usersController.createUser,
);

router.get(
  "/:id",
  validation(globalSchema.id),
  hasOperation(OPERATIONS.READ),
  usersController.getUserById,
);

router.patch(
  "/:id",
  validation(globalSchema.id),
  validation(usersValidation.updateUser),
  hasOperation(OPERATIONS.UPDATE),
  usersController.updateUser,
);

router.delete(
  "/:id",
  validation(globalSchema.id),
  hasOperation(OPERATIONS.DELETE),
  usersController.softDeleteUser,
);

export default router;