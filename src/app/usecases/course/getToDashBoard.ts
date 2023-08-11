import { Course } from "../../../domain/models/Course";
import { courseRepository } from "../../../framework/repository/courseRepository";

export const getDataToAdminDashboard =
  (courseRepository: courseRepository) => async (): Promise<{_id:string,total:number}[] | null> => {
    const courses = await courseRepository.getCourseDetailsDashborad();
    if (courses) {
      return courses;
    } else {
      return null;
    }
  };

export const getDataToTutorDashboard =
  (courseRepository: courseRepository) =>async (tutorId:string): Promise<{_id:string,total:number}[] | null> => {
    const courses = await courseRepository.getCourseDetailsTutorDashborad(tutorId);
    if (courses) {
      return courses;
    } else {
      return null;
    }
  };
