import { Request, Response } from "express";
import { LanguageModel } from "../../../framework/database/models/LanguageModel";
import { languageRepositoryEmpl } from "../../../framework/repository/LanguageRepository";
import { getLanguages } from "../../../app/usecases/language/getLanguages";

const languageRepository = languageRepositoryEmpl(LanguageModel);

const getLanguagesController = async(req:Request, res:Response) => {
 try {
  const languages = await getLanguages(languageRepository)();
  if (languages) {
   return res.status(200).json({ message: "Languages fetched successfully", languages });
  } else {
   return res.status(400).json({ message: "No languages found" });
  }
 } catch (error) {
  console.log(error);
  return res.status(500).json({ message: "Internal server error" });
 }
}

export default getLanguagesController;