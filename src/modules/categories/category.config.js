export const CATEGORY_MESSAGES = Object.freeze({
  SUCCESS: {
    CREATED: "Category created successfully",
    UPDATED: "Category updated successfully",
    DELETED: "Category deleted successfully",
    ALL_FETCHED: "Categories retrieved successfully",
    ONE_FETCHED: "Category retrieved successfully",
  },
  ERROR: {
    NOT_FOUND: "Category not found",
    NAME_IN_USE: "This category name already exists",
  },
  VALIDATION: {
    TYPE_OBJECT: "Body data must be an object",
    NO_EXTRA_FIELDS: "Unrecognized fields are not allowed",
    NAME_STRING: "Name must be a text string",
    NAME_LENGTH: "Name must be at least 2 characters long",
    NAME_REQUIRED: "Name is required",
    DESCRIPTION_STRING: "Description must be a text string",
    DESCRIPTION_LENGTH: "Description must be at least 1 character long",
  },
});