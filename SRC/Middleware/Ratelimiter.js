import { ratelimit } from "../Config/Upstash.js";

export const Ratelimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit(req.ip);

    if (!success) {
      return res.status(429).json({ message: "⛔ Too Many Requests, Limit Reached" });
    }

    next();
  } catch (error) {
    console.error("RateLimiter Error:", error);
    res.status(500).json({ message: "⚠️ Internal Server Error" });
  }
};
