// ======================= RATE LIMITER =======================
// Express rate limiting middleware
// Prevents abuse by limiting requests per IP

import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    status: "fail",
    key: "TOO_MANY_REQUESTS",
    message: "Too many requests from this IP, please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default limiter;