/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import serverResponse from '../modules/serverResponse';

const { SECRET } = process.env;
const { errorResponse } = serverResponse;

dotenv.config();

class Authentication {
  static async verifyToken(req, res, next) {
    try {
      const bearer = req.headers.authorization;
      if (!bearer) {
        return errorResponse(res, 401, { message: 'No token provided' });
      }
      const token = bearer.split(' ')[1];
      jwt.verify(token, SECRET, (err, decoded) => {
        if (err) {
          return errorResponse(res, 401, {
            message: 'Invalid token provided',
          });
        }
        req.user = decoded;
        return next();
      });
    } catch (err) {
      return next(err);
    }
  }
  static async verifyTokenViaSocket(userToken) {
    if (!userToken) {
        return 'token error';
    }
    try {
      const decoded = await jwt.verify(userToken, SECRET);
      return decoded;
    } catch (err) {
      return 'token error';
    }
  }
}

export default Authentication;
