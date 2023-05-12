import Teams from '../database/models/Teams';
import ITeam from '../database/interfaces/ITeams';

export default class TeamsService {
  public static async getAll(): Promise<ITeam[]> {
    const teams = await Teams.findAll();
    return teams;
  }

  public static async getById(id: number): Promise<ITeam | null> {
    const teamById = await Teams.findByPk(id);
    return teamById;
  }
}
