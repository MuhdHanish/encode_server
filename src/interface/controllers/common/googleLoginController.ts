import mongoose from "mongoose";
import { Request, Response } from "express";
import { userLogin } from "../../../app/usecases/common/userLogin";
import { userModel } from "../../../framework/database/models/userModel";
import { userRepositoryEmpl } from "../../../framework/repository/userRepository";
import { generateAccessToken, generateRefreshToken } from "../../../utils/jwtTokenUtils";

interface CustomRequest extends Request {
  userInfo?: {
    email?: string;
    username?: string;
  };
}

const userRepository = userRepositoryEmpl(userModel);

const googleLoginController = async(req: CustomRequest, res: Response) => {
  try {
    const email = req.userInfo?.email;
    const user = await userLogin(userRepository)(email as string, email as string);
  if (user) { 
  const accessToken = await generateAccessToken(user?._id as mongoose.Types.ObjectId, user?.role as string);
  const refreshToken = await generateRefreshToken(user?._id as mongoose.Types.ObjectId, user?.role as string);
  return res.status(200).json({ user, accessToken,refreshToken });
  }else{
   return res.status(401).json({message: "No active account found with the given credentials"})
  }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default googleLoginController;