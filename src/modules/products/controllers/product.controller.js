import handleAsync from "../../../core/utils/handleAsync.js";
import AppError from "../../../core/utils/AppError.js";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../../../config/messages.js";
import * as productService from "../services/product.service.js";
import { PRODUCT_MESSAGES } from "../product.config.js";

export const createProduct = handleAsync(async (req, res, next) => {
  const result = await productService.createProduct(req.body);

  switch (result) {
    case PRODUCT_MESSAGES.ERROR.CATEGORY_NOT_FOUND:
      return next(new AppError(PRODUCT_MESSAGES.ERROR.CATEGORY_NOT_FOUND, 404, "CATEGORY_NOT_FOUND"));
    case PRODUCT_MESSAGES.ERROR.NAME_IN_USE:
      return next(new AppError(PRODUCT_MESSAGES.ERROR.NAME_IN_USE, 409, "DUPLICATE_NAME"));
    default:
      return res.status(201).json({
        message: SUCCESS_MESSAGES.OPERATION_SUCCESSFUL,
      });
  }
});

export const getAllProducts = handleAsync(async (req, res, next) => {
  const { page, size, search } = req.query;

  const result = await productService.getAllProducts(page, size, search);

  return res.status(200).json({
    ...result,
  });
});

export const getProductById = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const product = await productService.getProductById(id);

  switch (product) {
    case PRODUCT_MESSAGES.ERROR.NOT_FOUND:
      return next(new AppError(PRODUCT_MESSAGES.ERROR.NOT_FOUND, 404, "NOT_FOUND"));
    default:
      return res.status(200).json({
        data: product,
      });
  }
});

export const updateProduct = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await productService.updateProduct(id, req.body);

  switch (result) {
    case PRODUCT_MESSAGES.ERROR.NOT_FOUND:
      return next(new AppError(PRODUCT_MESSAGES.ERROR.NOT_FOUND, 404, "NOT_FOUND"));
    case PRODUCT_MESSAGES.ERROR.CATEGORY_NOT_FOUND:
      return next(new AppError(PRODUCT_MESSAGES.ERROR.CATEGORY_NOT_FOUND, 404, "CATEGORY_NOT_FOUND"));
    case PRODUCT_MESSAGES.ERROR.NAME_IN_USE:
      return next(new AppError(PRODUCT_MESSAGES.ERROR.NAME_IN_USE, 409, "DUPLICATE_NAME"));
    default:
      return res.status(200).json({
        message: SUCCESS_MESSAGES.OPERATION_SUCCESSFUL,
      });
  }
});

export const deleteProduct = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await productService.deleteProduct(id);

  switch (result) {
    case PRODUCT_MESSAGES.ERROR.NOT_FOUND:
      return next(new AppError(PRODUCT_MESSAGES.ERROR.NOT_FOUND, 404, "NOT_FOUND"));
    default:
      return res.status(200).json({
        message: SUCCESS_MESSAGES.OPERATION_SUCCESSFUL,
      });
  }
});