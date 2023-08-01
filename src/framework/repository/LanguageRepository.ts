import { Language } from "../../domain/models/Language";
import { MongoDBLanguage } from "../database/models/LanguageModel";

export type languageRepository = {
  getLanguages: () => Promise<Language[] | null>;
  getLanguageByName: (languagename: string) => Promise<Language | null>;
  getLanguageById: (id: string) => Promise<Language | null>;
  postLanguage: (language: Language) => Promise<Language | null>;
  editLanguage: (language: Language) => Promise<Language | null>;
};

export const languageRepositoryEmpl = (languageModel: MongoDBLanguage): languageRepository => {
  const getLanguages = async (): Promise<Language[] | null> => {
    try {
      const languages = await languageModel.find().exec();
      return languages.length > 0 ? languages : null;
    } catch (error) {
      console.error("Error getting languages:", error);
      return null;
    }
  };

  const getLanguageById = async (languageId: string): Promise<Language | null> => {
    try {
      const language = await languageModel.findOne({ _id: languageId }).exec();
      return language !== null ? language.toObject() : null;
    } catch (error) {
      console.error("Error getting language by ID:", error);
      return null;
    }
  };

  const getLanguageByName = async (languagename: string): Promise<Language | null> => {
    try {
      const category = await languageModel
        .findOne({ languagename: { $regex: new RegExp(`^${languagename}$`, "i") } })
        .exec();
      return category !== null ? category.toObject() : null;
    } catch (error) {
      console.error("Error getting language by name:", error);
      return null;
    }
  };

  const postLanguage = async (languageDetails: Language): Promise<Language | null> => {
    try {
      const createdCategory = await languageModel.create(languageDetails);
      return createdCategory !== null ? createdCategory.toObject() : null;
    } catch (error) {
      console.error("Error creating language:", error);
      return null;
    }
  };

  const editLanguage = async (languageDetails: Language): Promise<Language | null> => {
    try {
      const { _id, languagename, description } = languageDetails;
      const updatedLanguage = await languageModel
        .findByIdAndUpdate(_id, { languagename, description }, { new: true })
        .exec();
      return updatedLanguage !== null ? updatedLanguage.toObject() : null;
    } catch (error) {
      console.error("Error editing language:", error);
      return null;
    }
  };

  return {
    getLanguages,
    getLanguageByName,
    getLanguageById,
    postLanguage,
    editLanguage,
  };
};