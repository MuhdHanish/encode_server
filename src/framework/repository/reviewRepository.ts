import mongoose from "mongoose";
import { MongoDBReview } from "../database/models/reviewModel";
import { Review } from "../../domain/models/Review";

export type reviewRepository = {
  getAllReviews: (courseId: string) => Promise<Review[] | null>;
  postReview: (course: string, user: mongoose.Types.ObjectId, review: string, rating: number) => Promise<Review | null>;
};

export const reviewRepositoryEmpl = (reviewModel: MongoDBReview): reviewRepository => {
   const getAllReviews = async(course: string): Promise<Review[] | null> => {
     const reviews = await reviewModel.find({ course }).populate("user", "username email profile").exec();
     return reviews.length > 0 ? reviews : null;
   }
  const postReview = async(course: string, user: mongoose.Types.ObjectId, review: string, rating: number): Promise<Review | null> => {
    const newReview: Review = {
      course: new mongoose.Types.ObjectId(course),
      user: new mongoose.Types.ObjectId(user),
      review,
      rating
    }
    const createdReview = (await reviewModel.create(newReview));
    const savedReview = await createdReview.populate("user", "username email profile");
    return savedReview ? savedReview.toObject() : null;
  }

return {
    getAllReviews,
    postReview,
  };
};