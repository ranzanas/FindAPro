import { Router } from 'express';
const router = Router();
import {register,login} from '../controller/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { getUsers } from '../controller/user.controller.js';

router.post('/register', register);
router.post('/login',login);
router.get('/userList',authMiddleware, getUsers);
export default router;