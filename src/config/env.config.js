// ======================= ENVIRONMENT CONFIGURATION =======================
// Centralized environment configuration with defaults
// Loads all environment variables and provides typed config object

const config = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,

  apiPrefix: process.env.API_PREFIX || "/api",
  appName: process.env.APP_NAME || "Simple Shop",

  db: {
    name: process.env.DB_NAME || "simple_shop_db",
    user: process.env.DB_USER || "root",
    pass: process.env.DB_PASSWORD ?? process.env.DB_PASS ?? "",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    dialect: process.env.DB_DIALECT || "mysql",
  },

  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || "your-access-secret-key",
    refreshSecret: process.env.JWT_REFRESH_SECRET || "your-refresh-secret-key",
    accessExpire: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    refreshExpire: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  },

  admin: {
    name: process.env.ADMIN_NAME || "admin",
    email: process.env.ADMIN_EMAIL || "admin@example.com",
    password: process.env.ADMIN_PASSWORD || "Admin@1234",
  },

  upload: {
    maxSize: process.env.MAX_FILE_SIZE || 5 * 1024 * 1024,
  },
};

export default config;