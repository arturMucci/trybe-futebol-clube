import { NextFunction, Request, Response } from 'express';
import createError = require('http-errors');

export default function validateLogin(req: Request, _res: Response, next: NextFunction) {
  if (!req.body.email || !req.body.password) {
    return next(createError(400, 'All fields must be filled'));
  }

  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  if (!req.body.email.match(emailRegex) || req.body.password.length < 6) {
    return next(createError(401, 'Invalid email or password'));
  }

  return next();
}
