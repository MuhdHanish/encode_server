import { userRepository } from "../../../../framework/repository/userRepository";

export const signupStepOne =
  (userRepository: userRepository) =>
  async (username: string,email: string): Promise< { message: string|boolean }> => {
    let userExist = await userRepository.findByUsername(username);
    if (!userExist) {
      userExist = await userRepository.findByEmail(email);
      if (!userExist) {
        return { message:false } ;
      } else {
        return {  message: "Email already existed" };
      }
    } else {
      return { message: "Username already existed" };
    }
  };
