import { Course } from "../../../domain/models/Course";
import { courseRepository } from "../../../framework/repository/courseRepository";


export const postCourse = (courseRepository: courseRepository) => async (courseDetails: Course): Promise<Course | null> => {
 const course = await courseRepository.postCourse(courseDetails);
 return course;
}