import mongoose from "mongoose";
import { User } from "./User";

export interface Chapter {
  title?: string;
  description?: string;
  url?: string;
}

export interface Course {
  tutor?: mongoose.Types.ObjectId | User;
  _id?: mongoose.Types.ObjectId;
  coursename?: string;
  isPaid?: boolean;
  price?: number;
  level?: string;
  description?: string;
  language?: string;
  demoUrl?: string;
  status?: boolean;
  rating?: number;
  chapters?: Chapter[];
  students?: string[]
}
