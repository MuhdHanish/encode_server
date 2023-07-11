import { User } from "../../domain/models/User";
import { MongoDBUser } from "../database/models/userModel";
import bcrypt from 'bcryptjs';

export type userRepository = {
  findByUsername: (username: string) => Promise<User | null>;
  findByEmail: (email: string) => Promise<User | null >;
  findOne: (user: User) => Promise<User | null>;
  create: (user: User) => Promise<User | null>;
};


export const userRepositoryEmpl = (userModel: MongoDBUser): userRepository => {

 const findByUsername = async (username: string): Promise<User | null > => {
  const user = await userModel.findOne({ username });
  return user ? user.toObject() : null;
 };

 const findByEmail = async (email: string): Promise<User | null> => {
  const user = await userModel.findOne({ email });
  return user ? user.toObject() : null;
 };

 const findOne = async (user: User): Promise<User | null> => {
  const currentUser = await userModel.findOne(user);
  return currentUser ? currentUser.toObject() : null;
 };

 const create = async (user: User): Promise<User | null> => {
  const hashPass:string = await bcrypt.hash(user.password as string, 12 as number);
  const newUser: User = {
   username: user.username,
   email: user.email,
   password: hashPass,
   role: user.role,
   status:true,
   isGoogle: user.isGoogle
  }
  const createdUser = await userModel.create(newUser);
  return createdUser.toObject();
 };

 return {
  findByUsername,
  findByEmail,
  findOne,
  create
 };

};