import mongoose from "mongoose";

export interface User {
  _id?: mongoose.Types.ObjectId;
  username?: string;
  email?: string;
  password?: string;
  role?: string;
  status?: boolean;
  isGoogle?: boolean;
  profile?: string;
  seletedCourses?: mongoose.Types.ObjectId[];
};
