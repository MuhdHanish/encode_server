import { User } from "../../../domain/models/User";
import bcrypt from "bcryptjs";
import { userRepository } from "../../../framework/repository/userRepository";

export const userLogin =
  (userRepository: userRepository) =>
  async (usernameOrEmail: string, password: string): Promise<User | null> => {
    const currentUser = await userRepository.findByUsernameOrEmailAndPassword(usernameOrEmail, password);
    if (currentUser && currentUser.status) {
        return currentUser;
      }
      return null;
  };
