import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { secretKey, userTokenPayloadType } from './helperUtils';

/**
 * Middleware, die das JWT-Token überprüft.
 * @param req der Request
 * @param res die Response
 * @param next die nächste Funktion
 */
export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookies = req.cookies;

  if (cookies) {
    const token = cookies.token as string;
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user as userTokenPayloadType;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
