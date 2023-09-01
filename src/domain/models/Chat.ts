import mongoose from "mongoose";
import { User } from "./User";
import { Message } from "./Message";

export interface Chat {
  _id?: mongoose.Types.ObjectId,
  users?: mongoose.Types.ObjectId[] | User[],
  latestMessage?: mongoose.Types.ObjectId | Message
}