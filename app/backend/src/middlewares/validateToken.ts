import { NextFunction, Request, Response } from 'express';
import HttpError from '../utils/HttpError';
import { verifyToken } from '../utils/auth';

export default function validateToken(req: Request, _res: Response, next: NextFunction) {
  if (!req.headers.authorization) return next(new HttpError(401, 'Token not found'));

  const matchId = verifyToken(req.headers.authorization);

  if (!matchId) return next(new HttpError(401, 'Token must be a valid token'));

  return next();
}
