import { Router } from "express";

// controllers
import stepOneController from "../controllers/common/signupController/stepOneController";
import stepTwoController from "../controllers/common/signupController/stepTwoController";

// middlewares
import otpAuthMiddleware from "../../middleware/otpAuthMiddleware";

// validator middlewares
import { signupValidatorOne, signupValidatorTwo } from "../../utils/requestValidator";

const router = Router();

// GET 
router.get('/', (req, res) => {
 res.send('getted');
})

// POST 
router.post('/register/stepone',signupValidatorOne, stepOneController);
router.post("/register/steptwo/:id",signupValidatorTwo,otpAuthMiddleware, stepTwoController);

export default router;