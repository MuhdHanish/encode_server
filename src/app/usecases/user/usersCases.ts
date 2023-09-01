import { User } from "../../../domain/models/User";
import { userRepository } from "../../../framework/repository/userRepository";

export const getUsers = (userRepository: userRepository) => async (): Promise<User[] | null> => {
  const users = await userRepository.getUsers();
  return users ? users : null;
};

export const getUsersByRole = (userRepository: userRepository) => async (role: string): Promise<User[] | null> => {
  const users = await userRepository.getUsersByRole(role);
  return users ? users : null;
};

export const getUsersCount = (userRepository: userRepository) => async (): Promise<number | null> => {
  const count = await userRepository.getUsersCount();
  return count ? count : null;
};

export const getUsersCountByRole = (userRepository: userRepository) => async(role:string):Promise<number|null> => {
  const count = await userRepository.getUsersCountByRole(role);
  return count ? count : null;
}

export const blockUser = (userRepository: userRepository) => async (userId: string): Promise<User | null> => {
  const user = await userRepository.blockUser(userId);
  return user ? user : null;
};


export const unBlockUser = (userRepository: userRepository) => async (userId: string): Promise<User | null> => {
  const user = await userRepository.unBlockUser(userId);
  return user ? user : null;
};

export const editProfileImage = (userRepository: userRepository) => async (id: string, profile: string): Promise<User | null> => {
  const user = await userRepository.updateProfileImage(id, profile);
  return user ? user : null;
};

export const editCredentials = (userRepository: userRepository) => async (id: string, email: string, username:string): Promise<User | null> => {
  const user = await userRepository.updateCredentials(id, email, username);
  return user ? user : null;
};

export const followMethods =  (userRepository: userRepository) => async (id: string, userId:string): Promise<User | null> => {
  const user = await userRepository.followMethods(id, userId);
  return user ? user : null;
};

export const unfollowMethods =  (userRepository: userRepository) => async (id: string, userId:string): Promise<User | null> => {
  const user = await userRepository.unfollowMethods(id, userId);
  return user ? user : null;
};

export const removeMethods =  (userRepository: userRepository) => async (id: string, userId:string): Promise<User | null> => {
  const user = await userRepository.removeMethods(id, userId);
  return user ? user : null;
};
