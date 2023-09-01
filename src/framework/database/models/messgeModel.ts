import mongoose, { Model, Schema, Document } from "mongoose";
import { Message } from "../../../domain/models/Message";

export type MongoDBMessage= Model<Document<any, any, any> & Message>;

const messageSchema = new Schema<Message>(
  {
    chat: { type: mongoose.Types.ObjectId, ref: "Chat" },
    content: { type: String, trim: true },
    sender: {type:mongoose.Types.ObjectId, ref:"User"},
  },
  {
    timestamps: true,
  }
);

export const messageModel: MongoDBMessage = mongoose.connection.model<
  Document<any, any, any> & Message
>("Message", messageSchema);
