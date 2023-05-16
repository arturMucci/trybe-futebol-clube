import { Request, Response, NextFunction } from 'express';
import LoginService from '../services/Login';

export default class LoginController {
  public static async getRole(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { authorization } = req.headers;
      const role = await LoginService.getRole(authorization as string);
      return res.status(200).json({ role });
    } catch (error) {
      return next(error);
    }
  }

  public static async Login(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { email, password } = req.body;
      const token = await LoginService.Login(email, password);
      return res.status(200).json({ token });
    } catch (error) {
      return next(error);
    }
  }
}
