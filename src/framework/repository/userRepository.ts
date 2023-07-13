import { User } from "../../domain/models/User";
import { MongoDBUser } from "../database/models/userModel";
import bcrypt from "bcryptjs";

export type userRepository = {
  findByUsernameAndEmail: (username: string, email: string) => Promise<User | null>;
  findByUsernameOrEmail: (usernameOrEmail: string) => Promise<User | null>;
  findOne: (user: User) => Promise<User | null>;
  create: (user: User) => Promise<User | null>;
};

export const userRepositoryEmpl = (userModel: MongoDBUser): userRepository => {

  const findByUsernameAndEmail = async (username: string, email: string): Promise<User | null> => {
    const user = await userModel.findOne({ $or: [{ username }, { email }] }).exec();
    return user !== null ? user.toObject() : null;
  };

  const findByUsernameOrEmail = async (usernameOrEmail: string): Promise<User | null> => {
    const user = await userModel.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] }).exec();
    return user !== null ? user.toObject() : null;
  };

  const findOne = async (user: User): Promise<User | null> => {
    const currentUser = await userModel.findOne(user).exec();
    return currentUser !== null ? currentUser.toObject() : null;
  };

  const create = async (userDetails: User): Promise<User | null> => {
    const hashPass: string = await bcrypt.hash(userDetails.password as string, 12);
    const userData: User = {
      username: userDetails.username, email: userDetails.email,
      password: hashPass, role: userDetails.role, isGoogle: false,
    };
    const createdUser = (await userModel.create(userData)).toObject();
    const user: User = {
      _id: createdUser._id, username: createdUser.username,
      email: createdUser.email,role: createdUser.role,
      profile: createdUser.profile,
    };
    return createdUser !== null ? user : null;
  };

  return {
    findByUsernameAndEmail,
    findByUsernameOrEmail,
    findOne,
    create,
  };
};
