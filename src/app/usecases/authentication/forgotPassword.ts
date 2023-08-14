import { userRepository } from "../../../framework/repository/userRepository";
import { otpSender } from "../../../utils/otpSendAndStore";


export const forgotPassword  =
  (userRepository: userRepository) =>
  async (usernameOrEmail: string): Promise<string | null> => {
    const currentUser = await userRepository.findByUsernameOrEmail(usernameOrEmail);
    if (currentUser && currentUser.status) {
       const uId = await otpSender(currentUser?.email as string, `Otp verification`);
      return uId;
    }
    return null;
  };
