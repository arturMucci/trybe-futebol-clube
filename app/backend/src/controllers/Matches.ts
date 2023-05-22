import { Request, Response, NextFunction } from 'express';
import MatchesService from '../services/Matches';

export default class MatchesController {
  public static async getAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { query: { inProgress } } = req;
      const allMatches = await MatchesService.getAll(inProgress as string);
      return res.status(200).json(allMatches);
    } catch (error) {
      return next(error);
    }
  }

  public static async newMatch(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const newMatch = await MatchesService.newMatch({ ...req.body, inProgress: true });
      return res.status(201).json(newMatch);
    } catch (error) {
      return next(error);
    }
  }

  public static async attMatch(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const result = await MatchesService.attMatch(+id, req.body);
      return res.status(200).json({
        message: 'updated',
        affected: {
          id: result,
          ...req.body,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  public static async finishMatch(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;

      const result = await MatchesService.finishMatch(+id);
      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  }
}
