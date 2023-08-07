import { Response, Request } from "express";
import { LanguageModel } from "../../../framework/database/models/LanguageModel";
import { languageRepositoryEmpl } from "../../../framework/repository/LanguageRepository";
import { validationResult } from "express-validator";
import { unListLanguage,getLanguagesCount,listLanguage } from "../../../app/usecases/language/languageCases";

const languageRepository = languageRepositoryEmpl(LanguageModel);

export const listLanguageController = async(req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { id } = req.params;
    const language = await listLanguage(languageRepository)(id);
    return res.status(200).json({ message: "Listed language", language });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}


export const getLanguagesCountController = async(req: Request, res: Response) => {
  try {
    const count = await getLanguagesCount(languageRepository)();
    return res.status(200).json({ message: "Count of languages fetched", count });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export const unListLanguageController = async(req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { id } = req.params;
    const language = await unListLanguage(languageRepository)(id);
    return res.status(200).json({ message: "Un listed language", language });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}