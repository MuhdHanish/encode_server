import { Course } from "../../../domain/models/Course";
import { courseRepository } from "../../../framework/repository/courseRepository";

export const getCourseById = (courseRepository: courseRepository) => async (courseId: string):Promise<Course|null> => {
  const course = await courseRepository.getCourseById(courseId);
  return course ? course : null;
}