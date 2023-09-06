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
const express_validator_1 = require("express-validator");
const updateCourse_1 = require("../../../app/usecases/course/updateCourse");
const courseModel_1 = require("../../../framework/database/models/courseModel");
const LanguageModel_1 = require("../../../framework/database/models/LanguageModel");
const courseRepository_1 = require("../../../framework/repository/courseRepository");
const LanguageRepository_1 = require("../../../framework/repository/LanguageRepository");
const getLanguageByCredentail_1 = require("../../../app/usecases/language/getLanguageByCredentail");
const courseRepository = (0, courseRepository_1.courseRepositoryEmpl)(courseModel_1.courseModel);
const languageRepository = (0, LanguageRepository_1.languageRepositoryEmpl)(LanguageModel_1.LanguageModel);
const updateCourseController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const { language } = req.body;
        const { id } = req.params;
        const isExist = yield (0, getLanguageByCredentail_1.getLanguageByName)(languageRepository)(language);
        if (isExist) {
            const course = yield (0, updateCourse_1.updateCourse)(courseRepository)(req.body, id);
            if (course) {
                return res.status(201).json({ message: "Course posted sucessfully", course });
            }
            else {
                return res.status(400).json({ message: "Course update failed" });
            }
        }
        else {
            return res.status(400).json({ message: "Language is not valid" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = updateCourseController;
