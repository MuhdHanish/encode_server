import mongoose from "mongoose";
import { Course } from "./Course";
import { User } from "./User";

export interface Review {
  course?: mongoose.Types.ObjectId|Course,
  user?: mongoose.Types.ObjectId|User,
  review?: string,
  rating?: number
};