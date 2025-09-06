import express from "express";
import Notesroutes from "./Routes/NotesRoutes.js";
import AuthRoutes from "./Routes/AuthRoutes.js";
import { Connectdb } from "./Config/DB.js";
import dotenv from "dotenv";
import { Ratelimiter } from "./Middleware/Ratelimiter.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// ✅ CORS setup (all origins for now, restrict later in production)
app.use(cors({ origin: "*" }));
app.use(express.json());

// Health check
app.get("/test", (req, res) => res.send("✅ Server is working"));

// ✅ Apply rate limiter
app.use(Ratelimiter);

// Routes
app.use("/api/notes", Notesroutes);
app.use("/api/auth", AuthRoutes);

// DB connect + start server
Connectdb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err);
    process.exit(1);
  });
