import { NextFunction, Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard';

export default class LeaderboardController {
  public static async getAllStatus(_req: Request, res: Response, next: NextFunction) {
    try {
      const allStatus = await LeaderboardService.getAllStatus();
      return res.status(200).json(allStatus);
    } catch (error) {
      return next(error);
    }
  }
}
