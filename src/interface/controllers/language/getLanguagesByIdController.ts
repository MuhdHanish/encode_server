import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { LanguageModel } from "../../../framework/database/models/LanguageModel";
import { getLanguageById } from "../../../app/usecases/language/getLanguageById";
import { languageRepositoryEmpl } from "../../../framework/repository/LanguageRepository";

const languageRepository = languageRepositoryEmpl(LanguageModel);

const getLanguageByIdController = async (req: Request, res: Response) => {
 try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { id } = req.params;
  const language = await getLanguageById(languageRepository)(id);
  if (language) {
   return res.status(200).json({ message: "Language fetched successfully", language });
  } else {
   return res.status(400).json({ message: "No language found" });
  }
 } catch (error) {
  console.log(error);
  return res.status(500).json({ message: "Internal server error" });
 }
}

export default getLanguageByIdController;