import { Op } from "sequelize";
import Category from "../models/category.model.js";
import { CATEGORY_MESSAGES } from "../category.config.js";
import { SUCCESS_MESSAGES } from "../../../config/messages.js";
import {
  pagination,
  responsePagination,
} from "../../../core/utils/pagination.js";

export const createCategory = async (data) => {
  const existing = await findByName(data.name);
  if (existing) return CATEGORY_MESSAGES.ERROR.NAME_IN_USE;

  await Category.create({ name: data.name, description: data.description });
  return SUCCESS_MESSAGES.OPERATION_SUCCESSFUL;
};

export const getAllCategories = async (pageQuery, sizeQuery, search) => {
  const { limit, offset } = pagination(pageQuery, sizeQuery);

  const whereCondition = { isDeleted: false };
  if (search) {
    whereCondition.name = { [Op.like]: `%${search}%` };
  }

  const result = await Category.findAndCountAll({
    where: whereCondition,
    attributes: ["id", "name", "description", "createdAt"],
    limit,
    offset,
    order: [["createdAt", "DESC"]],
    distinct: true,
  });

  return responsePagination(result, pageQuery, limit, "categories");
};

export const getCategoryById = async (id) => {
  const category = await Category.findOne({
    where: { id, isDeleted: false },
    attributes: ["id", "name", "description", "createdAt"],
  });
  if (!category) return CATEGORY_MESSAGES.ERROR.NOT_FOUND;
  return category;
};

export const updateCategory = async (id, data) => {
  const category = await findById(id);
  if (!category) return CATEGORY_MESSAGES.ERROR.NOT_FOUND;

  if (data.name) {
    const existing = await findByName(data.name);
    if (existing && existing.id !== parseInt(id))
      return CATEGORY_MESSAGES.ERROR.NAME_IN_USE;
  }

  await Category.update(data, { where: { id, isDeleted: false } });
  return SUCCESS_MESSAGES.OPERATION_SUCCESSFUL;
};

export const deleteCategory = async (id) => {
  const [affectedRows] = await Category.update(
    { isDeleted: true },
    { where: { id, isDeleted: false } },
  );

  if (affectedRows === 0) return CATEGORY_MESSAGES.ERROR.NOT_FOUND;
  return SUCCESS_MESSAGES.OPERATION_SUCCESSFUL;
};

export const findCategoryById = async (id) => {
  return await Category.findOne({ where: { id, isDeleted: false } });
};

const findById = async (id) => {
  return await Category.findOne({ where: { id, isDeleted: false } });
};

const findByName = async (name) => {
  return await Category.findOne({ where: { name, isDeleted: false } });
};