import {Router } from "express";


const router = Router();

import addEducation, { addExperience } from "../controller/profile.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
router.post('/addExperience', authMiddleware,  addExperience)
router.post('/addEducation', authMiddleware, addEducation);

export default router;