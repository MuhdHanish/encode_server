import { Request, Response } from "express";
import { getAllReviews, postReview, getReviewsCount } from "../../../app/usecases/review/review";
import { reviewModel } from "../../../framework/database/models/reviewModel";
import { reviewRepositoryEmpl } from "../../../framework/repository/reviewRepository";
import { validationResult } from "express-validator";
import { changeRating } from "../../../app/usecases/course/changeRating";
import { courseRepositoryEmpl } from "../../../framework/repository/courseRepository";
import { courseModel } from "../../../framework/database/models/courseModel";
import mongoose from "mongoose";

interface CustomRequest extends Request {
  userInfo?: { id: string; role: string };
}

const reviewRepository = reviewRepositoryEmpl(reviewModel);
const courseRepository = courseRepositoryEmpl(courseModel);

export const getAllReviewsController = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())return res.status(400).json({ errors: errors.array() });
    const { id } = req.params;
    const reviews = await getAllReviews(reviewRepository)(id);
    return res.status(200).json({ message: "Reviews fetched successfully", reviews });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const postReviewController = async (req: CustomRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())return res.status(400).json({ errors: errors.array() });
    const { id } = req.params;
    const { review, rating } = req.body;
    const newReview = await postReview(reviewRepository)(id, req.userInfo?.id as string, review, rating);
    if (newReview) {
      const count = await getReviewsCount(reviewRepository)(id);
      const updatedCourse = await changeRating(courseRepository)(newReview.course as mongoose.Types.ObjectId, newReview.rating as number, count as number)
      if (updatedCourse) {
        return res.status(201).json({ message: "New review added ", newReview });
      } else {
        return res.status(400).json({ message: "Error on changing review of course" });
      }
    } else {
      return res.status(400).json({ message: "Error on adding review" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}