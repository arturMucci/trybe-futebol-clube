import Teams from '../database/models/Teams';
import IMatch from '../database/interfaces/IMatch';
import Matches from '../database/models/Matches';

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
}
