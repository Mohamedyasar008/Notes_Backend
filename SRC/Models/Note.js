import express from "express";
import mongoose, { mongo, Mongoose, SchemaType } from "mongoose";
import { User } from "./User.js"

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // link to User
        ref: "User", // references User model
        required: true
    }
}, { timestamps: true } // Using this mongodb will give us the createdAt and updatedAt
)
export const Note = mongoose.model("Note", NoteSchema)