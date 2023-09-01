import { Review } from "../../../domain/models/Review";
import { reviewRepository } from "../../../framework/repository/reviewRepository";

export const getAllReviews =  (reviewRepository: reviewRepository) =>  async(course: string): Promise<Review[] | null> => {
  const reviews = await reviewRepository.getAllReviews(course);
  return reviews ? reviews : null;
};

export const postReview =  (reviewRepository: reviewRepository) =>  async(course: string, user:string, review: string, rating: number): Promise<Review | null> => {
  const postedReview = await reviewRepository.postReview(course, user, review, rating);
  return postedReview ? postedReview : null;
};

export const getReviewsCount = (reviewRepository: reviewRepository) => async (course: string): Promise<number | null> => { 
  const count = await reviewRepository.getReviewsCount(course);
  return count ? count : null;
}

export const isRecorded = (reviewRepository: reviewRepository) => async (course:string,user: string): Promise<boolean> => {
  const review = await reviewRepository.isRecorded(course, user);
  return review ? true : false;
}

export const updateReview = (reviewRepository: reviewRepository) => async (id: string, review: Review): Promise<Review | null> => {
  const updatedReview = await reviewRepository.editReview(id, review);
  return updatedReview ? updatedReview : null;
}

export const deleteReview = (reviewRepository: reviewRepository) => async (id: string): Promise<Review | null> => {
  const deletedReview = await reviewRepository.deleteReview(id);
  return deletedReview ? deletedReview : null;
}

export const getReviewByCredential = (reviewRepository: reviewRepository) => async(id:string, course:string, user:string): Promise<Review|null> =>{
  const review = await reviewRepository.getReviewByCredential(id, course, user);
  return review ? review : null;
}