import { Router } from "express";

// controllers
import refreshTokenController from "../controllers/token/tokenController";
import refreshAuthorization from "../../middleware/refreshAuthorization";

const router = Router();

router.post("/", refreshAuthorization, refreshTokenController);

export default router;
