import { Request, Response } from "express";
import { getAllReviews} from "../../../app/usecases/review/review";
import { reviewModel } from "../../../framework/database/models/reviewModel";
import { reviewRepositoryEmpl } from "../../../framework/repository/reviewRepository";
import { validationResult } from "express-validator";

const reviewRepository = reviewRepositoryEmpl(reviewModel);

const getAllReviewsController = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { id } = req.params;
    const reviews = await getAllReviews(reviewRepository)(id);
    return res.status(200).json({ message: "Reviews fetched successfully", reviews });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default getAllReviewsController;