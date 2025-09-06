import express from "express";
import dotenv from "dotenv"
import jwt from "jsonwebtoken";

dotenv.config()

export const AuthMiddleware = async (req,res,next) => {
    
    // this line reads the authorization header from the http req - when client enters the web url then
    // it sends the jwt token in headers so it used to read that header by using the req.headers.authorization
    const AuthHeader = req.headers.authorization 
    if( !AuthHeader || !AuthHeader.startsWith("Bearer ")){
        return res.status(401).json({ message : "No token provided" })
    }

    const Token = AuthHeader.split(" ")[1]

    try {
        const Decode = jwt.verify(Token, process.env.JWT_SECRET)
        req.user = Decode
        next()
    } catch (error) {
        res.status(500).json({ message : "The Token is expired" })
    }


}