import { Router } from "express";

// controllers
import stepOneController from "../controllers/common/signupController/stepOneController";
import stepTwoController from "../controllers/common/signupController/stepTwoController";


// middlewares
import otpAuthMiddleware from "../../middleware/otpAuthMiddleware";

// validator middlewares
import { loginValidator, signupValidatorOne, signupValidatorTwo } from "../../utils/requestValidator";
import userAuthorization from "../../middleware/accessAuthorizationMiddleware";
import loginController from "../controllers/common/loginController";

const router = Router();

// GET 
router.get('/', userAuthorization, (req, res) => {
 res.status(200).json({ message: "authorization accepeted" });
})

// POST  signup
router.post("/register/stepone",signupValidatorOne, stepOneController);
router.post("/register/steptwo/:id", signupValidatorTwo, otpAuthMiddleware, stepTwoController);

// POST login
router.post("/login",loginValidator,loginController);

export default router;