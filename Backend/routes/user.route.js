import { Router } from "express";

const router = Router();
import {getUsers} from '../controller/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

router.get('/userList',authMiddleware, getUsers);
export default router;