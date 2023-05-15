import { Request, Response, NextFunction } from 'express';
import MatchesService from '../services/Matches';

export default class MatchesController {
  public static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { query: { inProgress } } = req;
      const allMatches = await MatchesService.getAll(inProgress as string);
      return res.status(200).json(allMatches);
    } catch (error) {
      return next(error);
    }
  }
}
