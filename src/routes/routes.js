import express from 'express';
import { getAllUser, loginUser, logout, registerUser } from '../controller/user.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { reqRefreshToken } from '../controller/refreshToken.js';

const router = express.Router();

router.get('/',verifyToken, getAllUser)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/refresh-token', reqRefreshToken)
router.post('/logout', logout)

export default router;