import { Chat } from "../../../domain/models/Chat";
import { Message } from "../../../domain/models/Message";
import { chatRepository } from "../../../framework/repository/chatRepository";

export const accessChat = (chatRepository: chatRepository) => async (userId: string, secUserId: string): Promise<Chat | null> => {
  const chat = await chatRepository.accessChat(userId, secUserId);
  return chat ? chat : null;
}

export const fetchChats = (chatRepository: chatRepository) => async (userId: string): Promise<Chat[] | null> => {
  const chats = await chatRepository.fetchChats(userId);
  return chats ? chats : null;
}

export const updateLatestMessage = (chatRepository: chatRepository) => async (chatId: string, message: Message): Promise<Chat | null> => {
  const chat = await chatRepository.updateLatestMessage(chatId, message);
  return chat ? chat : null;
}