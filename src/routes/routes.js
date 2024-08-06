import express from 'express';
import { getAllUser, loginUser, logout, registerUser } from '../controller/user.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { reqRefreshToken } from '../controller/refreshToken.js';
import { getFields } from '../controller/fields.controller.js';
import { bookings } from '../controller/booking.controller.js';

const router = express.Router();

router.get('/',verifyToken, getAllUser)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/refresh-token', reqRefreshToken)
router.post('/logout',verifyToken, logout)
router.get('/fields', getFields)
router.post('/booking',verifyToken, bookings)

export default router;