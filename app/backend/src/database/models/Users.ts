import { Model, INTEGER, STRING } from 'sequelize';
import IUser from '../interfaces/IUser';
import db from '.';

export default class Users extends Model<IUser> {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

Users.init({
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  username: {
    allowNull: false,
    type: STRING,
  },
  role: {
    allowNull: false,
    type: STRING,
  },
  email: {
    allowNull: false,
    type: STRING,
  },
  password: {
    allowNull: false,
    type: STRING,
  },
}, {
  modelName: 'users',
  sequelize: db,
  timestamps: false,
  underscored: true,
});
