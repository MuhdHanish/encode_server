import { Request, Response } from "express";
import { courseModel } from "../../../framework/database/models/courseModel";
import { courseRepositoryEmpl } from "../../../framework/repository/courseRepository";
import { getStudentCourses } from "../../../app/usecases/course/getStudentCourses";

const courseRepository = courseRepositoryEmpl(courseModel);

interface CustomRequest extends Request {
  userInfo?: { id: string; role: string };
}


const getStudentCoursesController = async (req: CustomRequest, res: Response) => {
  try {
    const courses = await getStudentCourses(courseRepository)(req.userInfo?.id as string);
    if (courses) {
      return res
        .status(200)
        .json({ message: "Courses fetched sucessfully", courses });
    } else {
      return res.status(400).json({ message: "No courses found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export default getStudentCoursesController;
