// ======================= VALIDATION MIDDLEWARE =======================
// AJV-based request validation middleware
// Validates request body, query, params, headers against JSON schemas

import Ajv from "ajv";
import addErrors from "ajv-errors";
import addFormats from "ajv-formats";
import AppError from "../utils/AppError.js";
import { ERROR_MESSAGES } from "../../config/messages.js";

const methods = ["headers", "body", "params", "query"];

const ajv = new Ajv({
  allErrors: true,
  coerceTypes: true,
  $data: true,
  strict: false,
});

addFormats(ajv);
addErrors(ajv);

export const validation = (schema) => {
  return (req, res, next) => {
    let hasError = false;
    
    for (const method of methods) {
      if (schema[method]) {
        const validate = ajv.compile(schema[method]);
        const valid = validate(req[method]);
        if (!valid) {
          hasError = true;
          return validationError(validate.errors, next);
        }
      }
    }
    
    if (!hasError) {
      next();
    }
  };
};

const validationError = (errors, next) => {
  let errorList = {};
  let field;

  errors.forEach((errorValue) => {
    if (errorValue.instancePath) {
      field = errorValue.instancePath.split("/")[1];
    } else {
      field =
        errorValue?.params?.missingProperty ||
        errorValue?.params?.errors?.[0]?.params?.missingProperty ||
        "field";
    }

    let finalMessage = errorValue.message;
    if (errorValue.keyword === "required") {
      finalMessage = `${field} is required`;
    }

    errorList = { ...errorList, [field]: finalMessage };
  });

  next(new AppError(ERROR_MESSAGES.VALIDATION_FAILED, 400, "VALIDATION_FAILED", errorList));
};