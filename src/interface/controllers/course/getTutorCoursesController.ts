import { Request, Response } from "express";
import { courseModel } from "../../../framework/database/models/courseModel";
import { courseRepositoryEmpl } from "../../../framework/repository/courseRepository";
import { getTutorCourses } from "../../../app/usecases/course/getTutorCourses";

const courseRepository = courseRepositoryEmpl(courseModel);

const getTutorCoursesController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const courses = await getTutorCourses(courseRepository)(id);
    if (courses) {
      return res
        .status(200)
        .json({ message: "Courses fetched sucessfully", courses });
    } else {
      return res.status(400).json({ message: "No courses found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default getTutorCoursesController;
