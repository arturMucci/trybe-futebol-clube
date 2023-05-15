import { BOOLEAN, INTEGER, Model } from 'sequelize';
import IMatch from '../interfaces/IMatch';
import db from '.';
import Teams from './Teams';

export default class Matches extends Model<IMatch> {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeamId: {
    allowNull: false,
    field: 'home_team_id',
    onDelete: 'CASCADE',
    references: {
      model: 'teams',
      key: 'id',
    },
    type: INTEGER,
  },
  homeTeamGoals: {
    allowNull: false,
    field: 'home_team_goals',
    type: INTEGER,
  },
  awayTeamId: {
    allowNull: false,
    field: 'away_team_id',
    onDelete: 'CASCADE',
    references: {
      model: 'teams',
      key: 'id',
    },
    type: INTEGER,
  },
  awayTeamGoals: {
    allowNull: false,
    field: 'away_team_goals',
    type: INTEGER,
  },
  inProgress: {
    defaultValue: false,
    field: 'in_progress',
    type: BOOLEAN,
  },
}, {
  modelName: 'matches',
  sequelize: db,
  timestamps: false,
  underscored: true,
});

Teams.hasMany(Matches, {
  foreignKey: 'homeTeamId',
  as: 'home_team',
});

Teams.hasMany(Matches, {
  foreignKey: 'awayTeamId',
  as: 'away_team',
});

Matches.belongsTo(Teams, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});

Matches.belongsTo(Teams, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});
