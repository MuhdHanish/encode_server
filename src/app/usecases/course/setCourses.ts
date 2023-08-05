import { User } from "../../../domain/models/User";
import { userRepository } from "../../../framework/repository/userRepository";


export const setSelectedCourse = (userRepository: userRepository) => async (userId:string,courseId:string): Promise<User | null> => {
  try {
    const user = await userRepository.setSelectedCourse(userId, courseId);
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    return null
  }
}
