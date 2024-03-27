import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    email: {
        unique: true,
        type: String,
        required: true
    },
    password: {
        type: String,
        minLength: 6,
        required: true
    }
})

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

export const user = mongoose.model('user', userSchema)