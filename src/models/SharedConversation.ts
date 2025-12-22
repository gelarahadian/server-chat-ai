import mongoose from "mongoose";

const sharedConversationSchema = new mongoose.Schema({
  conversation_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
    required: true,
    unique: true,
  },

  share_token: {
    type: String,
    required: true,
    unique: true,
  },

  shared_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  is_public: {
    type: Boolean,
    default: true,
  },

  view_count: {
    type: Number,
    default: 0,
  },

  expires_at: {
    type: Date, 
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
});

const SharedConversation = mongoose.model(
  "SharedConversation",
  sharedConversationSchema
);

export default SharedConversation;
