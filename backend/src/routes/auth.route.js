import { Router } from "express"
import {
    registerUser,
    loginUser,
    testroute
} from "../controllers/auth.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/test").get(testroute);
export default router;