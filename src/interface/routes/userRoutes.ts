import { Router } from "express";

// controllers
import { loginController, googleLoginController } from "../controllers/authentication";
import { stepOneController, stepTwoController } from "../controllers/authentication/signupController";
import {
  getCourseByIdController,
  getPopularCoursesController,
  postCourseController,
  getTutorCoursesController,
  updateCourseController,
  setSelectedCourseController,
  getCoursesController,
  getTutorPopularCoursesController,
  getStudentCoursesController,
} from "../controllers/course";
import { getLanguagesController, getLanguageByIdController, postLanguageController, editLanguageController } from "../controllers/language";
import googleSignupController from "../controllers/authentication/signupController/googleSignupController";
import {
  blockUserContorller, getCourseStudentsController, getUsersByRoleController, getUsersController,
  getUsersCountByRoleController, getUsersCountController, unBlockUserContorller
} from "../controllers/user/userUseCaseController";
import {
  getLanguagesCountController, listLanguageController, unListLanguageController
} from "../controllers/language/languageUseCaseController";
import {
  getCoursesByLanguageNameController, getCoursesCountByLanguageNameController,
  getCoursesCountController, listCourseController, removeStudentCourseController, unListCourseController
} from "../controllers/course/courseUseCaseController";
import { getDataToAdminDashboardController, getDataToTutorDashboardController } from "../controllers/course/getToDashController";
import forgotPasswordController from "../controllers/authentication/forgotPasswordController";
import resetUserPasswordController from "../controllers/authentication/resetPasswordController";

// middlewares
import {
  adminAuthorization, googleLoginMiddleware,
  googleSignupMiddelware, otpAuthMiddleware, resetPasswordVerify, tutorAuthorization, userAuthorization
} from "../../middleware";


// validator middlewares
import {
  signupValidatorOne, signupValidatorTwo, 
  getLanguageByIdValidator,getCourseByIdValidator,
  loginValidator, postLanguageValidator, postCourseValidator, getByRoleValidator, muteDataValidator, forgotPasswordValidator
} from "../../middleware/requestValidator";


const router = Router();


// POST  signup
router.post("/register/stepone",signupValidatorOne, stepOneController);
router.post("/register/steptwo/:id", signupValidatorTwo, otpAuthMiddleware, stepTwoController);

// POST login
router.post("/login", loginValidator, loginController);

// POST google login
router.post("/google/login", googleLoginMiddleware, googleLoginController);

// POST google signup
router.post("/google/register", googleSignupMiddelware, googleSignupController);

// GET language
router.get("/get/languages",userAuthorization, getLanguagesController);
router.get("/get/language/:id([0-9a-fA-F]{24})",userAuthorization, getLanguageByIdValidator, getLanguageByIdController);

// POST language
router.post("/admin/post/language", adminAuthorization, postLanguageValidator, postLanguageController);
router.put("/admin/edit/language/:id", adminAuthorization, postLanguageValidator, editLanguageController);

// POST Forgot password request
router.post("/forgot/password", forgotPasswordValidator, forgotPasswordController);

// POST Verify password request
router.post("/verify/password/request/:id", resetPasswordVerify);

// PATCH Reset Password
router.patch("/reset/password", loginValidator, resetUserPasswordController);

// GET course
router.get("/get/popular/courses",userAuthorization, getPopularCoursesController);
router.get("/get/courses",userAuthorization, getCoursesController);
router.get("/get/course/:id([0-9a-fA-F]{24})", userAuthorization, getCourseByIdValidator, getCourseByIdController);
router.get("/get/course/count", userAuthorization, getCoursesCountController);
router.get("/get/course/language/name/:id", userAuthorization, getCourseByIdValidator, getCoursesByLanguageNameController);
router.get("/get/course/count/language/name/:id", userAuthorization, getCourseByIdValidator, getCoursesCountByLanguageNameController);
router.get("/get/student/courses", userAuthorization,getStudentCoursesController);
router.get("/get/tutor/courses/:id([0-9a-fA-F]{24})", tutorAuthorization,getCourseByIdValidator, getTutorCoursesController);
router.get("/get/tutor/popular/courses/:id([0-9a-fA-F]{24})", tutorAuthorization,getCourseByIdValidator, getTutorPopularCoursesController);
router.get("/get/tutor/course/data/dashboard/:id([0-9a-fA-F]{24})", tutorAuthorization, getCourseByIdValidator, getDataToTutorDashboardController);

// PATCH remvove student from course
router.patch("/remove/student/course/:id([0-9a-fA-F]{24})", userAuthorization, getCourseByIdValidator, removeStudentCourseController);

// POST course
router.post("/tutor/post/course", tutorAuthorization, postCourseValidator, postCourseController);

// PATCH course
router.patch("/set/selected/course/:id([0-9a-fA-F]{24})", userAuthorization, getCourseByIdValidator ,setSelectedCourseController)

// PUT course
router.put("/tutor/update/course/:id", tutorAuthorization, postCourseValidator, updateCourseController)

// User usecase

// Tutor
router.get("/tutor/get/course/students/:id", tutorAuthorization, getCourseByIdValidator, getCourseStudentsController);

// Admin
// GET
router.get("/admin/get/users", adminAuthorization, getUsersController);
router.get("/admin/get/users/count", adminAuthorization, getUsersCountController);
router.get("/admin/get/users/:role", adminAuthorization, getByRoleValidator, getUsersByRoleController);
router.get("/admin/get/users/count/:role", adminAuthorization, getByRoleValidator, getUsersCountByRoleController);
router.get("/admin/get/course/students/:id", adminAuthorization, getCourseByIdValidator, getCourseStudentsController);
router.get("/admin/get/course/data/dashboard", adminAuthorization,  getDataToAdminDashboardController);
// PATCH
router.patch("/admin/block/user/:id", adminAuthorization, muteDataValidator, blockUserContorller);
router.patch("/admin/unblock/user/:id", adminAuthorization, muteDataValidator, unBlockUserContorller);

// Language usecase

// Admin
// GET
router.get("/amdin/get/languages/count", adminAuthorization, getLanguagesCountController);
// PATCH
router.patch("/admin/unlist/language/:id", adminAuthorization, muteDataValidator, unListLanguageController);
router.patch("/admin/list/language/:id", adminAuthorization, muteDataValidator, listLanguageController);

// Course usecase

//Tutor
// PATCH
router.patch("/tutor/unlist/course/:id", tutorAuthorization, muteDataValidator, unListCourseController);
router.patch("/tutor/list/course/:id", tutorAuthorization, muteDataValidator, listCourseController);


export default router;