import jwt from 'jsonwebtoken';

export const encodedToken = (body, secretKey, expireTime) => {
  const payload = {
    userID : body.userID,
    name : body.name,
    phoneNumber : body.phoneNumber
  };

  const token = jwt.sign(payload, secretKey, {
    expiresIn: expireTime
  });

  return token;
};