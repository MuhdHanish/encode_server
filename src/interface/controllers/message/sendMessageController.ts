import { Request, Response } from "express";
import { sendMessage } from "../../../app/usecases/message/message";
import {messageModel } from "../../../framework/database/models/messgeModel";
import { messageRepositoryEmpl } from "../../../framework/repository/messageRepository";
import { validationResult } from "express-validator";
import { chatRepositoryEmpl } from "../../../framework/repository/chatRepository";
import { chatModel } from "../../../framework/database/models/chatModel";
import { updateLatestMessage } from "../../../app/usecases/chat/chat";


interface CustomRequest extends Request {
  userInfo?: { id: string; role: string };
};

const messageRepository = messageRepositoryEmpl(messageModel);
const chatRepository = chatRepositoryEmpl(chatModel);

const sendMessageController = async (req: CustomRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { id } = req.params;
    const { content } = req.body;
    const message = await sendMessage(messageRepository)(req.userInfo?.id as string, id, content);
    if (message) {
      const chat = await updateLatestMessage(chatRepository)(id, message);
      if (chat) {
        return res.status(201).json({ message: "Message sent successfully", sendedMessage:message });
      } else {
        res.status(400).json({message: "Failed to update latest message in chat",});
      }
    } else {
      res.status(400).json({ message: "Failed to send message" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export default sendMessageController;