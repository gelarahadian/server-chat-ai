import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: "true",
  },
  title: String,
  messageIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

conversationSchema.pre("findOneAndDelete", async function (next) {
  try {
    const doc = await this.model.findOne(this.getQuery());

    if (doc) {
      await mongoose.model("Chat").deleteMany({
        _id: { $in: doc.messages },
      });
    }

    next();
  } catch (error: any) {
    next(error);
  }
});

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation