import { Course } from "../../../domain/models/Course";
import { courseRepository } from "../../../framework/repository/courseRepository";


export const  setSelectedCourse = (courseRepository: courseRepository) => async (courseId:string,userId:string): Promise<Course | null> => {
  try {
    const course = await courseRepository.setSelectedCourse(courseId,userId);
    if (course) {
      return course;
    } else {
      return null;
    }
  } catch (error) {
    return null
  }
}
