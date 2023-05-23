// import ITeam from '../database/interfaces/ITeams';
import IMatch from '../database/interfaces/IMatch';

export default class AwayStatusGetter {
  private static _goalsFavor: number;
  private static _goalsOwned: number;
  private static _totalPoints: number;
  private static _totalGames: number;

  constructor() {
    AwayStatusGetter._goalsFavor = 0;
    AwayStatusGetter._goalsOwned = 0;
  }

  public static totalPoints(id: number, allMatches: IMatch[]): number {
    let totalPoints = 0;

    allMatches.filter(({ awayTeamId }) => awayTeamId === id)
      .forEach(({ homeTeamGoals, awayTeamGoals }) => {
        if (awayTeamGoals > homeTeamGoals) totalPoints += 3;
        if (homeTeamGoals === awayTeamGoals) totalPoints += 1;
      });

    AwayStatusGetter._totalPoints = totalPoints;

    return totalPoints;
  }

  public static totalGames(id: number, allMatches: IMatch[]): number {
    const totalGames = allMatches.filter(({ awayTeamId }) => awayTeamId === id).length;

    AwayStatusGetter._totalGames = totalGames;

    return totalGames;
  }

  public static totalVictories(id: number, allMatches: IMatch[]): number {
    return allMatches.filter(({
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    }) => awayTeamId === id && awayTeamGoals > homeTeamGoals)
      .length;
  }

  public static totalDraws(id: number, allMatches: IMatch[]): number {
    return allMatches.filter(({
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    }) => awayTeamId === id && homeTeamGoals === awayTeamGoals)
      .length;
  }

  public static totalLosses(id: number, allMatches: IMatch[]): number {
    return allMatches.filter(({
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    }) => awayTeamId === id && awayTeamGoals < homeTeamGoals)
      .length;
  }

  public static goalsFavor(id: number, allMatches: IMatch[]): number {
    let totalInFavor = 0;

    allMatches.filter(({ awayTeamId }) => awayTeamId === id)
      .forEach(({ awayTeamGoals }) => {
        totalInFavor += awayTeamGoals;
      });

    AwayStatusGetter._goalsFavor = totalInFavor;

    return totalInFavor;
  }

  public static goalsOwn(id: number, allMatches: IMatch[]): number {
    let totalOwned = 0;

    allMatches.filter(({ awayTeamId }) => awayTeamId === id)
      .forEach(({ homeTeamGoals }) => {
        totalOwned += homeTeamGoals;
      });

    AwayStatusGetter._goalsOwned = totalOwned;

    return totalOwned;
  }

  public static goalsBalance() {
    return AwayStatusGetter._goalsFavor - AwayStatusGetter._goalsOwned;
  }

  public static efficiency(): number {
    return +((AwayStatusGetter._totalPoints / (AwayStatusGetter._totalGames * 3)) * 100).toFixed(2);
  }
}
