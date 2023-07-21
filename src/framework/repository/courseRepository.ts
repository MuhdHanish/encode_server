import { Course } from "../../domain/models/Course";
import { MongoDBCourse } from "../database/models/courseModel";

export type courseRepository = {
  getCourses: ()=> Promise<Course[] | null>;
  getCourseByCredential: (credential:Partial<Course>)=> Promise<Course | null>;
  getCoursesByCredential: (credential:Partial<Course>)=> Promise<Course[] | null>;
  getCourseById: (courseId:string)=> Promise<Course | null>;
  postCourse: (course: Course) => Promise<Course | null>;
  editCourse: (course: Course) => Promise<Course | null>;
};

export const courseRepositoryEmpl = (courseModel: MongoDBCourse): courseRepository => {

  const getCourses = async (): Promise<Course[] | null> =>{
   const courses = await courseModel.find().exec();
    return courses.length > 0 ? courses : null;
  }
  
  const getCoursesByCredential = async (credential:Partial<Course>): Promise<Course[] | null> =>{
  const courses = await courseModel.find({ credential }).exec();
  return courses.length > 0 ? courses : null;
  }
 
  const getCourseByCredential = async (credential:Partial<Course>): Promise<Course | null> =>{
   const course = await courseModel.findOne({credential}).exec();
   return course !== null ? course.toObject() : null;
  }
  
 
  const getCourseById = async (courseId:string): Promise<Course | null> =>{
   const course = await courseModel.findOne({_id:courseId}).exec();
   return course !== null ? course.toObject() : null;
  }
 
  const postCourse = async (courseData: Course): Promise<Course | null> => {
    const courseDetails = {
      ...courseData
    }
    const createdCourse = await courseModel.create(courseDetails);
    return createdCourse !== null ? createdCourse.toObject() : null;
  };

  const editCourse = async (CourseDetails: Course): Promise<Course | null> => {
    const { _id, coursename, description } = CourseDetails;
   const updatedCourse = await courseModel.findByIdAndUpdate(
    _id, { coursename, description }, { new: true }
   ).exec();
    return updatedCourse !== null ? updatedCourse.toObject() : null;
  };

  return {
    getCourses,
    getCourseByCredential,
    getCoursesByCredential,
    getCourseById,
    postCourse,
    editCourse,
  };
};
