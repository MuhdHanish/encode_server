import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { postCourse } from "../../../app/usecases/course/postCourse";
import { setUploadedCourse } from "../../../app/usecases/course/setCourses";
import { courseModel } from "../../../framework/database/models/courseModel";
import { LanguageModel } from "../../../framework/database/models/LanguageModel";
import { userModel } from "../../../framework/database/models/userModel";
import { getLanguageByName } from "../../../app/usecases/language/getLanguageByCredentail";
import { courseRepositoryEmpl } from "../../../framework/repository/courseRepository";
import { languageRepositoryEmpl } from "../../../framework/repository/LanguageRepository";
import { userRepositoryEmpl } from "../../../framework/repository/userRepository";

const courseRepository = courseRepositoryEmpl(courseModel);
const languageRepository = languageRepositoryEmpl(LanguageModel);
const userRepository = userRepositoryEmpl(userModel);

const postCourseController = async (req: Request, res: Response) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { language } = req.body;
  const isExist = await getLanguageByName(languageRepository)(language);
  if (isExist) {
   const course = await postCourse(courseRepository)(req.body);
    if (course) {
      const userId = course.tutor;
      const user = await setUploadedCourse(userRepository)(userId as string, course._id?.toString() as string);
      if (user) {
        return res.status(201).json({ message: "Course posted sucessfully", course, user });
      } else {
        return res.status(400).json({ message: "couser add to tutor failed" });
      }} else {
      return res.status(400).json({ message: "Course upload failed" });
      }} else {
      return res.status(400).json({ message: "Language is not valid" });
  }
 } catch (error) {
  return res.status(500).json({ message: "Internal server error" });
 }
}

export default postCourseController;