import mongoose from "mongoose";

const chatModel = new mongoose.Schema({
    role: {
        type: String, 
        enum: ['user', 'assistant'],
        required: true
    }, 
    content: {
        type: String, 
        required: true
    },
    created_at: {
        type: Date, 
        default: Date.now
    }
})

const Chat = mongoose.model("Chat", chatModel);

export default Chat