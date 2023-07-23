import { Course } from "../../../domain/models/Course";
import { courseRepository } from "../../../framework/repository/courseRepository";


export const postCourse = (courseRepository: courseRepository) => async (courseDetails: Course): Promise<Course | null> => {
  try {
    const course = await courseRepository.postCourse(courseDetails);
    if (course) {
      return course;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null
  }
}