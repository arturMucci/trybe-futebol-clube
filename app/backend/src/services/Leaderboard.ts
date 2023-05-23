import AwayStatusGetter from '../utils/AwayStatusGetter';
import Teams from '../database/models/Teams';
import IStatus from '../database/interfaces/IStatus';
import HomeStatusGetter from '../utils/HomeStatusGetter';
import MatchesService from './Matches';

export default class LeaderboardService {
  public static async getAllHomeStatus(): Promise<IStatus[]> {
    const allTeams = await Teams.findAll();
    const allMatches = await MatchesService.getAll('false');

    const allStatus = allTeams.map(({ id, teamName }) => ({
      name: teamName,
      totalPoints: HomeStatusGetter.totalPoints(id, allMatches),
      totalGames: HomeStatusGetter.totalGames(id, allMatches),
      totalVictories: HomeStatusGetter.totalVictories(id, allMatches),
      totalDraws: HomeStatusGetter.totalDraws(id, allMatches),
      totalLosses: HomeStatusGetter.totalLosses(id, allMatches),
      goalsFavor: HomeStatusGetter.goalsFavor(id, allMatches),
      goalsOwn: HomeStatusGetter.goalsOwn(id, allMatches),
      goalsBalance: HomeStatusGetter.goalsBalance(),
      efficiency: HomeStatusGetter.efficiency(),
    })).sort((a, b) => LeaderboardService.conditional(a, b));

    return allStatus;
  }

  public static async getAllAwayStatus(): Promise<IStatus[]> {
    const allTeams = await Teams.findAll();
    const allMatches = await MatchesService.getAll('false');

    const allStatus = allTeams.map(({ id, teamName }) => ({
      name: teamName,
      totalPoints: AwayStatusGetter.totalPoints(id, allMatches),
      totalGames: AwayStatusGetter.totalGames(id, allMatches),
      totalVictories: AwayStatusGetter.totalVictories(id, allMatches),
      totalDraws: AwayStatusGetter.totalDraws(id, allMatches),
      totalLosses: AwayStatusGetter.totalLosses(id, allMatches),
      goalsFavor: AwayStatusGetter.goalsFavor(id, allMatches),
      goalsOwn: AwayStatusGetter.goalsOwn(id, allMatches),
      goalsBalance: AwayStatusGetter.goalsBalance(),
      efficiency: AwayStatusGetter.efficiency(),
    })).sort((a, b) => LeaderboardService.conditional(a, b));

    return allStatus;
  }

  public static conditional(varA: IStatus, varB: IStatus): number {
    if (varA.totalPoints < varB.totalPoints) return 1;
    if (varA.totalPoints > varB.totalPoints) return -1;
    if (varA.totalVictories < varB.totalVictories) return 1;
    if (varA.totalVictories > varB.totalVictories) return -1;
    if (varA.goalsBalance < varB.goalsBalance) return 1;
    if (varA.goalsBalance > varB.goalsBalance) return -1;
    if (varA.goalsFavor < varB.goalsFavor) return 1;
    if (varA.goalsFavor > varB.goalsFavor) return -1;
    return 0;
  }
}
