import mongoose from "mongoose";
import { Message } from "../../domain/models/Message";
import { MongoDBMessage } from "../database/models/messgeModel";

export type messageRepository = {
  fetchMessages: (chatId: string) => Promise<Message[] | null>;
  sendMessage: (senderId: string, chatId: string, content: string) => Promise<Message | null>;
};

export const messageRepositoryEmpl = (messageModel: MongoDBMessage): messageRepository => {

  const fetchMessages = async (chatId: string): Promise<Message[] | null> => {
    try {
      const messages = await messageModel.find({ chat: new mongoose.Types.ObjectId(chatId) })
        .populate("sender", "-password -following -followers")
        .populate("chat");
      return messages.length > 0 ? messages : null;
    } catch (error) {
      console.log("Error on fetching messages :", error);
      return null;
    }
  };

  const sendMessage = async (senderId: string, chatId: string, content: string): Promise<Message | null> => {
    try {
      const newMessage: Message = {
        sender: new mongoose.Types.ObjectId(senderId),
        chat: new mongoose.Types.ObjectId(chatId),
        content
      };
      let message = (await messageModel.create(newMessage));
      message = await message.populate("sender", "-password -following -followers");
      message = await message.populate("chat");
      return message ? message : null;
    } catch (error) {
      console.log("Error on fetching messages :", error);
      return null;
    }
  };

  return {
    fetchMessages,
    sendMessage
  };
};