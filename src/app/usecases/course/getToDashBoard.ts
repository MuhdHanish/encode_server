import { courseRepository } from "../../../framework/repository/courseRepository";

export const getDataToAdminDashboard =
  (courseRepository: courseRepository) => async (): Promise<{_id:string,total:number}[] | null> => {
    const courses = await courseRepository.getCourseDetailsDashborad();
    return courses ? courses : null;
  };

export const getDataToTutorDashboard =
  (courseRepository: courseRepository) =>async (tutorId:string): Promise<{_id:string,total:number}[] | null> => {
    const courses = await courseRepository.getCourseDetailsTutorDashborad(tutorId);
    return courses ? courses : null;
  };
