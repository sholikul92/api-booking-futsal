import jwt from 'jsonwebtoken'
import { findUserByToken } from '../services/user.service.js';
import { encodedToken } from '../auth/jwtToken.js';
import { response } from '../utils/responseJson.js';

export const reqRefreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.status(403).json({"message": "no token in cookie"});
    
        const user = await findUserByToken(refreshToken);
        if(!user[0]) return res.status(403).json({"message": "invalid token"})
        
        jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN, (err, decode) => {
            if(err) return res.sendStatus(401);
            const newTokenAccess = encodedToken(user[0], process.env.SECRET_KEY, '30s')
        
            res.status(200).json(response("success", 200, null, {newTokenAccess}))
        })
    } catch (error) {
        res.status(500).json(response(500, "failed", error.message, null))
    }    
}