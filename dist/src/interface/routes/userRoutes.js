"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// controllers
const authentication_1 = require("../controllers/authentication");
const signupController_1 = require("../controllers/authentication/signupController");
const course_1 = require("../controllers/course");
const language_1 = require("../controllers/language");
const googleSignupController_1 = __importDefault(require("../controllers/authentication/signupController/googleSignupController"));
const userUseCaseController_1 = require("../controllers/user/userUseCaseController");
const languageUseCaseController_1 = require("../controllers/language/languageUseCaseController");
const courseUseCaseController_1 = require("../controllers/course/courseUseCaseController");
const getToDashController_1 = require("../controllers/course/getToDashController");
const review_1 = require("../controllers/review");
// middlewares
const middleware_1 = require("../../middleware");
// validator middlewares
const requestValidator_1 = require("../../middleware/requestValidator");
const chat_1 = require("../controllers/chat");
const fetchMessagesController_1 = __importDefault(require("../controllers/message/fetchMessagesController"));
const message_1 = require("../controllers/message");
const router = (0, express_1.Router)();
// POST  signup
router.post("/register/stepone", requestValidator_1.signupValidatorOne, signupController_1.stepOneController);
router.post("/register/steptwo/:id", requestValidator_1.signupValidatorTwo, middleware_1.otpAuthMiddleware, signupController_1.stepTwoController);
// POST login
router.post("/login", requestValidator_1.loginValidator, authentication_1.loginController);
// POST google login
router.post("/google/login", middleware_1.googleLoginMiddleware, authentication_1.googleLoginController);
// POST google signup
router.post("/google/register", middleware_1.googleSignupMiddelware, googleSignupController_1.default);
// GET language
router.get("/get/languages", middleware_1.userAuthorization, language_1.getLanguagesController);
router.get("/get/language/:id([0-9a-fA-F]{24})", middleware_1.userAuthorization, requestValidator_1.getLanguageByIdValidator, language_1.getLanguageByIdController);
// POST language
router.post("/admin/post/language", middleware_1.adminAuthorization, requestValidator_1.postLanguageValidator, language_1.postLanguageController);
router.put("/admin/edit/language/:id", middleware_1.adminAuthorization, requestValidator_1.postLanguageValidator, language_1.editLanguageController);
// POST Forgot password request
router.post("/forgot/password", requestValidator_1.forgotPasswordValidator, authentication_1.forgotPasswordController);
// POST Verify password request
router.post("/verify/password/request/:id", middleware_1.resetPasswordVerify);
// GET course
router.get("/get/courses", middleware_1.userAuthorization, course_1.getCoursesController);
router.get("/get/course/count", middleware_1.userAuthorization, courseUseCaseController_1.getCoursesCountController);
router.get("/get/popular/courses", middleware_1.userAuthorization, course_1.getPopularCoursesController);
router.get("/get/student/courses", middleware_1.userAuthorization, course_1.getStudentCoursesController);
router.get("/get/course/:id([0-9a-fA-F]{24})", middleware_1.userAuthorization, requestValidator_1.getCourseByIdValidator, course_1.getCourseByIdController);
router.get("/get/course/language/name/:id", middleware_1.userAuthorization, requestValidator_1.getCourseByIdValidator, courseUseCaseController_1.getCoursesByLanguageNameController);
router.get("/get/course/count/language/name/:id", middleware_1.userAuthorization, requestValidator_1.getCourseByIdValidator, courseUseCaseController_1.getCoursesCountByLanguageNameController);
router.get("/get/tutor/courses/:id([0-9a-fA-F]{24})", middleware_1.tutorAuthorization, requestValidator_1.getCourseByIdValidator, course_1.getTutorCoursesController);
router.get("/get/tutor/popular/courses/:id([0-9a-fA-F]{24})", middleware_1.tutorAuthorization, requestValidator_1.getCourseByIdValidator, course_1.getTutorPopularCoursesController);
router.get("/get/tutor/course/data/dashboard/:id([0-9a-fA-F]{24})", middleware_1.tutorAuthorization, requestValidator_1.getCourseByIdValidator, getToDashController_1.getDataToTutorDashboardController);
// GET review
router.get("/get/all/reviews/:id([0-9a-fA-F]{24})", middleware_1.userAuthorization, requestValidator_1.getCourseByIdValidator, review_1.getAllReviewsController);
// POST review
router.post("/post/review/:id([0-9a-fA-F]{24})", middleware_1.userAuthorization, requestValidator_1.postReviewValidator, review_1.postReviewController);
// PUT review
router.put("/update/review/:id([0-9a-fA-F]{24})", middleware_1.userAuthorization, requestValidator_1.reviewValidator, review_1.updateReviewController);
// DELETE  review
router.patch("/delete/review/:id([0-9a-fA-F]{24})", middleware_1.userAuthorization, requestValidator_1.deleteReviewValidator, review_1.deleteReviewController);
// PATCH remvove student from course
router.patch("/remove/student/course/:id([0-9a-fA-F]{24})", middleware_1.userAuthorization, requestValidator_1.getCourseByIdValidator, courseUseCaseController_1.removeStudentCourseController);
// POST course
router.post("/tutor/post/course", middleware_1.tutorAuthorization, requestValidator_1.postCourseValidator, course_1.postCourseController);
// PATCH course
router.patch("/set/selected/course/:id([0-9a-fA-F]{24})", middleware_1.userAuthorization, requestValidator_1.getCourseByIdValidator, course_1.setSelectedCourseController);
// PUT course
router.put("/tutor/update/course/:id", middleware_1.tutorAuthorization, requestValidator_1.postCourseValidator, course_1.updateCourseController);
// User usecase
// Common
router.patch("/edit/profile/image", middleware_1.userAuthorization, requestValidator_1.editImageValidator, userUseCaseController_1.editUserProfileImageController);
router.patch("/edit/profile/credentials", middleware_1.userAuthorization, requestValidator_1.editCredentialsValidator, userUseCaseController_1.editUserCredentialController);
router.patch("/follow/user/:id([0-9a-fA-F]{24})", middleware_1.userAuthorization, requestValidator_1.followUnfollowValidator, userUseCaseController_1.followMethodsController);
router.patch("/unfollow/user/:id([0-9a-fA-F]{24})", middleware_1.userAuthorization, requestValidator_1.followUnfollowValidator, userUseCaseController_1.unfollowMethodsController);
router.patch("/remove/user/:id([0-9a-fA-F]{24})", middleware_1.userAuthorization, requestValidator_1.followUnfollowValidator, userUseCaseController_1.removeMethodsController);
// PATCH Reset Password
router.patch("/reset/password", requestValidator_1.loginValidator, authentication_1.resetUserPasswordController);
// Tutor
router.get("/tutor/get/course/students/:id", middleware_1.tutorAuthorization, requestValidator_1.getCourseByIdValidator, userUseCaseController_1.getCourseStudentsController);
// Admin
// GET
router.get("/admin/get/users", middleware_1.adminAuthorization, userUseCaseController_1.getUsersController);
router.get("/admin/get/users/count", middleware_1.adminAuthorization, userUseCaseController_1.getUsersCountController);
router.get("/admin/get/users/:role", middleware_1.adminAuthorization, requestValidator_1.getByRoleValidator, userUseCaseController_1.getUsersByRoleController);
router.get("/admin/get/users/count/:role", middleware_1.adminAuthorization, requestValidator_1.getByRoleValidator, userUseCaseController_1.getUsersCountByRoleController);
router.get("/admin/get/course/students/:id([0-9a-fA-F]{24})", middleware_1.adminAuthorization, requestValidator_1.getCourseByIdValidator, userUseCaseController_1.getCourseStudentsController);
router.get("/admin/get/course/data/dashboard", middleware_1.adminAuthorization, getToDashController_1.getDataToAdminDashboardController);
// PATCH
router.patch("/admin/block/user/:id", middleware_1.adminAuthorization, requestValidator_1.muteDataValidator, userUseCaseController_1.blockUserContorller);
router.patch("/admin/unblock/user/:id", middleware_1.adminAuthorization, requestValidator_1.muteDataValidator, userUseCaseController_1.unBlockUserContorller);
// Language usecase
// Admin
// GET
router.get("/amdin/get/languages/count", middleware_1.adminAuthorization, languageUseCaseController_1.getLanguagesCountController);
// PATCH
router.patch("/admin/unlist/language/:id([0-9a-fA-F]{24})", middleware_1.adminAuthorization, requestValidator_1.muteDataValidator, languageUseCaseController_1.unListLanguageController);
router.patch("/admin/list/language/:id([0-9a-fA-F]{24})", middleware_1.adminAuthorization, requestValidator_1.muteDataValidator, languageUseCaseController_1.listLanguageController);
// Course usecase
//Tutor
// PATCH
router.patch("/tutor/unlist/course/:id([0-9a-fA-F]{24})", middleware_1.tutorAuthorization, requestValidator_1.muteDataValidator, courseUseCaseController_1.unListCourseController);
router.patch("/tutor/list/course/:id([0-9a-fA-F]{24})", middleware_1.tutorAuthorization, requestValidator_1.muteDataValidator, courseUseCaseController_1.listCourseController);
// Chat
// GET
router.get("/get/chats", middleware_1.userAuthorization, chat_1.fetchChatsController);
// POST
router.post("/access/chat/:id([0-9a-fA-F]{24})", middleware_1.userAuthorization, requestValidator_1.accessChatValidator, chat_1.accessChatController);
// Message
// GET
router.get("/get/messages/:id([0-9a-fA-F]{24})", middleware_1.userAuthorization, requestValidator_1.fethcMessagesValidator, fetchMessagesController_1.default);
// POST
router.post("/send/message/:id([0-9a-fA-F]{24})", middleware_1.userAuthorization, requestValidator_1.sendMessageValidator, message_1.sendMessageController);
exports.default = router;
