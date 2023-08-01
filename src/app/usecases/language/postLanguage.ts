import { Language } from "../../../domain/models/Language";
import { languageRepository } from "../../../framework/repository/LanguageRepository";

export const postLanguage = (languageRepository: languageRepository) => async(languagename: string, description: string):Promise<Language|null> => {
  const language = await languageRepository.postLanguage({ languagename, description });
  if (language) {
    return language;
  } else {
    return null;
  }
}