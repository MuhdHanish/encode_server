import mongoose from "mongoose";
import { User } from "./User";
import { Chat } from "./Chat";

export interface Message {
  _id?:mongoose.Types.ObjectId,
  sender?: mongoose.Types.ObjectId | User,
  content?: string,
  chat?: mongoose.Types.ObjectId | Chat
}