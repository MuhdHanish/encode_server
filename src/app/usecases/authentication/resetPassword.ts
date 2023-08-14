import { User } from "../../../domain/models/User";
import { userRepository } from "../../../framework/repository/userRepository";

export const resetPassword = (userRepository: userRepository) => async(usernameOrEmail:string,newPassword:string): Promise<User|null> => {
  const user = await userRepository.resetPassword(usernameOrEmail,newPassword);
  if (user) {
    return user;
  } else {
    return null;
  }
}