import express from 'express'
import mongoose, { mongo, Mongoose } from 'mongoose'

const UserSchema = new mongoose.Schema({
    username :{
        type : String,
        required : true,
        trim : true
    },
    email :{
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true
    },
    password :{
        type : String,
        required : true,
        trim : true
    }
},{ timestamps : true }
)

export const User = mongoose.model("User", UserSchema)