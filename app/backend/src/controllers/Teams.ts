import { NextFunction, Request, Response } from 'express';
import TeamsService from '../services/Teams';

export default class TeamsController {
  public static async getAll(
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const teams = await TeamsService.getAll();

      return res.status(200).json(teams);
    } catch (error) {
      return next(error);
    }
  }

  public static async getById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const teamById = await TeamsService.getById(+id);
      return res.status(200).json(teamById);
    } catch (error) {
      return next(error);
    }
  }
}
