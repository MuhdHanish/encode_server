import mongoose from "mongoose";
import { Chat } from "../../domain/models/Chat";
import { MongoDBChat } from "../database/models/chatModel";
import { Message } from "../../domain/models/Message";

export type chatRepository = {
  accessChat: (userId: string, secUserId: string) => Promise<Chat | null>;
  fetchChats: (userId: string) => Promise<Chat[] | null>;
  updateLatestMessage: (chatId: string, message: Message) => Promise<Chat | null>;
};

export const chatRepositoryEmpl = (chatModel: MongoDBChat): chatRepository => {

  const accessChat = async (userId: string, secUserId: string): Promise<Chat | null> => {
    try {
      let isChat = await chatModel
        .findOne({
          $and: [
            { users: { $elemMatch: { $eq: new mongoose.Types.ObjectId(userId) } } },
            { users: { $elemMatch: { $eq: new mongoose.Types.ObjectId(secUserId) } } },
          ],
        })
        .populate("users", "-password -following -followers")
        .populate("latestMessage");
      if (isChat) {
        return isChat;
      } else {
        const chatData = { users: [userId, secUserId] };
        const createdChat = await chatModel.create(chatData);
        isChat = await chatModel.findById(createdChat._id).populate("users", "-password -following -followers");
        return isChat ? isChat : null;
      }
    } catch (error) {
      console.log("Error on accessing chat :", error);
      return null;
    }
  };

  const fetchChats = async (userId: string): Promise<Chat[] | null> => {
    try {
        const chats = await chatModel
         .find({
           users: { $elemMatch: { $eq: new mongoose.Types.ObjectId(userId) } },
         })
         .populate("users", "-password following -followers")
         .populate("latestMessage")
         .sort({ updatedAt: -1 });
      return chats.length > 0 ? chats : null;
    } catch (error) {
      console.log("Error on fetching chats :", error);
      return null;
    }
  };

  const updateLatestMessage = async (chatId: string, message: Message): Promise<Chat|null> => {
    try {
      const updatedChat = await chatModel.findByIdAndUpdate(chatId, { $set: { latestMessage: message } }, { new: true });
      return updatedChat ? updatedChat : null;
    } catch (error) {
      console.log("Error on updating latest message :", error);
      return null;
    }
  }

  return {
    accessChat,
    fetchChats,
    updateLatestMessage
  };
}