import { User } from "../../../domain/models/User";
import { userRepository } from "../../../framework/repository/userRepository";

export const getUsers = (userRepository: userRepository) => async ():Promise<User[]|null> => {
  const users = await userRepository.getUsers();
  if (users) {
    return users;
  } else {
    return null;
  }
}

export const getUsersByRole = (userRepository: userRepository) => async (role:string):Promise<User[]|null> => {
  const users = await userRepository.getUsersByRole(role);
  if (users) {
    return users;
  } else {
    return null;
  }
}

export const getUsersCount = (userRepository: userRepository) => async ():Promise<number|null> => {
  const count = await userRepository.getUsersCount();
  if (count) {
    return count;
  } else {
    return null;
  }
}

export const getUsersCountByRole = (userRepository: userRepository) => async(role:string):Promise<number|null> => {
  const count = await userRepository.getUsersCountByRole(role);
  if (count) {
    return count;
  } else {
    return null;
  }
}

export const blockUser = (userRepository: userRepository) => async(userId:string):Promise<User|null> => {
  const user = await userRepository.blockUser(userId);
  if (user) {
    return user;
  } else {
    return null;
  }
}


export const unBlockUser = (userRepository: userRepository) => async(userId:string):Promise<User|null> => {
  const user = await userRepository.unBlockUser(userId);
  if (user) {
    return user;
  } else {
    return null;
  }
}

