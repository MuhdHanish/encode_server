import { Course } from "../../../domain/models/Course";
import { courseRepository } from "../../../framework/repository/courseRepository";

export const getStudentCourses =
  (courseRepository: courseRepository) =>async (id:string): Promise<Course[] | null> => {
    const courses = await courseRepository.getStudentCourses(id);
    return courses ? courses : null;
  };
