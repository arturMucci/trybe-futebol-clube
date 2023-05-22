import * as Bcrypt from 'bcryptjs';
import IUser from '../database/interfaces/IUser';
import { generateToken, verifyToken } from '../utils/auth';
import Users from '../database/models/Users';
import Error from '../utils/Error';

export default class LoginService {
  public static async Login(
    email: string,
    password: string,
  ): Promise<string> {
    const id = await LoginService.verifyCredentials(email, password);

    return generateToken(id);
  }

  public static async getRole(
    token: string,
  ): Promise<string | undefined> {
    const user = await Users.findByPk(verifyToken(token)) as IUser;

    return user.role;
  }

  public static async verifyCredentials(
    email: string,
    password: string,
  ): Promise<number> {
    const userExist = await Users.findOne({ where: { email } });

    if (!userExist) throw new Error(401, 'Invalid email or password');

    const passwordIsTrue = await Bcrypt.compare(password, userExist.password);

    if (!passwordIsTrue) throw new Error(401, 'Invalid email or password');

    return userExist.id;
  }
}
