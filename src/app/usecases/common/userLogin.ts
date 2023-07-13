import { User } from "../../../domain/models/User";
import bcrypt from "bcryptjs";
import { userRepository } from "../../../framework/repository/userRepository";

export const userLogin =
  (userRepository: userRepository) =>
  async (identifier: string, password: string): Promise<User | null> => {
    const currentUser = await userRepository.findByUsernameOrEmail(identifier);
    if (currentUser && currentUser.status) {
      if (
        currentUser.password &&
        bcrypt.compareSync(password, currentUser.password)
      ) {
        let user: User;
        if (currentUser.role === "admin") {
          user = {
            _id: currentUser._id,
            role: currentUser.role,
          };
        } else {
          user = {_id: currentUser._id,username: currentUser.username,
            email: currentUser.email,role: currentUser.role,
            profile: currentUser.profile,
          };
        }
        return user;
      } else {
        return null;
      }
    } else {
      return null;
    }
  };
