// import ITeam from '../database/interfaces/ITeams';
import IMatch from '../database/interfaces/IMatch';

export default class StatusGetter {
  public static totalPoints(id: number, allMatches: IMatch[]): number {
    let totalPoints = 0;

    allMatches.filter(({ homeTeamId }) => homeTeamId === id)
      .forEach(({ homeTeamGoals, awayTeamGoals }) => {
        if (homeTeamGoals > awayTeamGoals) totalPoints += 3;
        if (homeTeamGoals === awayTeamGoals) totalPoints += 1;
      });

    return totalPoints;
  }

  public static totalGames(id: number, allMatches: IMatch[]): number {
    return allMatches.filter(({ homeTeamId }) => homeTeamId === id).length;
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

    return totalInFavor;
  }

  public static goalsOwn(id: number, allMatches: IMatch[]): number {
    let totalInFavor = 0;

    allMatches.filter(({ homeTeamId }) => homeTeamId === id)
      .forEach(({ awayTeamGoals }) => {
        totalInFavor += awayTeamGoals;
      });

    return totalInFavor;
  }
}
