import { Message } from "../../../domain/models/Message";
import { messageRepository } from "../../../framework/repository/messageRepository";

export const fetchMessages = (messageRepository: messageRepository) => async (chatId: string): Promise<Message[] | null> => {
  const messages = await messageRepository.fetchMessages(chatId);
  return messages ? messages : null;
}

export const sendMessage = (messageRepository: messageRepository) => async (senderId: string, chatId: string, content: string): Promise<Message | null> => {
  const message = await messageRepository.sendMessage(senderId, chatId, content);
  return message ? message : null;
}