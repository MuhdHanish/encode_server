import { Course } from "../../../domain/models/Course";
import { courseRepository } from "../../../framework/repository/courseRepository";

export const getTutorCourses =
  (courseRepository: courseRepository) =>async (id:string): Promise<Course[] | null> => {
    const courses = await courseRepository.getTutorCourses(id);
    if (courses) {
      return courses;
    } else {
      return null;
    }
  };
