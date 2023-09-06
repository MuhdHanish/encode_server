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
const postLanguage_1 = require("../../../app/usecases/language/postLanguage");
const LanguageModel_1 = require("../../../framework/database/models/LanguageModel");
const LanguageRepository_1 = require("../../../framework/repository/LanguageRepository");
const express_validator_1 = require("express-validator");
const getLanguageByCredentail_1 = require("../../../app/usecases/language/getLanguageByCredentail");
const courseCases_1 = require("../../../app/usecases/course/courseCases");
const courseRepository_1 = require("../../../framework/repository/courseRepository");
const courseModel_1 = require("../../../framework/database/models/courseModel");
const languageRepository = (0, LanguageRepository_1.languageRepositoryEmpl)(LanguageModel_1.LanguageModel);
const courseRepository = (0, courseRepository_1.courseRepositoryEmpl)(courseModel_1.courseModel);
const editLanguageController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const { id } = req.params;
        const { languagename, description } = req.body;
        const exist = yield (0, getLanguageByCredentail_1.getLanguageByName)(languageRepository)(id);
        if (exist) {
            const language = yield (0, postLanguage_1.postLanguage)(languageRepository)(languagename, description);
            if (language) {
                const isUpdated = yield (0, courseCases_1.updateCoursesCourseName)(courseRepository)(exist === null || exist === void 0 ? void 0 : exist.languagename, language === null || language === void 0 ? void 0 : language.languagename);
                if (isUpdated) {
                    return res.status(201).json({ message: "Language edited succesfully", language });
                }
                else {
                    return res.status(400).json({ message: "Courses language edit failed" });
                }
            }
            else {
                return res.status(400).json({ message: "Language edit failed" });
            }
        }
        else {
            return res.status(409).json({ message: "Language not existed" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = editLanguageController;
