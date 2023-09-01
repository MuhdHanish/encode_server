import { Language } from "../../../domain/models/Language";
import { languageRepository } from "../../../framework/repository/LanguageRepository";

export const getLanguageByName = (languageRepository: languageRepository) => async (languagename: string):Promise<Language|null> => {
  const language = await languageRepository.getLanguageByName(languagename);
  return language ? language : null;
}