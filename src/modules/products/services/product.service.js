import { Op } from "sequelize";
import Product from "../models/product.model.js";
import Category from "../../categories/models/category.model.js";
import { PRODUCT_MESSAGES } from "../product.config.js";
import { SUCCESS_MESSAGES } from "../../../config/messages.js";
import {
  pagination,
  responsePagination,
} from "../../../core/utils/pagination.js";

export const createProduct = async (data) => {
  const category = await Category.findOne({
    where: { id: data.categoryId, isDeleted: false },
  });
  if (!category) return PRODUCT_MESSAGES.ERROR.CATEGORY_NOT_FOUND;

  const existing = await findByName(data.name);
  if (existing) return PRODUCT_MESSAGES.ERROR.NAME_IN_USE;

  await Product.create({
    name: data.name,
    description: data.description,
    price: data.price,
    stock: data.stock || 0,
    image: data.image,
    categoryId: data.categoryId,
    isActive: data.isActive !== undefined ? data.isActive : true,
  });
  return SUCCESS_MESSAGES.OPERATION_SUCCESSFUL;
};

export const getAllProducts = async (pageQuery, sizeQuery, search) => {
  const { limit, offset } = pagination(pageQuery, sizeQuery);

  const whereCondition = { isDeleted: false };
  if (search) {
    whereCondition[Op.or] = [
      { name: { [Op.like]: `%${search}%` } },
      { description: { [Op.like]: `%${search}%` } },
    ];
  }

  const result = await Product.findAndCountAll({
    where: whereCondition,
    attributes: ["id", "name", "description", "price", "stock", "image", "categoryId", "isActive", "createdAt"],
    include: [
      {
        model: Category,
        as: "category",
        attributes: ["id", "name"],
      },
    ],
    limit,
    offset,
    order: [["createdAt", "DESC"]],
    distinct: true,
  });

  return responsePagination(result, pageQuery, limit, "products");
};

export const getProductById = async (id) => {
  const product = await Product.findOne({
    where: { id, isDeleted: false },
    attributes: ["id", "name", "description", "price", "stock", "image", "categoryId", "isActive", "createdAt"],
    include: [
      {
        model: Category,
        as: "category",
        attributes: ["id", "name"],
      },
    ],
  });
  if (!product) return PRODUCT_MESSAGES.ERROR.NOT_FOUND;
  return product;
};

export const updateProduct = async (id, data) => {
  const product = await findById(id);
  if (!product) return PRODUCT_MESSAGES.ERROR.NOT_FOUND;

  if (data.categoryId) {
    const category = await Category.findOne({
      where: { id: data.categoryId, isDeleted: false },
    });
    if (!category) return PRODUCT_MESSAGES.ERROR.CATEGORY_NOT_FOUND;
  }

  if (data.name) {
    const existing = await findByName(data.name);
    if (existing && existing.id !== parseInt(id))
      return PRODUCT_MESSAGES.ERROR.NAME_IN_USE;
  }

  await Product.update(data, { where: { id, isDeleted: false } });
  return SUCCESS_MESSAGES.OPERATION_SUCCESSFUL;
};

export const deleteProduct = async (id) => {
  const [affectedRows] = await Product.update(
    { isDeleted: true },
    { where: { id, isDeleted: false } },
  );

  if (affectedRows === 0) return PRODUCT_MESSAGES.ERROR.NOT_FOUND;
  return SUCCESS_MESSAGES.OPERATION_SUCCESSFUL;
};

export const findProductById = async (id) => {
  return await Product.findOne({ where: { id, isDeleted: false } });
};

const findById = async (id) => {
  return await Product.findOne({ where: { id, isDeleted: false } });
};

const findByName = async (name) => {
  return await Product.findOne({ where: { name, isDeleted: false } });
};