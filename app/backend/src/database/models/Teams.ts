import { INTEGER, Model, STRING } from 'sequelize';
import ITeam from '../interfaces/ITeams';
import db from '.';

export default class Teams extends Model<ITeam> {
  declare id: number;
  declare teamName: string;
}

Teams.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: INTEGER,
  },
  teamName: {
    type: STRING(30),
    allowNull: false,
  },
}, {
  modelName: 'teams',
  sequelize: db,
  timestamps: false,
  underscored: true,
});
