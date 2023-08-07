import { Request, Response } from "express";
import { courseModel } from "../../../framework/database/models/courseModel";
import { courseRepositoryEmpl } from "../../../framework/repository/courseRepository";
import { getCoursesByLanguageName, getCoursesCount, getCoursesCountByLanguageName, listCourse, unListCourse } from "../../../app/usecases/course/courseCases";
import { validationResult } from "express-validator";

const courseRepository = courseRepositoryEmpl(courseModel);

export const getCoursesCountController = async (req: Request, res: Response) => {
 try {
   const count = await getCoursesCount(courseRepository)();
   return res.status(200).json({ message: "Fetched the course count", count });
 } catch (error) {
  return res.status(500).json({ message: "Internal server error" });
 }
}

export const getCoursesByLanguageNameController = async (req: Request, res: Response) => {
  try {
   const errors = validationResult(req);
   if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { id } = req.params;
   const courses = await getCoursesByLanguageName(courseRepository)(id);
   return res.status(200).json({ message: "Fetched the courses by language name", courses });
 } catch (error) {
  return res.status(500).json({ message: "Internal server error" });
 }
}

export const getCoursesCountByLanguageNameController = async (req: Request, res: Response) => {
  try {
   const errors = validationResult(req);
   if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { id } = req.params;
   const count = await getCoursesCountByLanguageName(courseRepository)(id);
   return res.status(200).json({ message: "Fetched the course count", count });
 } catch (error) {
  return res.status(500).json({ message: "Internal server error" });
 }
}

export const listCourseController = async (req: Request, res: Response) => {
  try {
   const errors = validationResult(req);
   if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { id } = req.params;
   const course = await listCourse(courseRepository)(id);
   return res.status(200).json({ message: "Listed the course ", course });
 } catch (error) {
  return res.status(500).json({ message: "Internal server error" });
 }
}

export const unListCourseController = async (req: Request, res: Response) => {
  try {
   const errors = validationResult(req);
   if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { id } = req.params;
   const course = await unListCourse(courseRepository)(id);
   return res.status(200).json({ message: "Un listed the course ", course });
 } catch (error) {
  return res.status(500).json({ message: "Internal server error" });
 }
}
