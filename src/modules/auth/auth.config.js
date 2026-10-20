// ======================= AUTH MODULE CONFIG =======================
// Configuration for auth module including validation messages
// Centralized messages for login, register, token refresh

export const AUTH_MESSAGES = Object.freeze({
  SUCCESS: {
    LOGIN: "Login successful",
    LOGOUT: "Logout successful",
    TOKEN_REFRESHED: "Token refreshed successfully",
    REGISTER: "Registration successful",
  },
  ERROR: {
    INVALID_CREDENTIALS: "Invalid email or password",
    USER_NOT_FOUND: "User not found",
    ACCOUNT_INACTIVE: "Account is inactive",
    TOKEN_EXPIRED: "Token has expired",
    INVALID_TOKEN: "Invalid token",
    REFRESH_TOKEN_REQUIRED: "Refresh token is required",
    EMAIL_EXISTS: "Email already registered",
    USERNAME_EXISTS: "Username already taken",
  },
  VALIDATION: {
    TYPE_OBJECT: "Body data must be an object",
    NO_EXTRA_FIELDS: "Unrecognized fields are not allowed",
    EMAIL_STRING: "Email must be a text string",
    EMAIL_REQUIRED: "Email is required",
    EMAIL_FORMAT: "Please enter a valid email address",
    PASSWORD_STRING: "Password must be a text string",
    PASSWORD_REQUIRED: "Password is required",
    PASSWORD_MIN_LENGTH: "Password must be at least 8 characters",
    USERNAME_STRING: "Username must be a text string",
    USERNAME_REQUIRED: "Username is required",
    USERNAME_MIN_LENGTH: "Username must be at least 3 characters",
    USERNAME_NO_SPACES: "Username cannot contain spaces",
    FULLNAME_STRING: "Full name must be a text string",
    FULLNAME_REQUIRED: "Full name is required",
    FULLNAME_MIN_LENGTH: "Full name must be at least 3 characters",
    TOKEN_STRING: "Token must be a text string",
    TOKEN_REQUIRED: "Token is required",
  },
});