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
const setCourses_1 = require("../../../app/usecases/course/setCourses");
const express_validator_1 = require("express-validator");
const courseRepository = (0, courseRepository_1.courseRepositoryEmpl)(courseModel_1.courseModel);
const setSelectedCourseController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(400).json({ errors: errors.array() });
        const studentId = (_a = req.userInfo) === null || _a === void 0 ? void 0 : _a.id;
        const course = yield (0, setCourses_1.setSelectedCourse)(courseRepository)(id, studentId);
        if (course) {
            return res.status(200).json({ message: "Student added to Course", course });
        }
        else {
            return res.status(400).json({ message: "No course found" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = setSelectedCourseController;
