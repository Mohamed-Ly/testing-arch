import { Router } from "express";
import * as productController from "../../controllers/product.controller.js";
import { validation } from "../../../../core/middlewares/validation.js";
import { hasOperation } from "../../../../core/middlewares/user.authorization.js";
import { OPERATIONS } from "../../../../config/permissions.js";
import * as productValidation from "../../validations/product.validation.js";
import * as globalSchema from "../../../../core/utils/global.schema.js";

const router = Router();

router.get(
  "/",
  validation(globalSchema.paginationQuery),
  hasOperation(OPERATIONS.READ),
  productController.getAllProducts,
);

router.get(
  "/:id",
  validation(globalSchema.id),
  hasOperation(OPERATIONS.READ),
  productController.getProductById,
);

router.post(
  "/",
  validation(productValidation.createProduct),
  hasOperation(OPERATIONS.CREATE),
  productController.createProduct,
);

router.patch(
  "/:id",
  validation(globalSchema.id),
  validation(productValidation.updateProduct),
  hasOperation(OPERATIONS.UPDATE),
  productController.updateProduct,
);

router.delete(
  "/:id",
  validation(globalSchema.id),
  hasOperation(OPERATIONS.DELETE),
  productController.deleteProduct,
);

export default router;