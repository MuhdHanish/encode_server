import mongoose from "mongoose";
import { Course } from "./Course";

export interface User {
  _id?: mongoose.Types.ObjectId;
  username?: string;
  email?: string;
  password?: string;
  role?: string;
  status?: boolean;
  isGoogle?: boolean;
  profile?: string;
  seletedCourses?: [Course];
  uploadedCourses?: [Course];
};
