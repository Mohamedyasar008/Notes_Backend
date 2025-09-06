import express from "express";
import { DeleteNotes, GetNotebyId, GetNotes, PostNotes, UpdateNotes } from "../Controllers/NotesControllers.js";
import { AuthMiddleware } from "../Middleware/AuthMiddleware.js";

const router = express.Router();

router.use(AuthMiddleware)

router.get("/", GetNotes);
router.get("/:id", GetNotebyId);
router.post("/", PostNotes);
router.put("/:id", UpdateNotes);
router.delete("/:id", DeleteNotes);

export default router;
