import { Request, Response } from "express";
import {  postReview, getReviewsCount, isRecorded } from "../../../app/usecases/review/review";
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

const postReviewController = async (req: CustomRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { id } = req.params;
    const { review, rating } = req.body;
    const recorded = await isRecorded(reviewRepository)(id, req.userInfo?.id as string);
    if (!recorded) {
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
    } else {
      return res.status(409).json({ message: "Review already recorded" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};


export default postReviewController;