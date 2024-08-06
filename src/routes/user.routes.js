import { Router } from 'express';

import { getAllUser, logout} from '../controller/user.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { bookings } from '../controller/booking.controller.js';
import { getFields } from '../controller/fields.controller.js';

const userRoutes = Router();

userRoutes.get('/',verifyToken, getAllUser);
userRoutes.post('/booking',verifyToken, bookings);
userRoutes.get('/fields', getFields);
userRoutes.post('/logout',verifyToken, logout);


export default userRoutes;