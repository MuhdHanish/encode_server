import { Request, Response } from "express";
import { courseModel } from "../../../framework/database/models/courseModel";
import { courseRepositoryEmpl } from "../../../framework/repository/courseRepository";
import { getTutorCourses, getTutorPopularCourses } from "../../../app/usecases/course/getTutorCourses";
import { validationResult } from "express-validator";

const courseRepository = courseRepositoryEmpl(courseModel);

export const getTutorCoursesController = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { id } = req.params;
    const courses = await getTutorCourses(courseRepository)(id);
    if (courses) {
      return res.status(200).json({ message: "Courses fetched sucessfully", courses });
    } else {
      return res.status(400).json({ message: "No courses found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTutorPopularCoursesController = async (req: Request, res: Response) => {
  try { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { id } = req.params;
    const courses = await getTutorPopularCourses(courseRepository)(id);
    if (courses) {
      return res.status(200).json({ message: "Courses fetched sucessfully", courses });
    } else {
      return res.status(400).json({ message: "No courses found" });
    }
  } catch (error) {
     res.status(500).json({ message: "Internal server error" });
  }
}
