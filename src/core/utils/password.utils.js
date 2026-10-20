// ======================= PASSWORD UTILITIES =======================
// Password hashing and comparison using bcrypt
// Used for secure password storage and verification

import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (plainPassword, hashedPassword) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};