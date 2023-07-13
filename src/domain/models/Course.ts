import mongoose from "mongoose";

interface SylabusSession {
  session: string;
  description: string;
}

interface Assignment {
  question: string;
  rightAns: string;
  options: string[];
}

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
  sylabus?: SylabusSession[];
  imgUrl?: string;
  videoUrl?: string;
  status?: boolean;
  rating?: number;
  assignments?: Assignment[];
}
