// ======================= AUTH VALIDATIONS =======================
// AJV JSON schemas for auth endpoints (login, register, refresh token)

import { PATTERNS } from "../../../config/constants.js";
import { ERROR_MESSAGES, VALIDATION_MESSAGES } from "../../../config/messages.js";
import { AUTH_MESSAGES } from "../auth.config.js";

const { VALIDATION } = AUTH_MESSAGES;

export const login = {
  body: {
    type: "object",
    properties: {
      identifier: {
        type: "string",
        minLength: 3,
        errorMessage: {
          type: VALIDATION.EMAIL_STRING,
          minLength: VALIDATION_MESSAGES.USERNAME_MIN_LENGTH,
        },
      },
      password: {
        type: "string",
        minLength: 1,
        errorMessage: {
          type: VALIDATION.PASSWORD_STRING,
          minLength: VALIDATION.PASSWORD_MIN_LENGTH,
        },
      },
    },
    required: ["identifier", "password"],
    additionalProperties: false,
    errorMessage: {
      required: {
        identifier: ERROR_MESSAGES.REQUIRED_IDENTIFIER,
        password: VALIDATION.PASSWORD_REQUIRED,
      },
      additionalProperties: VALIDATION.NO_EXTRA_FIELDS,
      type: VALIDATION.TYPE_OBJECT,
    },
  },
};

export const register = {
  body: {
    type: "object",
    properties: {
      fullName: {
        type: "string",
        minLength: 3,
        maxLength: 255,
        errorMessage: {
          type: VALIDATION.FULLNAME_STRING,
          minLength: VALIDATION.FULLNAME_MIN_LENGTH,
        },
      },
      userName: {
        type: "string",
        minLength: 3,
        maxLength: 100,
        pattern: PATTERNS.USERNAME.source,
        errorMessage: {
          type: VALIDATION.USERNAME_STRING,
          minLength: VALIDATION.USERNAME_MIN_LENGTH,
          pattern: VALIDATION.USERNAME_NO_SPACES,
        },
      },
      email: {
        type: "string",
        pattern: PATTERNS.EMAIL.source,
        errorMessage: {
          type: VALIDATION.EMAIL_STRING,
          pattern: VALIDATION.EMAIL_FORMAT,
        },
      },
      password: {
        type: "string",
        pattern: PATTERNS.PASSWORD.source,
        errorMessage: {
          type: VALIDATION.PASSWORD_STRING,
          pattern: VALIDATION_MESSAGES.WEAK_PASSWORD,
          minLength: VALIDATION.PASSWORD_MIN_LENGTH,
        },
      },
    },
    required: ["fullName", "userName", "email", "password"],
    additionalProperties: false,
    errorMessage: {
      required: {
        fullName: VALIDATION.FULLNAME_REQUIRED,
        userName: VALIDATION.USERNAME_REQUIRED,
        email: VALIDATION.EMAIL_REQUIRED,
        password: VALIDATION.PASSWORD_REQUIRED,
      },
      additionalProperties: VALIDATION.NO_EXTRA_FIELDS,
      type: VALIDATION.TYPE_OBJECT,
    },
  },
};

export const refreshToken = {
  body: {
    type: "object",
    properties: {
      refreshToken: {
        type: "string",
        minLength: 1,
        errorMessage: {
          type: VALIDATION.TOKEN_STRING,
          minLength: VALIDATION.TOKEN_REQUIRED,
        },
      },
    },
    required: ["refreshToken"],
    additionalProperties: false,
    errorMessage: {
      required: { refreshToken: AUTH_MESSAGES.VALIDATION.TOKEN_REQUIRED },
      additionalProperties: VALIDATION.NO_EXTRA_FIELDS,
      type: VALIDATION.TYPE_OBJECT,
    },
  },
};

export const logout = {
  body: {
    type: "object",
    properties: {
      refreshToken: {
        type: "string",
        minLength: 1,
      },
    },
    additionalProperties: false,
  },
};