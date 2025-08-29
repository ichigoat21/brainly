import mongoose, { Schema, Types } from "mongoose";
import dotenv from "dotenv"

dotenv.config()
console.log(process.env.MONGO_DB_PASS)

const DB_URI = `mongodb+srv://shivresides:${process.env.MONGO_DB_PASS}@second-brain.4jq3gmh.mongodb.net/?retryWrites=true&w=majority&appName=second-brain`;


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
  type:  String,
  title: { type: String, required: true },
  tags: [{ type: Types.ObjectId, ref: 'Tag' }],
  userId: { type: Types.ObjectId, ref: 'user', required: true },
});
const linkSchema = new Schema({
  hash : String,
  userId: { type: Types.ObjectId, ref: 'user', required: true },
});


const contentModel = mongoose.model("content", contentSchema)
const userModel = mongoose.model("user", userSchema);
const linkModel = mongoose.model("link", linkSchema)

export default {userModel, contentModel, linkModel}; 