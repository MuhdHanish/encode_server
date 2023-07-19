import mongoose from "mongoose";
import { Request, Response } from "express";
import { userModel } from "../../../../framework/database/models/userModel";
import { validationResult } from "express-validator";
import { userRepositoryEmpl } from "../../../../framework/repository/userRepository";
import { signupStepTwo } from "../../../../app/usecases/common/userSignup/signupStepTwo";
import { generateAccessToken, generateRefreshToken } from "../../../../utils/jwtTokenUtils";

const userRepository = userRepositoryEmpl(userModel);

const stepTwoController = async (req: Request, res: Response) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
   const { username, email, password, role } = req.body;
   const user = await signupStepTwo(userRepository)(username, email, password, role);
   if (!user) {
     return res.status(400).json({ message: "Registration failed" });
   } else {
     const accessToken = await generateAccessToken(user?._id as mongoose.Types.ObjectId, user?.role as string);
     const refreshToken = await generateRefreshToken(user?._id as mongoose.Types.ObjectId, user?.role as string);
     return res.status(201).json({ user, accessToken,refreshToken });
   }
  } catch (error) {
   return res.status(500).json({ message: "Internal server error" });
  }
};

export default stepTwoController;