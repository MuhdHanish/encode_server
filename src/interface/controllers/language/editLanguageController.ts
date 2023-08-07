import { Request, Response } from "express";
import { postLanguage } from "../../../app/usecases/language/postLanguage";
import { LanguageModel } from "../../../framework/database/models/LanguageModel";
import { languageRepositoryEmpl } from "../../../framework/repository/LanguageRepository";
import { Language } from "../../../domain/models/Language";
import { validationResult } from "express-validator";
import { getLanguageByName } from "../../../app/usecases/language/getLanguageByCredentail";
import { updateCoursesCourseName } from "../../../app/usecases/course/courseCases";
import { courseRepositoryEmpl } from "../../../framework/repository/courseRepository";
import { courseModel } from "../../../framework/database/models/courseModel";

const languageRepository = languageRepositoryEmpl(LanguageModel);
const courseRepository = courseRepositoryEmpl(courseModel);

const editLanguageController = async (req: Request, res: Response) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { languagename, description }: Language = req.body;
  const exist = await getLanguageByName(languageRepository)(languagename as string);
  if (exist) {
   const language = await postLanguage(languageRepository)(languagename as string, description as string);
    if (language) {
      const isUpdated = await updateCoursesCourseName(courseRepository)(exist?.languagename as string, language?.languagename as string);
      if (isUpdated) {
            return res.status(201).json({ message: "Language edited succesfully", language });
      } else {
        return res.status(400).json({ message: "Courses language edit failed" });
      }
   } else {
    return res.status(400).json({ message: "Language edit failed" });
   }
  } else {
   return res.status(409).json({ message: "Language not existed" });
  }
 } catch (error) {
  return res.status(500).json({ message: "Internal server error" });
 }
}

export default editLanguageController;