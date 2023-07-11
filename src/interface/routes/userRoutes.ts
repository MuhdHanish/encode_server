import { Router } from "express";

// controllers
import stepOneController from "../controllers/common/signupController/stepOneController";
import stepTwoController from "../controllers/common/signupController/stepTwoController";

// middlewares
import otpAuthMiddleware from "../../middleware/otpAuthMiddleware";

// validator middlewares
import { loginValidator, signupValidatorOne, signupValidatorTwo } from "../../utils/requestValidator";
import { loginController } from "../controllers/common/LoginController";

const router = Router();

// GET 
router.get('/', (req, res) => {
 res.send('getted');
})

// POST  signup
router.post("/register/stepone",signupValidatorOne, stepOneController);
router.post("/register/steptwo/:id", signupValidatorTwo, otpAuthMiddleware, stepTwoController);

// POST login
router.post("/login",loginValidator,loginController);

export default router;