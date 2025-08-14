import {Router } from "express";


const router = Router();

import { addExperience } from "../controller/profile.controller";
router.post('/addExperience', addExperience)
