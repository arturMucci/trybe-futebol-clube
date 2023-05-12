import { Error } from 'sequelize';

export default class errorHandler extends Error {
  protected _status: number;
  protected _message: string;

  constructor(status: number, message: string) {
    super();
    this._status = status;
    this._message = message;
  }

  get status(): number {
    return this._status;
  }

  get message(): string {
    return this._message;
  }
}
