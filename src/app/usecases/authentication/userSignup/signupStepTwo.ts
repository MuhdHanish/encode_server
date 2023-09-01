import { User } from "../../../../domain/models/User";
import { userRepository } from "../../../../framework/repository/userRepository";

export const signupStepTwo =
  (userRepository: userRepository) =>
  async (username: string,email: string,password: string,role: string): Promise<User | null> => {
    const userDetails: User = { username, email, password, role };
    const user = await userRepository.create(userDetails);
    return user ? user : null;
};
