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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseRepositoryEmpl = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const courseRepositoryEmpl = (courseModel) => {
    const getPopularCourses = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const courses = yield courseModel
                .aggregate([
                {
                    $lookup: {
                        from: "users",
                        localField: "tutor",
                        foreignField: "_id",
                        as: "tutorInfo",
                    },
                },
                {
                    $match: {
                        "tutorInfo.status": { $ne: false },
                    },
                },
                { $sort: { rating: -1 } },
            ])
                .exec();
            return courses.length > 0 ? courses : null;
        }
        catch (error) {
            console.error("Error popular getting courses:", error);
            return null;
        }
    });
    const changeReview = (course, rating, count) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(rating, count);
        const changeCourse = yield courseModel.findById(course);
        if (changeCourse) {
            const oldRating = changeCourse === null || changeCourse === void 0 ? void 0 : changeCourse.rating;
            const newRating = (oldRating + rating) / count;
            const updatedCourse = yield courseModel.findByIdAndUpdate(course, { $set: { rating: newRating } });
            return updatedCourse;
        }
        else {
            return null;
        }
    });
    const getTutorCourses = (tutorId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const courses = yield courseModel.find({ tutor: tutorId }).sort({ _id: -1 }).exec();
            return courses.length > 0 ? courses : null;
        }
        catch (error) {
            console.error("Error getting courses:", error);
            return null;
        }
    });
    const getTutorPopularCourses = (tutorId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const courses = yield courseModel.find({ tutor: tutorId }).sort({ rating: -1 }).limit(4).exec();
            return courses.length > 0 ? courses : null;
        }
        catch (error) {
            console.error("Error getting courses:", error);
            return null;
        }
    });
    const getStudentCourses = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const courses = yield courseModel.aggregate([
                {
                    $match: {
                        students: {
                            $elemMatch: {
                                $eq: studentId,
                            },
                        },
                    },
                },
                {
                    $project: {
                        purchaseHistory: 0
                    },
                },
            ]);
            return courses.length > 0 ? courses : null;
        }
        catch (error) {
            console.error("Error getting by student id courses:", error);
            return null;
        }
    });
    const removeStudentCourse = (courseId, studentId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const course = yield courseModel.findByIdAndUpdate(courseId, { $pull: { students: studentId } }, { new: true });
            if (!course) {
                console.error("Course not found");
                return null;
            }
            return course;
        }
        catch (error) {
            console.error("Error removing the student in course:", error);
            return null;
        }
    });
    const getCourseStudents = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const enrolledStudents = yield courseModel
                .aggregate([
                { $match: { _id: new mongoose_1.default.Types.ObjectId(courseId) } },
                {
                    $lookup: {
                        from: "users",
                        let: {
                            studentIds: {
                                $map: {
                                    input: "$students",
                                    as: "id",
                                    in: { $toObjectId: "$$id" },
                                },
                            },
                        },
                        pipeline: [
                            { $match: { $expr: { $in: ["$_id", "$$studentIds"] } } },
                            { $project: { password: 0 } },
                        ],
                        as: "enrolledStudents",
                    },
                },
                {
                    $unwind: "$enrolledStudents",
                },
                {
                    $project: {
                        _id: 0,
                        enrolledStudents: 1,
                    },
                },
            ])
                .exec();
            return enrolledStudents.length > 0
                ? enrolledStudents.map((course) => course.enrolledStudents)
                : null;
        }
        catch (error) {
            console.error("Error getting students from course:", error);
            return null;
        }
    });
    const getCoursesCount = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const courses = yield courseModel
                .aggregate([
                {
                    $lookup: {
                        from: "users",
                        localField: "tutor",
                        foreignField: "_id",
                        as: "tutorInfo",
                    },
                },
                {
                    $match: {
                        "tutorInfo.status": { $ne: false },
                    },
                },
            ])
                .exec();
            return courses.length > 0 ? courses.length : null;
        }
        catch (error) {
            console.error("Error getting courses:", error);
            return null;
        }
    });
    const getCourses = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const courses = yield courseModel
                .aggregate([
                {
                    $lookup: {
                        from: "users",
                        localField: "tutor",
                        foreignField: "_id",
                        as: "tutorInfo",
                    },
                },
                {
                    $match: {
                        "tutorInfo.status": { $ne: false },
                    },
                }
            ])
                .exec();
            return courses.length > 0 ? courses : null;
        }
        catch (error) {
            console.error("Error getting courses:", error);
            return null;
        }
    });
    const getCourseById = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const course = yield courseModel
                .findById(courseId)
                .populate({
                path: "tutor",
                select: "-password -isGoogle -followers -following -__v -status -role"
            })
                .exec();
            return course !== null ? course.toObject() : null;
        }
        catch (error) {
            console.error("Error getting course by ID:", error);
            return null;
        }
    });
    const updateCoursesLanguageName = (oldName, newName) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const courses = yield courseModel.updateMany({ language: oldName }, { $set: { language: newName } });
            if (courses) {
                return true;
            }
            return false;
        }
        catch (error) {
            console.error("Error updating courses by langugage:", error);
            return null;
        }
    });
    const getCoursesByLanguageName = (languageName) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const courses = yield courseModel.aggregate([
                {
                    $lookup: {
                        from: "users",
                        localField: "tutor",
                        foreignField: "_id",
                        as: "tutorInfo",
                    },
                },
                {
                    $match: {
                        "tutorInfo.status": { $ne: false },
                        language: languageName,
                    },
                },
            ]).exec();
            return courses.length > 0 ? courses : null;
        }
        catch (error) {
            console.error("Error on fetching course by language name:", error);
            return null;
        }
    });
    const getCoursesCountByLanguageName = (languageName) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const courses = yield courseModel
                .aggregate([
                {
                    $lookup: {
                        from: "users",
                        localField: "tutor",
                        foreignField: "_id",
                        as: "tutorInfo",
                    },
                },
                {
                    $match: {
                        "tutorInfo.status": { $ne: false },
                        language: languageName,
                    },
                },
            ])
                .exec();
            return courses.length > 0 ? courses.length : null;
        }
        catch (error) {
            console.error("Error on fetching course by language name:", error);
            return null;
        }
    });
    const listCourse = (courseId, tutorId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const course = yield courseModel.findOneAndUpdate({ _id: courseId, tutor: tutorId }, { $set: { status: true } }, { new: true });
            if (course) {
                return course;
            }
            return null;
        }
        catch (error) {
            console.error("Error on listing course:", error);
            return null;
        }
    });
    const setSelectedCourse = (courseId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const prev = yield courseModel.findById(courseId);
            const course = yield courseModel.findByIdAndUpdate(courseId, {
                $push: {
                    students: userId,
                    purchaseHistory: {
                        studentId: userId,
                        date: new Date(),
                        price: prev === null || prev === void 0 ? void 0 : prev.price,
                        month: new Date().toLocaleString('default', { month: 'long' }),
                    },
                },
            }, { new: true });
            if (course) {
                return course;
            }
            return null;
        }
        catch (error) {
            console.error("Error adding course user:", error);
            return null;
        }
    });
    const getCourseDetailsDashborad = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const details = yield courseModel.aggregate([
                {
                    $unwind: "$purchaseHistory",
                },
                {
                    $group: {
                        _id: "$purchaseHistory.month",
                        total: { $sum: { $multiply: ["$purchaseHistory.price", 0.05] } },
                    },
                },
                {
                    $sort: { _id: -1 }
                }
            ]);
            return details;
        }
        catch (error) {
            console.log("error on getting data to dashboard", error);
            return null;
        }
    });
    const getCourseDetailsTutorDashborad = (tutorId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const details = yield courseModel.aggregate([
                {
                    $match: {
                        tutor: new mongoose_1.default.Types.ObjectId(tutorId),
                    },
                },
                {
                    $unwind: "$purchaseHistory",
                },
                {
                    $group: {
                        _id: "$purchaseHistory.month",
                        total: { $sum: { $multiply: ["$purchaseHistory.price", 0.95] } },
                    },
                },
                {
                    $sort: { _id: -1 },
                },
            ]);
            return details;
        }
        catch (error) {
            console.log("error on getting data to dashboard", error);
            return null;
        }
    });
    const unListCourse = (courseId, tutorId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const course = yield courseModel.findOneAndUpdate({ _id: courseId, tutor: tutorId }, { $set: { status: false } }, { new: true });
            if (course) {
                return course;
            }
            return null;
        }
        catch (error) {
            console.error("Error on un lsit course:", error);
            return null;
        }
    });
    const postCourse = (courseData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const createdCourse = yield courseModel.create(courseData);
            return createdCourse !== null ? createdCourse.toObject() : null;
        }
        catch (error) {
            console.error("Error creating course:", error);
            return null;
        }
    });
    const updateCourse = (CourseDetails, _id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const updatedCourse = yield courseModel
                .findByIdAndUpdate(_id, CourseDetails, { new: true })
                .exec();
            return updatedCourse !== null ? updatedCourse.toObject() : null;
        }
        catch (error) {
            console.error("Error editing course:", error);
            return null;
        }
    });
    return {
        getPopularCourses,
        getCourses,
        listCourse,
        getCoursesCount,
        getCourseStudents,
        unListCourse,
        changeReview,
        updateCoursesLanguageName,
        getTutorCourses,
        getCoursesByLanguageName,
        getCoursesCountByLanguageName,
        getCourseById,
        getCourseDetailsDashborad,
        getCourseDetailsTutorDashborad,
        getTutorPopularCourses,
        postCourse,
        updateCourse,
        getStudentCourses,
        setSelectedCourse,
        removeStudentCourse
    };
};
exports.courseRepositoryEmpl = courseRepositoryEmpl;
