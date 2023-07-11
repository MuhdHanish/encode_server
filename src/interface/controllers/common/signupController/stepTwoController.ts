import { Request, Response } from "express";
import { userModel } from "../../../../framework/database/models/userModel";
import { validationResult } from "express-validator";
import { userRepositoryEmpl } from "../../../../framework/repository/userRepository";
import { signupStepTwo } from "../../../../app/usecases/common/userSignup/signupStepTwo";

const userRepository = userRepositoryEmpl(userModel);

const stepTwoController = async (req: Request, res: Response) => {
 try {

  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

   const { username, email, password, isGoogle, role } = req.body;
   const createdUser = await signupStepTwo(userRepository)(username, email, password, role, isGoogle);
   return res.status(200).json({ message: "Signup successfull",createdUser });
   
  } catch (error) {
   return res.status(500).json({ message: "Internale server error" });
  }
};

export default stepTwoController;