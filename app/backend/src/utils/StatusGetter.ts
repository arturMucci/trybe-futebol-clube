// import ITeam from '../database/interfaces/ITeams';
import IMatch from '../database/interfaces/IMatch';

export default class StatusGetter {
  private static _goalsFavor: number;
  private static _goalsOwned: number;
  private static _totalPoints: number;
  private static _totalGames: number;

  constructor() {
    StatusGetter._goalsFavor = 0;
    StatusGetter._goalsOwned = 0;
  }

  public static totalPoints(id: number, allMatches: IMatch[]): number {
    let totalPoints = 0;

    allMatches.filter(({ homeTeamId }) => homeTeamId === id)
      .forEach(({ homeTeamGoals, awayTeamGoals }) => {
        if (homeTeamGoals > awayTeamGoals) totalPoints += 3;
        if (homeTeamGoals === awayTeamGoals) totalPoints += 1;
      });

    StatusGetter._totalPoints = totalPoints;

    return totalPoints;
  }

  public static totalGames(id: number, allMatches: IMatch[]): number {
    const totalGames = allMatches.filter(({ homeTeamId }) => homeTeamId === id).length;

    StatusGetter._totalGames = totalGames;

    return totalGames;
  }

  public static totalVictories(id: number, allMatches: IMatch[]): number {
    return allMatches.filter(({
      homeTeamId,
      homeTeamGoals,
      awayTeamGoals,
    }) => homeTeamId === id && homeTeamGoals > awayTeamGoals)
      .length;
  }

  public static totalDraws(id: number, allMatches: IMatch[]): number {
    return allMatches.filter(({
      homeTeamId,
      homeTeamGoals,
      awayTeamGoals,
    }) => homeTeamId === id && homeTeamGoals === awayTeamGoals)
      .length;
  }

  public static totalLosses(id: number, allMatches: IMatch[]): number {
    return allMatches.filter(({
      homeTeamId,
      homeTeamGoals,
      awayTeamGoals,
    }) => homeTeamId === id && homeTeamGoals < awayTeamGoals)
      .length;
  }

  public static goalsFavor(id: number, allMatches: IMatch[]): number {
    let totalInFavor = 0;

    allMatches.filter(({ homeTeamId }) => homeTeamId === id)
      .forEach(({ homeTeamGoals }) => {
        totalInFavor += homeTeamGoals;
      });

    StatusGetter._goalsFavor = totalInFavor;

    return totalInFavor;
  }

  public static goalsOwn(id: number, allMatches: IMatch[]): number {
    let totalOwned = 0;

    allMatches.filter(({ homeTeamId }) => homeTeamId === id)
      .forEach(({ awayTeamGoals }) => {
        totalOwned += awayTeamGoals;
      });

    StatusGetter._goalsOwned = totalOwned;

    return totalOwned;
  }

  public static goalsBalance() {
    return StatusGetter._goalsFavor - StatusGetter._goalsOwned;
  }

  public static efficiency(): number {
    return +((StatusGetter._totalPoints / (StatusGetter._totalGames * 3)) * 100).toFixed(2);
  }
}
