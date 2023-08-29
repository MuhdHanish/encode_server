import mongoose from "mongoose";
import { MongoDBReview } from "../database/models/reviewModel";
import { Review } from "../../domain/models/Review";

export type reviewRepository = {
  getAllReviews: (course: string) => Promise<Review[] | null>;
  getReviewsCount: (course: string) => Promise<number | null>;
  postReview: (course: string,user: string,review: string,rating: number) => Promise<Review | null>;
  isRecorded: (coruse: string, user: string) => Promise<Review | null>;
  getReviewByCredential: (id: string, course: string, user:string) => Promise<Review | null>;
  editReview: (id: string, review: Review) => Promise<Review | null>;
  deleteReview: (id: string) => Promise<Review | null>;
};
export const reviewRepositoryEmpl = (reviewModel: MongoDBReview): reviewRepository => {
  
  const getAllReviews = async (course: string): Promise<Review[] | null> => {
    try {
      const reviews = await reviewModel
        .find({ course: new mongoose.Types.ObjectId(course) })
        .populate("user", "-password")
        .exec();
      return reviews.length > 0 ? reviews : null;
    } catch (error) {
      console.error("Error getting all reviews:", error);
      return null;
    }
  };

  const getReviewByCredential = async (id: string, course: string, user: string): Promise<Review | null> => {
    try {
      const review = await reviewModel.findOne({_id: new mongoose.Types.ObjectId(id), course: new mongoose.Types.ObjectId(course), user: new mongoose.Types.ObjectId(user)});
      return review ? review.toObject() : null;
    } catch (error) {
      console.error("Error getting review by credentials:", error);
      return null;
    }
  };

  const editReview = async (id: string, review: Review): Promise<Review | null> => {
    try {
      const editedReview = await reviewModel.findByIdAndUpdate(id, review, { new: true });
      return editedReview ? editedReview : null;
    } catch (error) {
      console.error("Error editing review:", error);
      return null;
    }
  };

  const deleteReview = async (id: string): Promise<Review | null> => {
    try {
      const deletedReview = await reviewModel.findByIdAndDelete(id);
      return deletedReview ? deletedReview.toObject() : null;
    } catch (error) {
      console.error("Error deleting review:", error);
      return null;
    }
  };

  const postReview = async (course: string, user: string, review: string, rating: number): Promise<Review | null> => {
    try {
      const newReview: Review = {
        course: new mongoose.Types.ObjectId(course),
        user: new mongoose.Types.ObjectId(user),
        review,
        rating
      }
      const createdReview = await reviewModel.create(newReview);
      const savedReview = await createdReview.populate("user", "-password");
      return savedReview ? savedReview.toObject() : null;
    } catch (error) {
      console.error("Error posting review:", error);
      return null;
    }
  };

  const getReviewsCount = async (course: string): Promise<number | null> => {
    try {
      const count = await reviewModel.find({ course: new mongoose.Types.ObjectId(course) }).countDocuments();
      return count;
    } catch (error) {
      console.error("Error getting reviews count:", error);
      return null;
    }
  };

  const isRecorded = async (course: string, user: string): Promise<Review | null> => {
    try {
      const review = await reviewModel.findOne({ $and: [{ course: new mongoose.Types.ObjectId(course), user: new mongoose.Types.ObjectId(user) }] }).exec();
      return review ? review.toObject() : null;
    } catch (error) {
      console.error("Error checking if review is recorded:", error);
      return null;
    }
  };

return {
    getAllReviews,
    postReview,
    getReviewsCount,
    isRecorded,
    deleteReview,
    editReview,
    getReviewByCredential
  };
};