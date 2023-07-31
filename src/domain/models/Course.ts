import mongoose from "mongoose";

export interface Course {
  tutorId?: mongoose.Types.ObjectId;
  _id?: mongoose.Types.ObjectId;
  coursename?: string;
  shortDescription?: string;
  isPaid?: boolean;
  price?: number;
  level?: string;
  description?: string;
  category?: string;
  videos?: string[];
  status?: boolean;
  rating?: number;
}
