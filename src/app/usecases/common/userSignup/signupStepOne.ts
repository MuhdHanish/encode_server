import { userRepository } from "../../../../framework/repository/userRepository";

export const signupStepOne =
  (userRepository: userRepository) =>
  async (username: string,email: string): Promise<{ userExist: boolean; message: string }> => {
    let userExist = await userRepository.findByUsername(username);
    if (!userExist) {
      userExist = await userRepository.findByEmail(email);
      if (!userExist) {
        return { userExist: false, message: "Step one compeleted" };
      } else {
        return { userExist: true, message: "Email already existed" };
      }
    } else {
      return { userExist: true, message: "Username already existed" };
    }
  };
