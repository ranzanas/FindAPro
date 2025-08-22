import { Router } from "express";

const router = Router();
import {editUser, getUsers} from '../controller/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { uploadProfilePic } from "../controller/profile-picture.controller.js";
import { upload } from "../middleware/image-uploader.middleware.js";

router.get('/userList',authMiddleware, getUsers);

router.patch('/uploadProfilePic', authMiddleware, upload.single('image'), uploadProfilePic)

router.patch('/editUser/:id', authMiddleware, editUser);
export default router;