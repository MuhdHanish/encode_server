import { Request, Response } from "express";
import { fetchMessages } from "../../../app/usecases/message/message";
import { messageModel } from "../../../framework/database/models/messgeModel";
import { messageRepositoryEmpl } from "../../../framework/repository/messageRepository";
import { validationResult } from "express-validator";

interface CustomRequest extends Request {
  userInfo?: { id: string; role: string };
}

const messageRepository = messageRepositoryEmpl(messageModel);

const fetchMessagesController = async (req: CustomRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { id } = req.params;
    const messages = await fetchMessages(messageRepository)(id);
    return res.status(200).json({ message: "Fetched messages successfully", messages });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default fetchMessagesController;