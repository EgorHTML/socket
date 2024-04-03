import mongoose from "mongoose";
    
const chatSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        minLength: 1
    }
})

export const Chat = mongoose.model('chat', chatSchema)