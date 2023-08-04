import { Course } from "../../../domain/models/Course";
import { courseRepository } from "../../../framework/repository/courseRepository";


export const updateCourse = (courseRepository: courseRepository) => async (courseDetails: Course,id:string): Promise<Course | null> => {
  try {
    const course = await courseRepository.updateCourse(courseDetails, id);
    if (course) {
      return course;
    } else {
      return null;
    }
  } catch (error) {
    return null
  }
}