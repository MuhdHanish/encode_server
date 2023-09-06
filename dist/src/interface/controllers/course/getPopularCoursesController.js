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
const courseModel_1 = require("../../../framework/database/models/courseModel");
const courseRepository_1 = require("../../../framework/repository/courseRepository");
const getPopularCourses_1 = require("../../../app/usecases/course/getPopularCourses");
const courseRepository = (0, courseRepository_1.courseRepositoryEmpl)(courseModel_1.courseModel);
const getPopularCoursesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield (0, getPopularCourses_1.getPopularCourses)(courseRepository)();
        if (courses) {
            return res.status(200).json({ message: "Courses fetched sucessfully", courses });
        }
        else {
            return res.status(400).json({ message: "No courses found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = getPopularCoursesController;
