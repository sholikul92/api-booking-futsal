import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];
    if (token === null) return res.sendStatus(401);

    const SECRET_KEY = process.env.SECRET_KEY
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.sendStatus(403)
        req.phoneNumber = decoded.phoneNumber
        next();
    })
}