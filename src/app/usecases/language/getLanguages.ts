import { Language } from "../../../domain/models/Language";
import { languageRepository } from "../../../framework/repository/LanguageRepository";

export const getLanguages = (languageRepository: languageRepository) => async ():Promise<Language[]|null> => {
  const languages = await languageRepository.getLanguages();
  if (languages) {
    return languages;
  } else {
    return null;
  }
}