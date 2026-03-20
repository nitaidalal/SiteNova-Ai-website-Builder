import {Router} from "express";

import { googleAuth, logout } from "../controllers/auth.controller.js";

const router = Router();

router.post('/google-auth', googleAuth);
router.get('/logout', logout);

export default router;