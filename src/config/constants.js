// ======================= FOR REGULAR EXPRESSION =======================
export const PATTERNS = Object.freeze({
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
  USERNAME: /^[a-zA-Z0-9_]+$/,
  PHONE: /^\+?[1-9]\d{1,14}$/,
  OTP: /^\d{6}$/,
});
