import Teams from '../database/models/Teams';
import IMatch from '../database/interfaces/IMatch';
import Matches from '../database/models/Matches';
import IScore from '../database/interfaces/IScore';
import IMatchBody from '../database/interfaces/IMatchBody';

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
  ): Promise<void> {
    await Matches.update({
      homeTeamGoals,
      awayTeamGoals,
    }, {
      where: {
        id,
      },
    });
  }

  public static async finishMatch(id: number) {
    await Matches.update({
      inProgress: false,
    }, {
      where: {
        id,
      },
    });
  }
}
