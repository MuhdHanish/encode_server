import { Course } from "../../../domain/models/Course";
import { courseRepository } from "../../../framework/repository/courseRepository";


export const updateCourse = (courseRepository: courseRepository) => async (courseDetails: Course,id:string): Promise<Course | null> => {
    const course = await courseRepository.updateCourse(courseDetails, id);
    return course ? course : null;
}