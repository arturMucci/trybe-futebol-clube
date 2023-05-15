import { Request, Response, NextFunction } from 'express';
import error from '../utils/Error';

export default function errorHandler(
  Error: error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (Error.status) return res.status(Error.status).json({ message: Error.message });
  return res.status(500).json({ message: Error.message });
}
