import { Router } from "express";
import { reqRefreshToken } from '../controller/refreshToken.js';
import { registerUser, loginUser } from "../controller/user.controller.js";

const authRoutes = Router()

authRoutes.post('/register', registerUser)
authRoutes.post('/login', loginUser)
authRoutes.post('/refresh-token', reqRefreshToken)

export default authRoutes;