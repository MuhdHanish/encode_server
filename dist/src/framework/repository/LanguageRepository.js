"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.languageRepositoryEmpl = void 0;
const languageRepositoryEmpl = (languageModel) => {
    const getLanguages = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const languages = yield languageModel.find().exec();
            return languages.length > 0 ? languages : null;
        }
        catch (error) {
            console.error("Error getting languages:", error);
            return null;
        }
    });
    const getLanguagesCount = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const count = yield languageModel.find().countDocuments();
            if (count) {
                return count;
            }
            return null;
        }
        catch (error) {
            console.error("Error getting languages count:", error);
            return null;
        }
    });
    const listLanguage = (languageId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const language = yield languageModel.findByIdAndUpdate(languageId, { $set: { status: true } }, { new: true });
            if (language) {
                return language;
            }
            return null;
        }
        catch (error) {
            console.error("Error on listing langugae:", error);
            return null;
        }
    });
    const unListLanguage = (languageId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const language = yield languageModel.findByIdAndUpdate(languageId, { $set: { status: false } }, { new: true });
            if (language) {
                return language;
            }
            return null;
        }
        catch (error) {
            console.error("Error on ulisting langugae:", error);
            return null;
        }
    });
    const getLanguageById = (languageId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const language = yield languageModel.findOne({ _id: languageId, status: true }).exec();
            return language !== null ? language.toObject() : null;
        }
        catch (error) {
            console.error("Error getting language by ID:", error);
            return null;
        }
    });
    const getLanguageByName = (languagename) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const category = yield languageModel
                .findOne({ languagename: { $regex: new RegExp(`^${languagename}$`, "i") }, status: true })
                .exec();
            return category !== null ? category.toObject() : null;
        }
        catch (error) {
            console.error("Error getting language by name:", error);
            return null;
        }
    });
    const postLanguage = (languageDetails) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const createdLanguage = yield languageModel.create(languageDetails);
            return createdLanguage !== null ? createdLanguage.toObject() : null;
        }
        catch (error) {
            console.error("Error creating language:", error);
            return null;
        }
    });
    const editLanguage = (languageDetails) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { _id, languagename, description } = languageDetails;
            const updatedLanguage = yield languageModel
                .findByIdAndUpdate(_id, { languagename, description }, { new: true })
                .exec();
            return updatedLanguage !== null ? updatedLanguage.toObject() : null;
        }
        catch (error) {
            console.error("Error editing language:", error);
            return null;
        }
    });
    return {
        getLanguages,
        getLanguageByName,
        getLanguagesCount,
        listLanguage,
        unListLanguage,
        getLanguageById,
        postLanguage,
        editLanguage,
    };
};
exports.languageRepositoryEmpl = languageRepositoryEmpl;
