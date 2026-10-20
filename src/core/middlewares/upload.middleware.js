// ======================= FILE UPLOAD MIDDLEWARE =======================
// Multer configuration for file uploads
// Handles disk storage, file filtering, and directory creation

import multer from "multer";
import path from "path";
import { nanoid } from "nanoid";
import AppError from "../utils/AppError.js";
import { ERROR_MESSAGES } from "../../config/messages.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = req.uploadPath || "uploads/";
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${nanoid()}${ext}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError(ERROR_MESSAGES.INVALID_FILE_TYPE, 400, "INVALID_FILE_TYPE"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const createDir = (...dirs) => {
  return (req, res, next) => {
    const basePath = process.cwd();
    const fullPath = path.join(basePath, "uploads", ...dirs);
    req.uploadPath = { path: fullPath, relativePath: path.join("uploads", ...dirs) };
    next();
  };
};

export const uploadProfileImage = upload;
export const uploadProductImage = upload;