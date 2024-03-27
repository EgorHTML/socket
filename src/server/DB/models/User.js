import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        unique:true,
        type: String,
        required: true
    },
    password: {
        type: String,
        minLength: 6,
        required: true
    }
})

export const user = mongoose.model('user', userSchema)