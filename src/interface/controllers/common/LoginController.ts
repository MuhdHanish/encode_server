import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { userModel } from "../../../framework/database/models/userModel";
import { userRepositoryEmpl } from "../../../framework/repository/userRepository";
import { userLogin } from "../../../app/usecases/common/userLogin";

const userRepository = userRepositoryEmpl(userModel);

export const loginController = async (req: Request, res: Response) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { email, password } = req.body;
  const currentUser = await userLogin(userRepository)(email, password);
  if (currentUser) {
   return res.status(200).json({ message: "Login successfull", currentUser });
  }else{
   return res.status(401).json({message: "No active account found with the given credentials"})
  }
 } catch (error) {
  return res.status(500).json({ message: "Internal server error" });
 }
}