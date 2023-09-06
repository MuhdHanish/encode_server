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
exports.removeStudentCourse = exports.getCourseStudents = exports.getCoursesCountByLanguageName = exports.getCoursesByLanguageName = exports.unListCourse = exports.listCourse = exports.getCoursesCount = exports.updateCoursesCourseName = void 0;
const updateCoursesCourseName = (courseRepository) => (oldName, newName) => __awaiter(void 0, void 0, void 0, function* () {
    const isUpdated = yield courseRepository.updateCoursesLanguageName(oldName, newName);
    return isUpdated ? isUpdated : null;
});
exports.updateCoursesCourseName = updateCoursesCourseName;
const getCoursesCount = (courseRepository) => () => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield courseRepository.getCoursesCount();
    return count ? count : null;
});
exports.getCoursesCount = getCoursesCount;
const listCourse = (courseRepository) => (courseId, tutorId) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield courseRepository.listCourse(courseId, tutorId);
    return course ? course : null;
});
exports.listCourse = listCourse;
const unListCourse = (courseRepository) => (courseId, tutorId) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield courseRepository.unListCourse(courseId, tutorId);
    return course ? course : null;
});
exports.unListCourse = unListCourse;
const getCoursesByLanguageName = (courseRepository) => (languageName) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield courseRepository.getCoursesByLanguageName(languageName);
    return courses ? courses : null;
});
exports.getCoursesByLanguageName = getCoursesByLanguageName;
const getCoursesCountByLanguageName = (courseRepository) => (languageName) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield courseRepository.getCoursesCountByLanguageName(languageName);
    return count ? count : null;
});
exports.getCoursesCountByLanguageName = getCoursesCountByLanguageName;
const getCourseStudents = (courseRepository) => (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const students = yield courseRepository.getCourseStudents(courseId);
    return students ? students : null;
});
exports.getCourseStudents = getCourseStudents;
const removeStudentCourse = (courseRepository) => (courseId, studentId) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield courseRepository.removeStudentCourse(courseId, studentId);
    return course ? course : null;
});
exports.removeStudentCourse = removeStudentCourse;
