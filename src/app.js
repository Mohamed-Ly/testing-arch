import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import path from "path";

import globalError from "./core/middlewares/globalError.middleware.js";
import limiter from "./core/middlewares/rateLimiter.js";
import adminRouter from "./modules/index.admin.router.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

app.use(
  cors({
    origin: "*",
  }),
);

const API_PREFIX = process.env.API_PREFIX || "/api";

app.use(`${API_PREFIX}/dashboard`, adminRouter);

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use((req, res) => {
  res.status(404).json({
    message: "invalid Router",
    url: req.originalUrl,
  });
});

app.use(globalError);

process.on("unhandledRejection", (err) => {
  console.log(`unhandledRejection: ${err?.name} | ${err?.message}`);
  console.log(err);
});

export default app;