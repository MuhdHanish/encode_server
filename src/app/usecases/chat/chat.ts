import { Chat } from "../../../domain/models/Chat";
import { chatRepository } from "../../../framework/repository/chatRepository";

export const accessChat = (chatRepository: chatRepository) => async (userId: string, secUserId: string): Promise<Chat | null> => {
  const chat = await chatRepository.accessChat(userId, secUserId);
  return chat ? chat : null;
}

export const fetchChats = (chatRepository: chatRepository) => async (userId: string): Promise<Chat[] | null> => {
  const chats = await chatRepository.fetchChats(userId);
  return chats ? chats : null;
}