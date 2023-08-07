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
  setSelectedCourseController
} from "../controllers/course";
import { getLanguagesController, getLanguageByIdController, postLanguageController, editLanguageController } from "../controllers/language";
import googleSignupController from "../controllers/authentication/signupController/googleSignupController";
import {
  blockUserContorller, getCourseStudentsController, getUsersByRoleController, getUsersController,
  getUsersCountByRoleController, getUsersCountController, unBlockUserContorller
} from "../controllers/user/userUseCaseController";
import { getLanguagesCountController, listLanguageController, unListLanguageController } from "../controllers/language/languageUseCaseController";

// middlewares
import {
  adminAuthorization, googleLoginMiddleware,
  googleSignupMiddelware, otpAuthMiddleware, tutorAuthorization, userAuthorization
} from "../../middleware";


// validator middlewares
import {
  signupValidatorOne, signupValidatorTwo, 
  getLanguageByIdValidator,getCourseByIdValidator,
  loginValidator, postLanguageValidator, postCourseValidator,setSelectedCourseValidator, getByRoleValidator, muteDataValidator
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
router.put("/admin/edit/language", adminAuthorization, postLanguageValidator, editLanguageController);

// GET course
router.get("/get/popular/courses",userAuthorization, getPopularCoursesController);
router.get("/get/course/:id([0-9a-fA-F]{24})",userAuthorization, getCourseByIdValidator, getCourseByIdController);
router.get("/get/tutor/courses/:id([0-9a-fA-F]{24})",tutorAuthorization,getTutorCoursesController);

// POST course
router.post("/tutor/post/course", tutorAuthorization, postCourseValidator, postCourseController);

// PATCH course
router.patch("/set/selected/course", userAuthorization, setSelectedCourseValidator ,setSelectedCourseController)

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


export default router;