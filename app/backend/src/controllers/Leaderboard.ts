import { NextFunction, Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard';

export default class LeaderboardController {
  public static async getAllHomeStatus(_req: Request, res: Response, next: NextFunction) {
    try {
      const allStatus = await LeaderboardService.getAllHomeStatus();
      return res.status(200).json(allStatus);
    } catch (error) {
      return next(error);
    }
  }

  public static async getAllAwayStatus(_req: Request, res: Response, next: NextFunction) {
    try {
      const allStatus = await LeaderboardService.getAllAwayStatus();
      return res.status(200).json(allStatus);
    } catch (error) {
      return next(error);
    }
  }
}
