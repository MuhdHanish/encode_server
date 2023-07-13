import { Request, Response } from "express";
import { courseModel } from "../../../framework/database/models/courseModel";
import { courseRepositoryEmpl } from "../../../framework/repository/courseRepository";
import { getCourses } from "../../../app/usecases/course/getCourses";

const courseRepository = courseRepositoryEmpl(courseModel);

const getCoursesController = async (req: Request, res: Response) => {
 try {
  const courses = await getCourses(courseRepository)();
  if (courses) {
    return res.status(200).json({ message: "Courses fetched sucessfully", courses });
  } else {
    return res.status(400).json({ message: "Course fetching failed" });
  }
 } catch (error) {
  res.status(500).json({ message: "Internal server error" });
 }
}