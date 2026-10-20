import app from "./app.js";
import config from "./config/env.config.js";
import { connectDB, sequelize } from "./config/database.js";
import { relationships } from "./config/model.index.js";
import { generateAdmin } from "./modules/auth/services/auth.service.js";
import { startAllJobs } from "./core/jobs/index.js";

const PORT = config.port;

const startServer = async () => {
  await connectDB();

  relationships();
  await generateAdmin();

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
  startAllJobs();
};

startServer().catch(async () => {
  process.exitCode = 1;
  try {
    await sequelize.close();
  } catch (error) {
    console.error("Sequelize cleanup failed:", error.message);
  }
});