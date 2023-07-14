import { Request, Response } from "express";
import { courseModel } from "../../../framework/database/models/courseModel";
import { categoryModel } from "../../../framework/database/models/categoryModel";
import { courseRepositoryEmpl } from "../../../framework/repository/courseRepository";
import { categoryRepositoryEmpl } from "../../../framework/repository/categoryRepository";
import { getCategoryByName } from "../../../app/usecases/category/getCategoryByCredentail";
import { postCourse } from "../../../app/usecases/course/postCourse";
import { validationResult } from "express-validator";

const courseRepository = courseRepositoryEmpl(courseModel);
const categoryRepository = categoryRepositoryEmpl(categoryModel);

const postCourseController = async (req: Request, res: Response) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { category } = req.body;
  const isExist = await getCategoryByName(categoryRepository)(category);
  if (isExist) {
   const course = await postCourse(courseRepository)(req.body);
   if (course) {
    return res.status(201).json({ message: "Course posted sucessfully", course });
   } else {
   return res.status(400).json({ message: "Course post failed" });
   }
  } else {
   return res.status(400).json({ message: "Category is not valid" });
  }
 } catch (error) {
  console.log(error);
  return res.status(500).json({ message: "Internal server error" });
 }
}

export default postCourseController;