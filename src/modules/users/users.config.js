// ======================= USERS MODULE CONFIG =======================
// Configuration for users module including validation and error messages
// Messages for profile management, admin user CRUD operations

export const USER_MESSAGES = Object.freeze({
  SUCCESS: {
    PROFILE_FETCHED: "Profile retrieved successfully",
    PROFILE_UPDATED: "Profile updated successfully",
    PASSWORD_CHANGED: "Password changed successfully",
    PICTURE_UPLOADED: "Profile picture uploaded successfully",
    USER_CREATED: "User created successfully",
    USER_UPDATED: "User updated successfully",
    USER_DELETED: "User deleted successfully",
    USERS_FETCHED: "Users retrieved successfully",
    USER_FETCHED: "User retrieved successfully",
  },
  ERROR: {
    NOT_FOUND: "User not found",
    EMAIL_EXISTS: "Email already exists",
    USERNAME_EXISTS: "Username already exists",
    CURRENT_PASSWORD_INCORRECT: "Current password is incorrect",
    SAME_PASSWORD: "New password must be different from current password",
    CANNOT_DELETE_SELF: "You cannot delete your own account",
    CANNOT_DELETE_ADMIN: "Cannot delete admin account",
    UPDATE_FAILED: "Update failed, please try again",
  },
  VALIDATION: {
    TYPE_OBJECT: "Body data must be an object",
    NO_EXTRA_FIELDS: "Unrecognized fields are not allowed",
    FULLNAME_STRING: "Full name must be a text string",
    FULLNAME_MIN_LENGTH: "Full name must be at least 3 characters",
    USERNAME_STRING: "Username must be a text string",
    USERNAME_MIN_LENGTH: "Username must be at least 3 characters",
    USERNAME_NO_SPACES: "Username cannot contain spaces",
    EMAIL_STRING: "Email must be a text string",
    EMAIL_FORMAT: "Please enter a valid email address",
    PASSWORD_STRING: "Password must be a text string",
    PASSWORD_MIN_LENGTH: "Password must be at least 8 characters",
    WEAK_PASSWORD: "Password must contain uppercase, lowercase, and number",
    CURRENT_PASSWORD_REQUIRED: "Current password is required",
    NEW_PASSWORD_REQUIRED: "New password is required",
    FULLNAME_REQUIRED: "Full name is required",
    USERNAME_REQUIRED: "Username is required",
    PASSWORD_REQUIRED: "Password is required",
    MIN_ONE_FIELD: "At least one field must be provided",
    IMAGE_REQUIRED: "Please upload an image file",
  },
});