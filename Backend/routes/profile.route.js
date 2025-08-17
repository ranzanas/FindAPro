import {Router } from "express";


const router = Router();

import { addExperience } from "../controller/profile.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
router.post('/addExperience', authMiddleware,  addExperience)

export default router;