import * as createHttpError from 'http-errors';
import { NextFunction, Request, Response } from 'express';
import TeamsService from '../services/Teams';

export default async function checkTeams(req: Request, _res: Response, next: NextFunction) {
  const { homeTeamId, awayTeamId } = req.body;

  if (homeTeamId === awayTeamId) {
    return next(createHttpError(422, 'It is not possible to create a match with two equal teams'));
  }

  const team1 = await TeamsService.getById(homeTeamId);
  const team2 = await TeamsService.getById(awayTeamId);

  if (!team1 || !team2) {
    return next(createHttpError(404, 'There is no team with such id!'));
  }

  return next();
}
