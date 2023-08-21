import mongoose from "mongoose";
import { Course } from "../../../domain/models/Course";
import { courseRepository } from "../../../framework/repository/courseRepository";

export const changeRating = (courseRepository: courseRepository) => async (course: mongoose.Types.ObjectId, rating: number, count: number): Promise<Course|null> => {
  const updateCourse = await courseRepository.changeReview(course, rating, count);
  if (updateCourse) {
    return updateCourse;
  } else {
    return null;
  }
}