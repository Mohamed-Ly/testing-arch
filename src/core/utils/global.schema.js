// ======================= GLOBAL VALIDATION SCHEMAS =======================
// Reusable AJV JSON schemas for common validation patterns
// Used across modules for ID params, pagination query, and token headers

import { PATTERNS } from "../../config/constants.js";
import { ERROR_MESSAGES } from "../../config/messages.js";

export const id = {
  params: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        minimum: 1,
        errorMessage: {
          type: ERROR_MESSAGES.ID_MUST_BE_INTEGER,
          minimum: ERROR_MESSAGES.ID_MINIMUM,
        },
      },
    },
    required: ["id"],
    additionalProperties: false,
    errorMessage: {
      required: { id: ERROR_MESSAGES.REQUIRED_ID_PARAM },
      additionalProperties: ERROR_MESSAGES.UNRECOGNIZED_FIELDS,
    },
  },
};

export const paginationQuery = {
  query: {
    type: "object",
    properties: {
      page: {
        type: "integer",
        minimum: 1,
        errorMessage: {
          type: ERROR_MESSAGES.PAGE_MUST_BE_INTEGER,
          minimum: ERROR_MESSAGES.PAGE_MINIMUM,
        },
      },
      size: {
        type: "integer",
        minimum: 5,
        maximum: 100,
        errorMessage: {
          type: ERROR_MESSAGES.SIZE_MUST_BE_INTEGER,
          minimum: ERROR_MESSAGES.SIZE_MINIMUM,
        },
      },
      search: {
        type: "string",
        minLength: 1,
      },
    },
    additionalProperties: false,
    errorMessage: {
      additionalProperties: ERROR_MESSAGES.UNRECOGNIZED_FIELDS,
    },
  },
};

export const token = {
  headers: {
    type: "object",
    properties: {
      authorization: {
        type: "string",
        minLength: 1,
        errorMessage: {
          type: ERROR_MESSAGES.AUTHORIZATION_MUST_BE_STRING,
          minLength: ERROR_MESSAGES.AUTHORIZATION_REQUIRED,
        },
      },
    },
    required: ["authorization"],
    errorMessage: {
      required: { authorization: ERROR_MESSAGES.AUTHORIZATION_REQUIRED },
    },
  },
};