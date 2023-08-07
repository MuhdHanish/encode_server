import { Course } from "../../domain/models/Course";
import { User } from "../../domain/models/User";
import { MongoDBCourse } from "../database/models/courseModel";

export type courseRepository = {
  getPopularCourses: () => Promise<Course[] | null>;
  getTutorCourses: (tutorId: string) => Promise<Course[] | null>;
  getCourses: ()=> Promise<Course[] | null>;
  getCourseById: (courseId: string) => Promise<Course | null>;
  getCoursesCount: () => Promise<number | null>;
  updateCoursesLanguageName: (oldName: string, newName:string)=> Promise<boolean | null>;
  listCourse: (courseId:string)=> Promise<Course | null>;
  unListCourse: (courseId:string)=> Promise<Course | null>;
  postCourse: (course: Course) => Promise<Course | null>;
  updateCourse: (course: Course, _id: string) => Promise<Course | null>;
  setSelectedCourse: (courseId: string, userId: string) => Promise<Course | null>;
  getCourseStudents: (courseId: string) => Promise<User[] | null>;
};

export const courseRepositoryEmpl = (courseModel: MongoDBCourse): courseRepository => {
  const getPopularCourses = async (): Promise<Course[] | null> => {
    try {
      const courses = await courseModel.find().sort({rating:-1}).exec();
      return courses.length > 0 ? courses : null;
    } catch (error) {
      console.error("Error getting courses:", error);
      return null;
    }
  };

  const getTutorCourses = async (tutorId:string): Promise<Course[] | null> => {
    try {
      const courses = await courseModel.find({tutor:tutorId}).exec();
      return courses.length > 0 ? courses : null;
    } catch (error) {
      console.error("Error getting courses:", error);
      return null;
    }
  };

  const getCourseStudents = async (courseId: string): Promise<User[] | null> => {
  try {
    const enrolledStudents = await courseModel
      .aggregate([
        { $match: { _id: courseId } },
        {
          $lookup: {
            from: "users",
            let: { students: "$students" },
            pipeline: [
              { $match: { $expr: { $in: ["$_id", "$$students"] } } },
              { $project: { password: 0 } }, // Exclude the 'password' field
            ],
            as: "enrolledStudents",
          },
        },
        {
          $project: {
            _id: 0,
            enrolledStudents: 1,
          },
        },
      ])
      .exec();
    return enrolledStudents.length > 0 ? enrolledStudents.map((course) => course.enrolledStudents) : null;
    } catch (error) {
    console.error("Error getting students from course:", error);
    return null;
    }
  };

  const getCoursesCount = async (): Promise<number| null> => {
    try {
      const count = await courseModel.find().countDocuments().exec();
      return count;
    } catch (error) {
      console.error("Error getting courses:", error);
      return null;
    }
  };

  const getCourses = async (): Promise<Course[] | null> => {
    try {
      const courses = await courseModel.find().exec();
      return courses.length > 0 ? courses : null;
    } catch (error) {
      console.error("Error getting courses:", error);
      return null;
    }
  };

  const getCourseById = async (courseId: string): Promise<Course | null> => {
    try {
      const course = await courseModel
        .findById(courseId)
        .populate("tutor", "-password")
        .exec();
      return course !== null ? course.toObject() : null;
    } catch (error) {
      console.error("Error getting course by ID:", error);
      return null;
    }
  };

  const updateCoursesLanguageName = async (oldName: string, newName: string): Promise<boolean | null> => {
    try {
      const cousers = await courseModel.updateMany({ language: oldName }, { $set: { language: newName } }); 
      if (cousers) {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating courses by langugage:", error);
      return null;
    }
  }

  const listCourse = async (courseId: string): Promise<Course | null> => {
    try {
      const course = await courseModel.findByIdAndUpdate(courseId, { $set: { status: true } }, { new: true });
      if (course) {
        return course;
      }
      return null;
    } catch (error) {
      console.error("Error mute course:", error);
      return null;
    }
  }

  
  const setSelectedCourse = async (courseId: string,userId:string): Promise<Course | null> => {
    try {
      const course = await courseModel.findByIdAndUpdate(courseId, { $push: { students: userId } }, { new: true });
      if (course) {
        return course;
      }
      return null;
    } catch (error) {
      console.error("Error adding course user:", error);
      return null;
    }
  }

  const unListCourse = async (courseId: string): Promise<Course | null> => {
    try {
      const course = await courseModel.findByIdAndUpdate(courseId, { $set: { status: false } }, { new: true });
      if (course) {
        return course;
      }
      return null;
    } catch (error) {
      console.error("Error mute course:", error);
      return null;
    }
  }

  const postCourse = async (courseData: Course): Promise<Course | null> => {
    try {
      const createdCourse = await courseModel.create(courseData);
      return createdCourse !== null ? createdCourse.toObject() : null;
    } catch (error) {
      console.error("Error creating course:", error);
      return null;
    }
  };

  const updateCourse = async (CourseDetails: Course,_id:string): Promise<Course | null> => {
    try {
      const updatedCourse = await courseModel
        .findByIdAndUpdate(_id,  CourseDetails , { new: true })
        .exec();
      return updatedCourse !== null ? updatedCourse.toObject() : null;
    } catch (error) {
      console.error("Error editing course:", error);
      return null;
    }
  };

  return {
    getPopularCourses,
    getCourses,
    listCourse,
    getCoursesCount,
    getCourseStudents,
    unListCourse,
    updateCoursesLanguageName,
    getTutorCourses,
    getCourseById,
    postCourse,
    updateCourse,
    setSelectedCourse,
  };
};