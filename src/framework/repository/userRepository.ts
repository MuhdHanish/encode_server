import { User } from "../../domain/models/User";
import { MongoDBUser } from "../database/models/userModel";
import bcrypt from "bcryptjs";

export type userRepository = {
  findByUsernameAndEmail: (username: string, email: string) => Promise<User | null>;
  findByUsernameOrEmail: (usernameOrEmail: string) => Promise<User | null>;
  findByEmail: (email: string) => Promise<User | null>;
  findOne: (user: User) => Promise<User | null>;
  create: (user: User) => Promise<User | null>;
};

export const userRepositoryEmpl = (userModel: MongoDBUser): userRepository => {

  const findByUsernameAndEmail = async (username: string,email: string): Promise<User | null> => {
    const users = await userModel.aggregate([ {$match: {$or: [{ username }, { email }],},},]).exec();
    return users.length > 0 ? users[0] : null;
  };

  const findByUsernameOrEmail = async (usernameOrEmail: string): Promise<User | null> => {
  const user = await userModel.aggregate([
    {$match: {$or: [{ username: usernameOrEmail },{ email: usernameOrEmail }]}}
  ]).exec();
  return user.length > 0 ? user[0] : null;
  };

  const findByEmail = async (email: string): Promise<User | null> => {
    const user = await userModel.aggregate([{$match: {email,},},]).exec();
    return user.length > 0 ? user[0] : null;
  };

  const findOne = async (user: User): Promise<User | null> => {
    const currentUser = await userModel.aggregate([{$match: user,},]).exec();
    return currentUser.length > 0 ? currentUser[0] : null;
  };

  const create = async (user: User): Promise<User | null> => {
    const hashPass: string = await bcrypt.hash(user.password as string, 12);
    const newUser: User = {
      username: user.username, email: user.email,
      password: hashPass,role: user.role,isGoogle: false,
    };
    const createdUser = (await userModel.create(newUser)).toObject();
    const userData:User = {
      _id: createdUser._id,username: createdUser.username,
      email: createdUser.email,role: createdUser.role,
      profile: createdUser.profile,
    }
    return userData;
  };

  return {
    findByUsernameAndEmail,
    findByUsernameOrEmail,
    findByEmail,
    findOne,
    create,
  };
};
