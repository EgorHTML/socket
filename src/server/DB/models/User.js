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

userSchema.statics.login = async function (email, password) {
    let auth = false
    const user = await this.findOne({ email })

    if (user)
        auth = await bcrypt.compare(password, user.password)
    else
        throw new Error('Неверный логин.')

    if (!auth) throw new Error('Неверный пароль.')

    return user
}

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

export const User = mongoose.model('user', userSchema)