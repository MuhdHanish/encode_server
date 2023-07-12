import { User } from "../../../domain/models/User";
import bcrypt from "bcryptjs";
import { userRepository } from "../../../framework/repository/userRepository";

export const userLogin =
  (userRepository: userRepository) =>
  async (email: string, password: string): Promise<User | null> => {
    const currentUser = await userRepository.findByEmail(email);
    if (currentUser&&currentUser.status) {
      if (
        currentUser.password &&
        bcrypt.compareSync(password, currentUser.password)
      ) {
        const user: User = {
          _id: currentUser._id,
          username: currentUser.username,
          email: currentUser.email,
          role: currentUser.role,
          profile: currentUser.profile
        }
        return user;
      } else {
        return null;
      }
    } else {
      return null;
    }
  };
