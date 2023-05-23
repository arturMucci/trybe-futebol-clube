// import ITeam from '../database/interfaces/ITeams';
import IMatch from '../database/interfaces/IMatch';

export default class HomeStatusGetter {
  private static _goalsFavor: number;
  private static _goalsOwned: number;
  private static _totalPoints: number;
  private static _totalGames: number;

  constructor() {
    HomeStatusGetter._goalsFavor = 0;
    HomeStatusGetter._goalsOwned = 0;
  }

  public static totalPoints(id: number, allMatches: IMatch[]): number {
    let totalPoints = 0;

    allMatches.filter(({ homeTeamId }) => homeTeamId === id)
      .forEach(({ homeTeamGoals, awayTeamGoals }) => {
        if (homeTeamGoals > awayTeamGoals) totalPoints += 3;
        if (homeTeamGoals === awayTeamGoals) totalPoints += 1;
      });

    HomeStatusGetter._totalPoints = totalPoints;

    return totalPoints;
  }

  public static totalGames(id: number, allMatches: IMatch[]): number {
    const totalGames = allMatches.filter(({ homeTeamId }) => homeTeamId === id).length;

    HomeStatusGetter._totalGames = totalGames;

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

    HomeStatusGetter._goalsFavor = totalInFavor;

    return totalInFavor;
  }

  public static goalsOwn(id: number, allMatches: IMatch[]): number {
    let totalOwned = 0;

    allMatches.filter(({ homeTeamId }) => homeTeamId === id)
      .forEach(({ awayTeamGoals }) => {
        totalOwned += awayTeamGoals;
      });

    HomeStatusGetter._goalsOwned = totalOwned;

    return totalOwned;
  }

  public static goalsBalance() {
    return HomeStatusGetter._goalsFavor - HomeStatusGetter._goalsOwned;
  }

  public static efficiency(): number {
    return +((HomeStatusGetter._totalPoints / (HomeStatusGetter._totalGames * 3)) * 100).toFixed(2);
  }
}
