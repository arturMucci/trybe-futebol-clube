import { sign, verify } from 'jsonwebtoken';
import IJwtPayload from '../database/interfaces/IJwtPayload';
import Error from './Error';

const secret = process.env.JWT_SECRET || 'insecure';

export function generateToken(id: number): string {
  const hash = sign({ id }, secret, { expiresIn: '1d', algorithm: 'HS256' });

  return hash;
}

export function verifyToken(token: string): number {
  try {
    const { id } = verify(token, secret) as IJwtPayload;

    return id;
  } catch (error) {
    throw new Error(401, 'Token must be a valid token');
  }
}
