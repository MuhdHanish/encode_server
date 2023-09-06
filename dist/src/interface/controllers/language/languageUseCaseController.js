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
exports.unListLanguageController = exports.getLanguagesCountController = exports.listLanguageController = void 0;
const LanguageModel_1 = require("../../../framework/database/models/LanguageModel");
const LanguageRepository_1 = require("../../../framework/repository/LanguageRepository");
const express_validator_1 = require("express-validator");
const languageCases_1 = require("../../../app/usecases/language/languageCases");
const getLanguageById_1 = require("../../../app/usecases/language/getLanguageById");
const courseCases_1 = require("../../../app/usecases/course/courseCases");
const courseRepository_1 = require("../../../framework/repository/courseRepository");
const courseModel_1 = require("../../../framework/database/models/courseModel");
const languageRepository = (0, LanguageRepository_1.languageRepositoryEmpl)(LanguageModel_1.LanguageModel);
const courseRepository = (0, courseRepository_1.courseRepositoryEmpl)(courseModel_1.courseModel);
const listLanguageController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const { id } = req.params;
        const language = yield (0, languageCases_1.listLanguage)(languageRepository)(id);
        return res.status(200).json({ message: "Listed language", language });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.listLanguageController = listLanguageController;
const getLanguagesCountController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield (0, languageCases_1.getLanguagesCount)(languageRepository)();
        return res.status(200).json({ message: "Count of languages fetched", count });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getLanguagesCountController = getLanguagesCountController;
const unListLanguageController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const { id } = req.params;
        const languageData = yield (0, getLanguageById_1.getLanguageById)(languageRepository)(id);
        const courses = yield (0, courseCases_1.getCoursesByLanguageName)(courseRepository)(languageData === null || languageData === void 0 ? void 0 : languageData.languagename);
        if (courses === null || courses === void 0 ? void 0 : courses.length) {
            return res.status(400).json({ message: "Cannot unlist this langauge" });
        }
        const language = yield (0, languageCases_1.unListLanguage)(languageRepository)(id);
        return res.status(200).json({ message: "Un listed language", language });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.unListLanguageController = unListLanguageController;
