import { otpSender } from "../../../../utils/otpSendAndStore";
import { userRepository } from "../../../../framework/repository/userRepository";

export const signupStepOne =
  (userRepository: userRepository) =>
    async (username: string, email: string, role: string): Promise<{ message: string | null, uId: string | null }> => {
      try {
        const user = await userRepository.findByUsernameAndEmail(username,email);
         if (user) {
           if (user.username === username) {
             return { message: "Username already exists", uId: null };
           }
           if (user.email === email) {
             return { message: "Email already exists", uId: null };
           }
         }
         const uId = await otpSender(email, `Otp verification of ${role}`);
        return { message: null, uId };
      } catch (error:any) {
        throw new Error(error);
      }
  };
