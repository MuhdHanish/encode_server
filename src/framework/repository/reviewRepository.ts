import mongoose from "mongoose";
import { MongoDBReview } from "../database/models/reviewModel";
import { Review } from "../../domain/models/Review";

export type reviewRepository = {
  getAllReviews: (course: string) => Promise<Review[] | null>;
  getReviewsCount: (course: string) => Promise<number | null>;
  postReview: (course: string, user: string, review: string, rating: number) => Promise<Review | null>;
  isRecorded: (coruse: string, user: string) => Promise<Review | null>;
};

export const reviewRepositoryEmpl = (reviewModel: MongoDBReview): reviewRepository => {
  const getAllReviews = async (course: string): Promise<Review[] | null> => {
    const reviews = await reviewModel.find({ course: new mongoose.Types.ObjectId(course) }).populate("user", "username email profile").exec();
    return reviews.length > 0 ? reviews : null;
  };
  const postReview = async (course: string, user: string, review: string, rating: number): Promise<Review | null> => {
    const newReview: Review = {
      course: new mongoose.Types.ObjectId(course),
      user: new mongoose.Types.ObjectId(user),
      review,
      rating
    }
    const createdReview = (await reviewModel.create(newReview));
    const savedReview = await createdReview.populate("user", "username email profile");
    return savedReview ? savedReview.toObject() : null;
  };
  const getReviewsCount = async (course: string): Promise<number | null> => {
    const count = await reviewModel.find({ course: new mongoose.Types.ObjectId(course) }).countDocuments();
    return count;
  }
  const isRecorded = async (course: string, user: string): Promise<Review | null> => {
    const review = await reviewModel.findOne({ $and: [{ course: new mongoose.Types.ObjectId(course), user: new mongoose.Types.ObjectId(user) }] }).exec();
    return review ? review.toObject() : null;
  }
return {
    getAllReviews,
    postReview,
    getReviewsCount,
    isRecorded
  };
};