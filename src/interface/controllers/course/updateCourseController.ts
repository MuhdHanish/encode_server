import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { updateCourse } from "../../../app/usecases/course/updateCourse";
import { courseModel } from "../../../framework/database/models/courseModel";
import { LanguageModel } from "../../../framework/database/models/LanguageModel";
import { courseRepositoryEmpl } from "../../../framework/repository/courseRepository";
import { languageRepositoryEmpl } from "../../../framework/repository/LanguageRepository";
import { getLanguageByName } from "../../../app/usecases/language/getLanguageByCredentail";
const courseRepository = courseRepositoryEmpl(courseModel);
const languageRepository = languageRepositoryEmpl(LanguageModel);

const updateCourseController = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const { language } = req.body;
    const { id } = req.params;
    const isExist = await getLanguageByName(languageRepository)(language);
    if (isExist) {
      const course = await updateCourse(courseRepository)(req.body, id);
      if (course) {
        return res
          .status(201)
          .json({ message: "Course posted sucessfully", course });
      } else {
        return res.status(400).json({ message: "Course update failed" });
      }
    } else {
      return res.status(400).json({ message: "Language is not valid" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default updateCourseController;
