import handleAsync from "../../../core/utils/handleAsync.js";
import AppError from "../../../core/utils/AppError.js";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../../../config/messages.js";
import * as categoryService from "../services/category.service.js";
import { CATEGORY_MESSAGES } from "../category.config.js";

export const createCategory = handleAsync(async (req, res, next) => {
  const result = await categoryService.createCategory(req.body);

  switch (result) {
    case CATEGORY_MESSAGES.ERROR.NAME_IN_USE:
      return next(new AppError(CATEGORY_MESSAGES.ERROR.NAME_IN_USE, 409, "DUPLICATE_NAME"));
    default:
      return res.status(201).json({
        message: SUCCESS_MESSAGES.OPERATION_SUCCESSFUL,
      });
  }
});

export const getAllCategories = handleAsync(async (req, res, next) => {
  const { page, size, search } = req.query;

  const result = await categoryService.getAllCategories(page, size, search);

  return res.status(200).json({
    ...result,
  });
});

export const getCategoryById = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const category = await categoryService.getCategoryById(id);

  switch (category) {
    case CATEGORY_MESSAGES.ERROR.NOT_FOUND:
      return next(new AppError(CATEGORY_MESSAGES.ERROR.NOT_FOUND, 404, "NOT_FOUND"));
    default:
      return res.status(200).json({
        data: category,
      });
  }
});

export const updateCategory = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await categoryService.updateCategory(id, req.body);

  switch (result) {
    case CATEGORY_MESSAGES.ERROR.NOT_FOUND:
      return next(new AppError(CATEGORY_MESSAGES.ERROR.NOT_FOUND, 404, "NOT_FOUND"));
    case CATEGORY_MESSAGES.ERROR.NAME_IN_USE:
      return next(new AppError(CATEGORY_MESSAGES.ERROR.NAME_IN_USE, 409, "DUPLICATE_NAME"));
    default:
      return res.status(200).json({
        message: SUCCESS_MESSAGES.OPERATION_SUCCESSFUL,
      });
  }
});

export const deleteCategory = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await categoryService.deleteCategory(id);

  switch (result) {
    case CATEGORY_MESSAGES.ERROR.NOT_FOUND:
      return next(new AppError(CATEGORY_MESSAGES.ERROR.NOT_FOUND, 404, "NOT_FOUND"));
    default:
      return res.status(200).json({
        message: SUCCESS_MESSAGES.OPERATION_SUCCESSFUL,
      });
  }
});