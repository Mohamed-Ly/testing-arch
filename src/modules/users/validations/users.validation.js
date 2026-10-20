// ======================= USERS VALIDATIONS =======================
// AJV JSON schemas for users endpoints
// Validates profile updates, password change, admin user CRUD

import { PATTERNS } from "../../../config/constants.js";
import { ERROR_MESSAGES, VALIDATION_MESSAGES } from "../../../config/messages.js";
import { USER_MESSAGES } from "../users.config.js";

const { VALIDATION } = USER_MESSAGES;

export const updateOwnProfile = {
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
    },
    additionalProperties: false,
    minProperties: 1,
    errorMessage: {
      additionalProperties: VALIDATION.NO_EXTRA_FIELDS,
      minProperties: VALIDATION.MIN_ONE_FIELD,
      type: VALIDATION.TYPE_OBJECT,
    },
  },
};

export const changeOwnPassword = {
  body: {
    type: "object",
    properties: {
      currentPassword: {
        type: "string",
        minLength: 1,
        errorMessage: {
          type: VALIDATION.PASSWORD_STRING,
        },
      },
      newPassword: {
        type: "string",
        pattern: PATTERNS.PASSWORD.source,
        errorMessage: {
          type: VALIDATION.PASSWORD_STRING,
          pattern: VALIDATION.WEAK_PASSWORD,
          minLength: VALIDATION.PASSWORD_MIN_LENGTH,
        },
      },
    },
    required: ["currentPassword", "newPassword"],
    additionalProperties: false,
    errorMessage: {
      required: {
        currentPassword: VALIDATION.CURRENT_PASSWORD_REQUIRED,
        newPassword: VALIDATION.NEW_PASSWORD_REQUIRED,
      },
      additionalProperties: VALIDATION.NO_EXTRA_FIELDS,
      type: VALIDATION.TYPE_OBJECT,
    },
  },
};

export const createUser = {
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
          pattern: VALIDATION.WEAK_PASSWORD,
          minLength: VALIDATION.PASSWORD_MIN_LENGTH,
        },
      },
      isAdmin: {
        type: "boolean",
      },
      status: {
        type: "boolean",
      },
    },
    required: ["fullName", "userName", "email", "password"],
    additionalProperties: false,
    errorMessage: {
      required: {
        fullName: VALIDATION.FULLNAME_REQUIRED,
        userName: VALIDATION.USERNAME_REQUIRED,
        email: VALIDATION_MESSAGES.REQUIRED_EMAIL,
        password: VALIDATION.PASSWORD_REQUIRED,
      },
      additionalProperties: VALIDATION.NO_EXTRA_FIELDS,
      type: VALIDATION.TYPE_OBJECT,
    },
  },
};

export const updateUser = {
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
          pattern: VALIDATION.WEAK_PASSWORD,
          minLength: VALIDATION.PASSWORD_MIN_LENGTH,
        },
      },
      isAdmin: {
        type: "boolean",
      },
      status: {
        type: "boolean",
      },
    },
    additionalProperties: false,
    minProperties: 1,
    errorMessage: {
      additionalProperties: VALIDATION.NO_EXTRA_FIELDS,
      minProperties: VALIDATION.MIN_ONE_FIELD,
      type: VALIDATION.TYPE_OBJECT,
    },
  },
};