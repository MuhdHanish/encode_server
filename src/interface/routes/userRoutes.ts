import { Router } from "express";

// controllers
import { loginController, googleLoginController } from "../controllers/authentication";
import { stepOneController, stepTwoController } from "../controllers/authentication/signupController";
import {
  getCourseByIdController,
  getPopularCoursesController,
  postCourseController,
  getTutorCoursesController,
  updateCourseController
} from "../controllers/course";
import { getLanguagesController, getLanguageByIdController, postLanguageController } from "../controllers/language";

// middlewares
import {
  adminAuthorization, googleLoginMiddleware,
  googleSignupMiddelware, otpAuthMiddleware, tutorAuthorization, userAuthorization
} from "../../middleware";


// validator middlewares
import {
  signupValidatorOne, signupValidatorTwo, 
  getLanguageByIdValidator,getCourseByIdValidator,
  loginValidator, postLanguageValidator, postCourseValidator,setSelectedCourseValidator
} from "../../middleware/requestValidator";
import googleSignupController from "../controllers/authentication/signupController/googleSignupController";
import setSelectedCourseController from "../controllers/course/setSelectedCourseController";


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
router.get("/get/languages", getLanguagesController);
router.get("/get/language/:id([0-9a-fA-F]{24})", getLanguageByIdValidator, getLanguageByIdController);

// POST language
router.post("/admin/post/language",adminAuthorization,postLanguageValidator,postLanguageController);

// GET course
router.get("/get/popular/courses", getPopularCoursesController);
router.get("/get/course/:id([0-9a-fA-F]{24})",getCourseByIdValidator, getCourseByIdController);
router.get("/get/tutor/courses/:id([0-9a-fA-F]{24})",tutorAuthorization,getTutorCoursesController);

// POST course
router.post("/tutor/post/course", tutorAuthorization, postCourseValidator, postCourseController);

// PATCH course
router.patch("/set/selected/course", userAuthorization, setSelectedCourseValidator ,setSelectedCourseController)

// PATCH course
router.put("/tutor/update/course/:id", tutorAuthorization, postCourseValidator, updateCourseController)

export default router;