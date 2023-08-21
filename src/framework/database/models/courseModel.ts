import mongoose, { Model, Schema, Document } from "mongoose";
import { Course } from "../../../domain/models/Course";

export type MongoDBCourse = Model<Document<any, any, any> & Course>;

const courseSchema = new Schema<Course>({
  tutor: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  coursename: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: Boolean, required: true, default: true },
  language: { type: String, required: true },
  isPaid: { type: Boolean, required: true },
  price: { type: Number, required: true },
  level: { type: String, required: true },
  demoUrl: { type: String, required: true },
  chapters: { type: [Object], required: true },
  rating: { type: Number, required: true, default: 0 },
  students: { type: [String] },
  purchaseHistory: { type: [Object] },
});

export const courseModel: MongoDBCourse = mongoose.connection.model<
  Document<any, any, any> & Course
>("Course", courseSchema);
