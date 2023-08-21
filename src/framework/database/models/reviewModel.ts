import mongoose, { Model, Schema, Document } from "mongoose";
import { Review } from "../../../domain/models/Review";

export type MongoDBReview = Model<Document<any, any, any> & Review>;

const reviewSchema = new Schema<Review>({
  course: { type: mongoose.Types.ObjectId, ref: "Course", required: true },
  user:   { type: mongoose.Types.ObjectId, ref: "User", required: true },
  review: { type: String, required: true, trim: true },
  rating: { type:Number, required: true}
});

export const reviewModel: MongoDBReview = mongoose.connection.model<
  Document<any, any, any> & Review
>("Review", reviewSchema);