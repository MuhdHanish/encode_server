import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { postCourse } from "../../../app/usecases/course/postCourse";
import { courseModel } from "../../../framework/database/models/courseModel";
import { LanguageModel } from "../../../framework/database/models/LanguageModel";
import { courseRepositoryEmpl } from "../../../framework/repository/courseRepository";
import { languageRepositoryEmpl } from "../../../framework/repository/LanguageRepository";
import { getLanguageByName } from "../../../app/usecases/language/getLanguageByCredentail";
const courseRepository = courseRepositoryEmpl(courseModel);
const languageRepository = languageRepositoryEmpl(LanguageModel);

const postCourseController = async (req: Request, res: Response) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { language } = req.body;
  const isExist = await getLanguageByName(languageRepository)(language);
  if (isExist) {
   const course = await postCourse(courseRepository)(req.body);
   if (course) {
    return res.status(201).json({ message: "Course posted sucessfully", course });
   } else {
   return res.status(400).json({ message: "Course upload failed" });
   }
  } else {
   return res.status(400).json({ message: "Language is not valid" });
  }
 } catch (error) {
  console.log(error);
  return res.status(500).json({ message: "Internal server error" });
 }
}

export default postCourseController;