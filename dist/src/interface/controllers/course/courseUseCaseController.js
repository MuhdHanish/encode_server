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
exports.removeStudentCourseController = exports.unListCourseController = exports.listCourseController = exports.getCoursesCountByLanguageNameController = exports.getCoursesByLanguageNameController = exports.getCoursesCountController = void 0;
const courseModel_1 = require("../../../framework/database/models/courseModel");
const courseRepository_1 = require("../../../framework/repository/courseRepository");
const courseCases_1 = require("../../../app/usecases/course/courseCases");
const express_validator_1 = require("express-validator");
const courseRepository = (0, courseRepository_1.courseRepositoryEmpl)(courseModel_1.courseModel);
const getCoursesCountController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const count = yield (0, courseCases_1.getCoursesCount)(courseRepository)();
        return res.status(200).json({ message: "Fetched the course count", count });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getCoursesCountController = getCoursesCountController;
const getCoursesByLanguageNameController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const { id } = req.params;
        const courses = yield (0, courseCases_1.getCoursesByLanguageName)(courseRepository)(id);
        return res.status(200).json({ message: "Fetched the courses by language name", courses });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getCoursesByLanguageNameController = getCoursesByLanguageNameController;
const getCoursesCountByLanguageNameController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const { id } = req.params;
        const count = yield (0, courseCases_1.getCoursesCountByLanguageName)(courseRepository)(id);
        return res.status(200).json({ message: "Fetched the course count", count });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getCoursesCountByLanguageNameController = getCoursesCountByLanguageNameController;
const listCourseController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const { id } = req.params;
        const tutorId = (_a = req.userInfo) === null || _a === void 0 ? void 0 : _a.id;
        const course = yield (0, courseCases_1.listCourse)(courseRepository)(id, tutorId);
        return res.status(200).json({ message: "Listed the course ", course });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.listCourseController = listCourseController;
const unListCourseController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const { id } = req.params;
        const tutorId = (_b = req.userInfo) === null || _b === void 0 ? void 0 : _b.id;
        const course = yield (0, courseCases_1.unListCourse)(courseRepository)(id, tutorId);
        return res.status(200).json({ message: "Un listed the course ", course });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.unListCourseController = unListCourseController;
const removeStudentCourseController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const { id } = req.params;
        const studentId = (_c = req.userInfo) === null || _c === void 0 ? void 0 : _c.id;
        const course = yield (0, courseCases_1.removeStudentCourse)(courseRepository)(id, studentId);
        if (course) {
            return res.status(200).json({ message: "Removed student", course });
        }
        ;
        return res.status(400).json({ message: "Not found the course, Un expected error occured" });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.removeStudentCourseController = removeStudentCourseController;
