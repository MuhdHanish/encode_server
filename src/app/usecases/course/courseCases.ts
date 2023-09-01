import { Course } from "../../../domain/models/Course";
import { User } from "../../../domain/models/User";
import { courseRepository } from "../../../framework/repository/courseRepository";


export const updateCoursesCourseName = (courseRepository: courseRepository) => async (oldName:string,newName:string):Promise<boolean|null> => {
  const isUpdated = await courseRepository.updateCoursesLanguageName(oldName,newName);
  return isUpdated ? isUpdated : null;
}

export const getCoursesCount = (courseRepository: courseRepository) => async ():Promise<number|null> => {
  const count = await courseRepository.getCoursesCount();
  return count ? count : null;
}

export const listCourse = (courseRepository: courseRepository) => async(courseId:string, tutorId:string):Promise<Course|null> => {
  const course = await courseRepository.listCourse(courseId, tutorId);
  return course ? course : null;
}

export const unListCourse = (courseRepository: courseRepository) => async(courseId:string, tutorId:string):Promise<Course|null> => {
  const course = await courseRepository.unListCourse(courseId, tutorId);
  return course ? course : null;
}

export const getCoursesByLanguageName = (courseRepository: courseRepository) => async(languageName:string):Promise<Course[]|null> => {
  const courses = await courseRepository.getCoursesByLanguageName(languageName);
  return courses ? courses : null;
}

export const getCoursesCountByLanguageName = (courseRepository: courseRepository) => async (languageName: string): Promise<number| null> => {
  const count = await courseRepository.getCoursesCountByLanguageName(languageName);
  return count ? count : null;
}

export const getCourseStudents = (courseRepository: courseRepository) => async (courseId: string): Promise<User[]|null > => {
  const students = await courseRepository.getCourseStudents(courseId);
  return students ? students : null;
}

export const removeStudentCourse = (courseRepository: courseRepository) => async (courseId: string, studentId:string): Promise<User | null> => {
  const course = await courseRepository.removeStudentCourse(courseId, studentId);
  return course ? course : null;
}