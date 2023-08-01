import mongoose from "mongoose";
import { User } from "./User";

export interface Course {
  tutor?: mongoose.Types.ObjectId | User;
  _id?: mongoose.Types.ObjectId;
  coursename?: string;
  shortDescription?: string;
  isPaid?: boolean;
  price?: number;
  level?: string;
  description?: string;
  language?: string;
  videos?: string[];
  status?: boolean;
  rating?: number;
}
