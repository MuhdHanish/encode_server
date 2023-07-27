import { Request, Response } from "express";
import { signupGoogle } from "../../../../app/usecases/authentication/userSignup/signupGoogle";
import { userRepositoryEmpl } from "../../../../framework/repository/userRepository";
import { userModel } from "../../../../framework/database/models/userModel";
import { generateAccessToken, generateRefreshToken } from "../../../../utils/jwtTokenUtils";
import mongoose from "mongoose";

const userRepository = userRepositoryEmpl(userModel);

interface CustomRequest extends Request {
  userInfo?: {
    email?: string;
    username?: string;
    profile?:string
  };
}

const googleSignupController = async (req: CustomRequest, res: Response) => {
  try {
    const { role } = req.body;
    const username = req.userInfo?.username;
    const email = req.userInfo?.email;
    const profile = req.userInfo?.profile;
    const {user,message} = await signupGoogle(userRepository)(username as string, email as string, role as string, profile as string);
    if (message) {
    return res.status(409).json({ message });
    } else if (user) {
    const accessToken = await generateAccessToken(user?._id as mongoose.Types.ObjectId, user?.role as string);
    const refreshToken = await generateRefreshToken(user?._id as mongoose.Types.ObjectId, user?.role as string);
    return res.status(201).json({ user, accessToken, refreshToken });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export default googleSignupController;