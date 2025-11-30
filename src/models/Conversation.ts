import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: 'true'
    },
    title: String,
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat",
        }
    ],
    created_at: {
        type: Date,
        default: Date.now
    }
})

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation