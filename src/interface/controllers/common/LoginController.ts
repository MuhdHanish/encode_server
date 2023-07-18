import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { userModel } from "../../../framework/database/models/userModel";
import { userRepositoryEmpl } from "../../../framework/repository/userRepository";
import { userLogin } from "../../../app/usecases/common/userLogin";
import { generateAccessToken, generateRefreshToken } from "../../../utils/jwtTokenUtils";
import mongoose from "mongoose";

const userRepository = userRepositoryEmpl(userModel);

 const loginController = async (req: Request, res: Response) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { identifier, password } = req.body;
  const user = await userLogin(userRepository)(identifier, password);
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
}

export default loginController;