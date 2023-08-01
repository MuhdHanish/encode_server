import { Request, Response } from "express";
import { postLanguage } from "../../../app/usecases/language/postLanguage";
import { LanguageModel } from "../../../framework/database/models/LanguageModel";
import { languageRepositoryEmpl } from "../../../framework/repository/LanguageRepository";
import { Language } from "../../../domain/models/Language";
import { validationResult } from "express-validator";
import { getLanguageByName } from "../../../app/usecases/language/getLanguageByCredentail";

const languageRepository = languageRepositoryEmpl(LanguageModel);

const postLanguageController = async (req: Request, res: Response) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { languagename, description }: Language = req.body;
  const exist = await getLanguageByName(languageRepository)(languagename as string);
  if (!exist) {
   const category = await postLanguage(languageRepository)(languagename as string, description as string);
   if (category) {
    return res.status(201).json({ message: "New language created", category });
   } else {
    return res.status(400).json({ message: "Language creation failed" });
   }
  } else {
   return res.status(409).json({ message: "Language already existed" });
  }
 } catch (error) {
  console.log(error);
  return res.status(500).json({ message: "Internal server error" });
 }
}

export default postLanguageController;