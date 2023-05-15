import * as Bcrypt from 'bcryptjs';
import * as createError from 'http-errors';
import { generateToken, verifyToken } from '../utils/auth';
import Users from '../database/models/Users';

export default class LoginService {
  public static async Login(
    email: string,
    password: string,
  ): Promise<string> {
    const userExist = await Users.findOne({ where: { email } });
    if (!userExist) throw createError(401, 'Invalid email or password');

    const passwordIsTrue = await Bcrypt.compare(password, userExist.password);

    if (!passwordIsTrue) throw createError(401, 'Invalid email or password');

    const token = generateToken(userExist.id);

    return token;
  }

  public static async getRole(token: string): Promise<string | undefined> {
    const id = verifyToken(token);

    console.log(id);

    if (!id) throw createError(401, 'Token must be a valid token');
    const user = await Users.findByPk(id);

    return user?.role;
  }
}
