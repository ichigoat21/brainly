import mongoose, { Schema, Types } from "mongoose";

const DB_URI = "mongodb+srv://shivsssdiscord:7f89YrPFUMFf3CiV@second-brain.4trgwsy.mongodb.net/";


mongoose.connect(DB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ Connection error:", err.message));

const userSchema = new Schema({
  username: { type: String, unique: true },
  password: String
});
const contentTypes = ['image', 'video', 'article', 'audio']; 


const contentSchema = new Schema({
  link: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  tags: [{ type: Types.ObjectId, ref: 'Tag' }],
  userId: { type: Types.ObjectId, ref: 'User', required: true },
});

const contentModel = mongoose.model("content", contentSchema)
const userModel = mongoose.model("user", userSchema);

export default {userModel, contentModel}; 