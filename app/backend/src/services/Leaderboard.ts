import Teams from '../database/models/Teams';
import IStatus from '../database/interfaces/IStatus';
import StatusGetter from '../utils/StatusGetter';
import MatchesService from './Matches';

export default class LeaderboardService {
  public static async getAllStatus(): Promise<IStatus[]> {
    const allTeams = await Teams.findAll();
    const allMatches = await MatchesService.getAll('false');

    const allStatus = allTeams.map(({ id, teamName }) => ({
      name: teamName,
      totalPoints: StatusGetter.totalPoints(id, allMatches),
      totalGames: StatusGetter.totalGames(id, allMatches),
      totalVictories: StatusGetter.totalVictories(id, allMatches),
      totalDraws: StatusGetter.totalDraws(id, allMatches),
      totalLosses: StatusGetter.totalLosses(id, allMatches),
      goalsFavor: StatusGetter.goalsFavor(id, allMatches),
      goalsOwn: StatusGetter.goalsOwn(id, allMatches),
    }));

    return allStatus;
  }
}
