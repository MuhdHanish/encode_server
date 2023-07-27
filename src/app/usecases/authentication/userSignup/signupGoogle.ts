import { User } from "../../../../domain/models/User";
import { userRepository } from "../../../../framework/repository/userRepository";

export const signupGoogle =
  (userRepository: userRepository) =>
  async (username: string,email: string,role: string,profile: string
  ): Promise<{ message: string | null; user: User | null }> => {
    const userDetails: User = { username, email, role, profile };
    try {
      const user = await userRepository.findByUsernameAndEmail(username, email);
      if (user) {
        if (user.username === username) {
          return { message: "Username already exists", user: null };
        }
        if (user.email === email) {
          return { message: "Email already exists", user: null };
        }
      } else {
        const createdUser = await userRepository.googleUserCreate(userDetails);
        return { message: null, user: createdUser };
      }
      throw new Error("Unexpected condition or error occurred.");
    } catch (error: any) {
      throw error;
    }
  };
