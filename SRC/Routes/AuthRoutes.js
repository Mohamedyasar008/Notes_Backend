import express from "express"
import { AllUsers, LoggedUser, LoginUser, RegisterUser } from "../Controllers/AuthControllers.js"
import { AuthMiddleware } from "../Middleware/AuthMiddleware.js"

const router = express.Router()

router.post("/register", RegisterUser)
router.post("/login", LoginUser)

// ✅ Get logged-in user details
router.get("/me", AuthMiddleware ,LoggedUser)

// ✅ Get all users (for testing/admin)
router.get("/all", AuthMiddleware , AllUsers)
export default router