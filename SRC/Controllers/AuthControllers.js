import { User } from "../Models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

// REGISTER USER
export const RegisterUser = async (req,res) =>{
    try {
        const { username, email, password} = req.body

        // All fields are required
        if( !username?.trim() || !email?.trim() || !password?.trim() ){
           return res.status(400).json({ message : "All fields are required" })
        }

        // Check if user already exists
        const ExistUser = await User.findOne({ email })
        if( ExistUser ){
           return res.status(400).json({ message : "User already exists"})
        }

        // Hash password using bcryptjs
        const salt = await bcrypt.genSalt(10)
        const HashedPassword = await bcrypt.hash(password, salt)

        const NewUser = new User({ username, email, password : HashedPassword })
        const reg_user = await NewUser.save()

        // JWT token
        const Token = jwt.sign(
            { id : reg_user._id, email : reg_user.email },
            process.env.JWT_SECRET,
            { expiresIn : "1h" }
        )

        const SafeUser = {
            id : reg_user._id,
            username : reg_user.username,
            email : reg_user.email,
            createdAt : reg_user.createdAt
        }

        res.status(201).json({ message : "User Created", user : SafeUser, token : Token })
    } catch (error) {
        res.status(500).json({ message : "Internal Error", error: error.message })
    }
}

// LOGIN USER
export const LoginUser = async (req,res) =>{
    try {
        const { email, password } = req.body

        if( !email?.trim() || !password?.trim() ){
           return res.status(400).json({ message : "All fields are required" })
        }
        
        const Existing = await User.findOne({ email })
        if (!Existing) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        const IsMatch = await bcrypt.compare(password, Existing.password)
        if (!IsMatch) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        const Token = jwt.sign(
            { id : Existing._id, email : Existing.email },
            process.env.JWT_SECRET,
            { expiresIn : "1h" }
        )

        const SafeUser = {
            id : Existing._id,
            username : Existing.username,
            email : Existing.email,
            createdAt : Existing.createdAt
        }

        res.status(200).json({ message : "Login successful", user : SafeUser, token : Token })
        
    } catch (error) {
        res.status(500).json({ message : "Internal Error", error: error.message })
    }
}

// GET LOGGED IN USER
export const LoggedUser = async (req,res) =>{
    try {
        const user = await User.findById(req.user.id).select("-password")
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}

// GET ALL USERS
export const AllUsers = async (req,res) =>{
    try {
        const users = await User.find().select("-password")
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}
