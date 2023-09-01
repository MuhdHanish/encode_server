import { Language } from "../../../domain/models/Language";
import { languageRepository } from "../../../framework/repository/LanguageRepository";

export const getLanguagesCount = (languageRepository: languageRepository) => async ():Promise<number|null> => {
  const count = await languageRepository.getLanguagesCount();
  return count ? count : null;
}

export const listLanguage = (languageRepository: languageRepository) => async(languageId:string):Promise<Language|null> => {
  const language = await languageRepository.listLanguage(languageId);
  return language ? language : null;
}

export const unListLanguage = (languageRepository: languageRepository) => async(languageId:string):Promise<Language|null> => {
  const language = await languageRepository.unListLanguage(languageId);
  return language ? language : null;
}

