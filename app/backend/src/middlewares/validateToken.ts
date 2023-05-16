import { NextFunction, Request, Response } from 'express';
import createHttpError = require('http-errors');
import { verifyToken } from '../utils/auth';

export default function validateToken(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.authorization) return res.status(401).json({ message: 'Token not found' });

  const matchId = verifyToken(req.headers.authorization);

  if (!matchId) throw createHttpError(401, 'Token must be a valid token');

  return next();
}
