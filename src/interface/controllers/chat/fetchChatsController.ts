import { Request, Response } from "express";
import { fetchChats } from "../../../app/usecases/chat/chat";
import { chatModel } from "../../../framework/database/models/chatModel";
import { chatRepositoryEmpl } from "../../../framework/repository/chatRepository";

interface CustomRequest extends Request {
  userInfo?: { id: string; role: string };
}

const chatRepository = chatRepositoryEmpl(chatModel);


const fetchChatsController = async (req: CustomRequest, res: Response) => {
  try {
    const chats = await fetchChats(chatRepository)(req.userInfo?.id as string);
    return res.status(200).json({message:"Fetched chats successfully", chats});
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export default fetchChatsController;