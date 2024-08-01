import express from 'express';
import { getAllUser, loginUser, registerUser } from '../controller/user.controller.js';

const router = express.Router();

router.get('/', getAllUser)
router.post('/register', registerUser)
router.post('/login', loginUser)

export default router;