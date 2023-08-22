import { Request, Response } from "express";
import { getReviewByCredential, updateReview } from "../../../app/usecases/review/review";
import { reviewModel } from "../../../framework/database/models/reviewModel";
import { reviewRepositoryEmpl } from "../../../framework/repository/reviewRepository";
import { validationResult } from "express-validator";

interface CustomRequest extends Request {
  userInfo?: { id: string; role: string };
}

const reviewRepository = reviewRepositoryEmpl(reviewModel);

const updateReviewController = async (req: CustomRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { id } = req.params;
    const { course, review, rating } = req.body;
    const exist = await getReviewByCredential(reviewRepository)(id, course, req.userInfo?.id as string);
    if(exist){
      const updatedReview = await updateReview(reviewRepository)(id, { review, rating });
      if (updatedReview) {
        return res.status(200).json({ message: "Review updated successfully", updatedReview });
      } else {
        return res.status(400).json({ message: "Error on updating review" });
      }
    } else {
      return res.status(401).json({ message: "Unauthorized: No review found with your credential" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default updateReviewController;