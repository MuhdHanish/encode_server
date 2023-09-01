import { Course } from "../../../domain/models/Course";
import { courseRepository } from "../../../framework/repository/courseRepository";


export const  setSelectedCourse = (courseRepository: courseRepository) => async (courseId:string,userId:string): Promise<Course | null> => {
    const course = await courseRepository.setSelectedCourse(courseId,userId);
    return course ? course : null;
}
