import { NextFunction, Request, Response } from 'express';

export default function validateToken(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.authorization) return res.status(401).json({ message: 'Token not found' });
  return next();
}
