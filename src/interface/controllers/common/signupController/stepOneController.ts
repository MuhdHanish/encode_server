import { Request, Response } from "express";
import { otpSender } from "../../../../utils/otpSendAndStore";
import { validationResult } from "express-validator";
import { userModel } from "../../../../framework/database/models/userModel";
import { userRepositoryEmpl } from "../../../../framework/repository/userRepository";
import { signupStepOne } from "../../../../app/usecases/common/userSignup/signupStepOne";

const userRepository = userRepositoryEmpl(userModel);
 
const stepOneController = async (req: Request, res: Response) => {
 try {

  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email,username,role } = req.body;
  const { userExist, message } = await signupStepOne(userRepository)(username, email);
  
  if (!userExist) {
   
   otpSender(email, `otp varification of ${role}`)

  } else {
   return res.status(409).json({ message });
  }
 } catch (error) {
  return res.status(500).json({ message: "Internal server error" });
 }
};

export default stepOneController