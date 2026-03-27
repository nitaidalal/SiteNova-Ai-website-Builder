import {Router} from "express";

import { logout } from "../controllers/auth.controller.js";
import { getUserProfile } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/profile', authMiddleware, getUserProfile);
router.get('/logout', logout);

export default router;