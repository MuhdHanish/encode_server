import mongoose from "mongoose";
import { Review } from "../../../domain/models/Review";
import { reviewRepository } from "../../../framework/repository/reviewRepository";

export const getAllReviews = async (reviewRepository:reviewRepository) => async(course:string): Promise<Review[]|null> => {
  const reviews = await reviewRepository.getAllReviews(course);
  return reviews?.length  as number > 0 ? reviews : null;
}

export const postReview = async (reviewRepository: reviewRepository) => async (course: string, user: mongoose.Types.ObjectId, review: string, rating: number): Promise<Review | null> => {
  const postedReview = await reviewRepository.postReview(course, user, review, rating);
  return postedReview ? postedReview : null;
}