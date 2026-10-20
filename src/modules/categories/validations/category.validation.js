import { PATTERNS } from "../../../config/constants.js";
import { ERROR_MESSAGES, VALIDATION_MESSAGES } from "../../../config/messages.js";
import { CATEGORY_MESSAGES } from "../category.config.js";

const { VALIDATION } = CATEGORY_MESSAGES;

export const createCategory = {
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
          minLength: VALIDATION.DESCRIPTION_LENGTH,
        },
      },
    },
    required: ["name"],
    additionalProperties: false,
    errorMessage: {
      required: { name: VALIDATION.NAME_REQUIRED },
      additionalProperties: VALIDATION.NO_EXTRA_FIELDS,
      type: VALIDATION.TYPE_OBJECT,
    },
  },
};

export const updateCategory = {
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