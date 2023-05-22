import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';
import IMatch from '../database/interfaces/IMatch';
import IMatchFinished from '../database/interfaces/IMatchFinished';
import IMatchBody from '../database/interfaces/IMatchBody';
import IScore from '../database/interfaces/IScore';

export default class MatchesService {
  public static async getAll(inProgress: string): Promise<IMatch[]> {
    let allMatches = await Matches.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    if (inProgress === 'true') {
      allMatches = allMatches.filter((each) => each.inProgress);
    }

    if (inProgress === 'false') {
      allMatches = allMatches.filter((each) => !each.inProgress);
    }

    return allMatches;
  }

  public static async newMatch({
    homeTeamId,
    homeTeamGoals,
    awayTeamId,
    awayTeamGoals,
    inProgress,
  }: IMatchBody): Promise<IMatch> {
    const newMatch = await Matches.create({
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress,
    });

    return newMatch;
  }

  public static async attMatch(
    id: number,
    {
      homeTeamGoals,
      awayTeamGoals,
    }: IScore,
  ): Promise<number[]> {
    const result = await Matches.update({
      homeTeamGoals,
      awayTeamGoals,
    }, {
      where: {
        id,
      },
    });

    return [+result];
  }

  public static async finishMatch(id: number): Promise<IMatchFinished> {
    await Matches.update({
      inProgress: false,
    }, {
      where: {
        id,
      },
    });

    return { message: 'Finished' };
  }
}
