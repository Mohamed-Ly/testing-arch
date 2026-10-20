import { PATTERNS } from "../../../config/constants.js";
import { ERROR_MESSAGES, VALIDATION_MESSAGES } from "../../../config/messages.js";
import { PRODUCT_MESSAGES } from "../product.config.js";

const { VALIDATION } = PRODUCT_MESSAGES;

export const createProduct = {
  body: {
    type: "object",
    properties: {
      name: {
        type: "string",
        minLength: 2,
        maxLength: 255,
        errorMessage: {
          type: VALIDATION.NAME_STRING,
          minLength: VALIDATION.NAME_LENGTH,
        },
      },
      description: {
        type: "string",
        minLength: 1,
        errorMessage: {
          type: VALIDATION.DESCRIPTION_STRING,
        },
      },
      price: {
        type: "number",
        minimum: 0,
        errorMessage: {
          type: VALIDATION.PRICE_NUMBER,
          minimum: VALIDATION.PRICE_MIN,
        },
      },
      stock: {
        type: "integer",
        minimum: 0,
        errorMessage: {
          type: VALIDATION.STOCK_INTEGER,
          minimum: VALIDATION.STOCK_MIN,
        },
      },
      image: {
        type: "string",
        minLength: 1,
      },
      categoryId: {
        type: "integer",
        minimum: 1,
        errorMessage: {
          type: VALIDATION.CATEGORY_ID_INTEGER,
          minimum: "Category ID must be at least 1",
        },
      },
    },
    required: ["name", "price", "categoryId"],
    additionalProperties: false,
    errorMessage: {
      required: {
        name: VALIDATION.NAME_REQUIRED,
        price: VALIDATION.PRICE_REQUIRED,
        categoryId: VALIDATION.CATEGORY_ID_REQUIRED,
      },
      additionalProperties: VALIDATION.NO_EXTRA_FIELDS,
      type: VALIDATION.TYPE_OBJECT,
    },
  },
};

export const updateProduct = {
  body: {
    type: "object",
    properties: {
      name: {
        type: "string",
        minLength: 2,
        maxLength: 255,
        errorMessage: {
          type: VALIDATION.NAME_STRING,
          minLength: VALIDATION.NAME_LENGTH,
        },
      },
      description: {
        type: "string",
        minLength: 1,
        errorMessage: {
          type: VALIDATION.DESCRIPTION_STRING,
        },
      },
      price: {
        type: "number",
        minimum: 0,
        errorMessage: {
          type: VALIDATION.PRICE_NUMBER,
          minimum: VALIDATION.PRICE_MIN,
        },
      },
      stock: {
        type: "integer",
        minimum: 0,
        errorMessage: {
          type: VALIDATION.STOCK_INTEGER,
          minimum: VALIDATION.STOCK_MIN,
        },
      },
      image: {
        type: "string",
        minLength: 1,
      },
      categoryId: {
        type: "integer",
        minimum: 1,
        errorMessage: {
          type: VALIDATION.CATEGORY_ID_INTEGER,
          minimum: "Category ID must be at least 1",
        },
      },
      isActive: {
        type: "boolean",
      },
    },
    additionalProperties: false,
    minProperties: 1,
    errorMessage: {
      additionalProperties: VALIDATION.NO_EXTRA_FIELDS,
      minProperties: "At least one field must be provided",
      type: VALIDATION.TYPE_OBJECT,
    },
  },
};