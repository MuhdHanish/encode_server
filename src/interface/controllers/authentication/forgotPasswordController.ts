import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { userRepositoryEmpl } from "../../../framework/repository/userRepository";
import { userModel } from "../../../framework/database/models/userModel";
import { forgotPassword } from "../../../app/usecases/authentication/forgotPassword";

const userRepository = userRepositoryEmpl(userModel);
 
const forgotPasswordController = async (req: Request, res: Response) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { identifier } = req.body;
  const  uId  = await forgotPassword(userRepository)(identifier);
  if (uId) {
    return res.status(200).json({ uId });
  } else {
   return res.status(401).json({ message: "No active account found with the given credentials" });
  } 
 } catch (error) {
  return res.status(500).json({ message: "Internal server error" });
 }
};

export default forgotPasswordController;