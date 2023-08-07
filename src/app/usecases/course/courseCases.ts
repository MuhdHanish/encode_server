import { Course } from "../../../domain/models/Course";
import { User } from "../../../domain/models/User";
import { courseRepository } from "../../../framework/repository/courseRepository";


export const updateCoursesCourseName = (courseRepository: courseRepository) => async (oldName:string,newName:string):Promise<boolean|null> => {
  const isUpdated = await courseRepository.updateCoursesLanguageName(oldName,newName);
  if (isUpdated) {
    return isUpdated;
  } else {
    return null;
  }
}

export const getCoursesCount = (courseRepository: courseRepository) => async ():Promise<number|null> => {
  const count = await courseRepository.getCoursesCount();
  if (count) {
    return count;
  } else {
    return null;
  }
}

export const listCourse = (courseRepository: courseRepository) => async(courseId:string):Promise<Course|null> => {
  const course = await courseRepository.listCourse(courseId);
  if (course) {
    return course;
  } else {
    return null;
  }
}

export const unListCourse = (courseRepository: courseRepository) => async(courseId:string):Promise<Course|null> => {
  const course = await courseRepository.unListCourse(courseId);
  if (course) {
    return course;
  } else {
    return null;
  }
}

export const getCourseStudents = (courseRepository: courseRepository) => async (courseId: string): Promise<User[]|null > => {
  const students = await courseRepository.getCourseStudents(courseId);
  if (students) {
    return students;
  } else {
    return null;
  }
}