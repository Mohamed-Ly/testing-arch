// ======================= DATABASE CONNECTION =======================
// Sequelize database connection and initialization
// Exports sequelize instance, connectDB function, and Sequelize class

import { Sequelize } from "sequelize";
import config from "./env.config.js";

export const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.pass,
  {
    host: config.db.host,
    port: config.db.port,
    dialect: config.db.dialect,
    logging: config.nodeEnv === "development" ? console.log : false,
    timezone: "+02:00",
  },
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: false });
    console.log("Sequelize connected successfully");
  } catch (error) {
    console.error("Sequelize connection failed:", error.message);
    throw error;
  }
};

export { Sequelize as SequelizeClass };