import { Router } from "express";

// controllers
import { loginController, googleLoginController } from "../controllers/common";
import { stepOneController, stepTwoController } from "../controllers/common/signupController";
import { getCourseByIdController, getCoursesController, postCourseController } from "../controllers/course";
import { getCategoriesController, getCategoryByIdController, postCategoryController } from "../controllers/category";

// middlewares
import {
  adminAuthorization, googleLoginMiddleware,
  googleSignupMiddelware, otpAuthMiddleware, tutorAuthorization
} from "../../middleware";


// validator middlewares
import {
  signupValidatorOne, signupValidatorTwo, 
  getCategoryByIdValidator,getCourseByIdValidator,
  loginValidator, postCategoryValidator, postCourseValidator,
} from "../../middleware/requestValidator";
import googleSignupController from "../controllers/common/signupController/googleSignupController";


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

// GET category
router.get("/get/categories", getCategoriesController);
router.get("/get/category/:id([0-9a-fA-F]{24})", getCategoryByIdValidator, getCategoryByIdController);

// POST category
router.post("/admin/post/category",adminAuthorization,postCategoryValidator,postCategoryController);

// GET courses
router.get("/get/courses", getCoursesController);
router.get("/get/course/:id([0-9a-fA-F]{24})",getCourseByIdValidator, getCourseByIdController);

// POST course
router.post("/tutor/post/course", tutorAuthorization, postCourseValidator, postCourseController);

export default router;