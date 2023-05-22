import { NextFunction, Request, Response } from 'express';
import HttpError from '../utils/HttpError';

export default function validateLogin(req: Request, _res: Response, next: NextFunction) {
  if (!req.body.email || !req.body.password) {
    return next(new HttpError(400, 'All fields must be filled'));
  }

  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  if (!req.body.email.match(emailRegex) || req.body.password.length < 6) {
    return next(new HttpError(401, 'Invalid email or password'));
  }

  return next();
}
