import { Request, Response } from "express";
import { accessChat } from "../../../app/usecases/chat/chat";
import { chatModel } from "../../../framework/database/models/chatModel";
import { chatRepositoryEmpl } from "../../../framework/repository/chatRepository";
import { validationResult } from "express-validator";

interface CustomRequest extends Request {
  userInfo?: { id: string; role: string };
};

const chatRepository = chatRepositoryEmpl(chatModel);

const accessChatController = async (req: CustomRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { id } = req.params;
    const chat = await accessChat(chatRepository)(req.userInfo?.id as string, id);
    if (chat) {
      return res.status(200).json({ message: "Chat accessed successfully", chat });
    } else {
      return res.status(404).json({ jmesssage: "Chat not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export default accessChatController;