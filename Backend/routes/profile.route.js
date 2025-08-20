import {Router } from "express";


const router = Router();

import addEducation, { addExperience, getEducations, getExperiences, getExperiencesByUserId , getEducationsByUserId} from "../controller/profile.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
router.post('/addExperience', authMiddleware,  addExperience)
router.post('/addEducation', authMiddleware, addEducation);
router.get('/listExperience', authMiddleware, getExperiences);
router.get("/experience/:userId", getExperiencesByUserId);
router.get('/listEducation',authMiddleware, getEducations);
router.get("/education/:userId", getEducationsByUserId);

export default router;