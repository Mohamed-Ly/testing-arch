import { Router } from "express";
import * as categoryController from "../../controllers/category.controller.js";
import { validation } from "../../../../core/middlewares/validation.js";
import { hasOperation } from "../../../../core/middlewares/user.authorization.js";
import { OPERATIONS } from "../../../../config/permissions.js";
import * as categoryValidation from "../../validations/category.validation.js";
import * as globalSchema from "../../../../core/utils/global.schema.js";

const router = Router();

router.get(
  "/",
  validation(globalSchema.paginationQuery),
  hasOperation(OPERATIONS.READ),
  categoryController.getAllCategories,
);

router.get(
  "/:id",
  validation(globalSchema.id),
  hasOperation(OPERATIONS.READ),
  categoryController.getCategoryById,
);

router.post(
  "/",
  validation(categoryValidation.createCategory),
  hasOperation(OPERATIONS.CREATE),
  categoryController.createCategory,
);

router.patch(
  "/:id",
  validation(globalSchema.id),
  validation(categoryValidation.updateCategory),
  hasOperation(OPERATIONS.UPDATE),
  categoryController.updateCategory,
);

router.delete(
  "/:id",
  validation(globalSchema.id),
  hasOperation(OPERATIONS.DELETE),
  categoryController.deleteCategory,
);

export default router;