import { User } from "../../../../domain/models/User";
import { userRepository } from "../../../../framework/repository/userRepository";

export const signupStepTwo =
  (userRepository: userRepository) =>
  async (username: string,email: string,password: string,role: string,isGoogle: boolean
  ): Promise<User | null> => {
    const newUser: User = {
      username,
      email,
      password,
      role,
      isGoogle,
    };
    const createdUser = await userRepository.create(newUser);
    return createdUser;
};
