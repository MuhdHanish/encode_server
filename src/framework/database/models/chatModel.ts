import mongoose, { Model, Schema, Document } from "mongoose";
import { Chat } from "../../../domain/models/Chat";

export type MongoDBChat = Model<Document<any, any, any> & Chat>;

const chatSchema = new Schema<Chat>(
  {
    users: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    latestMessage: { type: mongoose.Types.ObjectId, ref: "Message" },
  },
  {
    timestamps: true,
  }
);

export const chatModel: MongoDBChat = mongoose.connection.model<
  Document<any, any, any> & Chat
>("Chat", chatSchema);
