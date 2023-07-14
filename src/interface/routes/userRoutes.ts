import { Router } from "express";

// controllers
import loginController from "../controllers/common/loginController";
import getCategoriesController from "../controllers/category/getCategoriesController";
import stepOneController from "../controllers/common/signupController/stepOneController";
import stepTwoController from "../controllers/common/signupController/stepTwoController";
import getCategoryByIdController from "../controllers/category/getCategoriesByIdController";


// middlewares
import otpAuthMiddleware from "../../middleware/otpAuthMiddleware";

// validator middlewares
import {
 getCategoryByIdValidator,
 getCourseByIdValidator,
 loginValidator, postCategoryValidator, postCourseValidator, signupValidatorOne, signupValidatorTwo, 
} from "../../middleware/requestValidator";
import postCategoryController from "../controllers/category/postCategoryController";
import getCoursesController from "../controllers/course/getCoursesController";
import getCourseByIdController from "../controllers/course/getCourseByIdController";
import adminAuthorization from "../../middleware/adminAuthorization";
import tutorAuthorization from "../../middleware/tutorAuthorizationMiddleware";
import postCourseController from "../controllers/course/postCourseController";

const router = Router();


// POST  signup
router.post("/register/stepone",signupValidatorOne, stepOneController);
router.post("/register/steptwo/:id", signupValidatorTwo, otpAuthMiddleware, stepTwoController);

// POST login
router.post("/login", loginValidator, loginController);

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