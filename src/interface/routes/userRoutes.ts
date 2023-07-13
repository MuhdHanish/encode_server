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
 loginValidator, postCategoryValidator, signupValidatorOne, signupValidatorTwo
} from "../../middleware/requestValidator";
import postCategoryController from "../controllers/category/postCategoryController";

const router = Router();

// GET category
router.get("/get/categories", getCategoriesController);
router.get("/get/category/:id([0-9a-fA-F]{24})", getCategoryByIdValidator, getCategoryByIdController);

// POST category
router.post("/admin/post/category",postCategoryValidator, postCategoryController);

// POST  signup
router.post("/register/stepone",signupValidatorOne, stepOneController);
router.post("/register/steptwo/:id", signupValidatorTwo, otpAuthMiddleware, stepTwoController);

// POST login
router.post("/login", loginValidator, loginController);

export default router;