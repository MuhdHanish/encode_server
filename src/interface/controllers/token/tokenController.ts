import { Request, Response } from "express";
import { generateAccessToken } from "../../../utils/jwtTokenUtils";
import mongoose from "mongoose";

interface CustomRequest extends Request {
  userInfo?: { id: mongoose.Types.ObjectId; role: string };
}

const refreshTokenController = async (req: CustomRequest, res: Response):Promise<any> => {
 try {
   const accessToken = await generateAccessToken(req.userInfo?.id as mongoose.Types.ObjectId, req.userInfo?.role as string);
    return res.status(201).json(accessToken);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default refreshTokenController;
