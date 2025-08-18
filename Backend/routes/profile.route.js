import {Router } from "express";


const router = Router();

import addEducation, { addExperience, getEducations, getExperiences } from "../controller/profile.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
router.post('/addExperience', authMiddleware,  addExperience)
router.post('/addEducation', authMiddleware, addEducation);
router.get('/listExperience', authMiddleware, getExperiences);
router.get('/listEducation',authMiddleware, getEducations)
export default router;