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
exports.getTutorPopularCoursesController = exports.getTutorCoursesController = void 0;
const courseModel_1 = require("../../../framework/database/models/courseModel");
const courseRepository_1 = require("../../../framework/repository/courseRepository");
const getTutorCourses_1 = require("../../../app/usecases/course/getTutorCourses");
const express_validator_1 = require("express-validator");
const courseRepository = (0, courseRepository_1.courseRepositoryEmpl)(courseModel_1.courseModel);
const getTutorCoursesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const { id } = req.params;
        const courses = yield (0, getTutorCourses_1.getTutorCourses)(courseRepository)(id);
        return res.status(200).json({ message: "Courses fetched sucessfully", courses });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getTutorCoursesController = getTutorCoursesController;
const getTutorPopularCoursesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const { id } = req.params;
        const courses = yield (0, getTutorCourses_1.getTutorPopularCourses)(courseRepository)(id);
        return res.status(200).json({ message: "Courses fetched sucessfully", courses });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getTutorPopularCoursesController = getTutorPopularCoursesController;
