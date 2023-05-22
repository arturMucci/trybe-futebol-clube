import sinon from 'sinon';
import chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http')
import chaiAsPromised from 'chai-as-promised';

import LoginService from '../services/Login';
import * as auth from '../utils/auth';
import Bcrypt from 'bcryptjs';

import responseToken from './mocks/responses/token';
import tokenCheck from './mocks/checks/token';

import responseUser1 from './mocks/responses/user1';

import Users from '../database/models/Users';
import Error from '../utils/Error';

const { expect } = chai;

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('02 - Testa a camada service "LoginService": ', () => {
  afterEach(() => sinon.restore());

  it('01 - Testa o retorno em um caso de sucesso do método "Login": ', async () => {
    const usersFindOne = sinon.stub(Users, 'findOne');
    const bcryptCompare = sinon.stub(Bcrypt, 'compare');
    const generateToken = sinon.stub(auth, 'generateToken');

    // @ts-ignore
    usersFindOne.withArgs({ where: { email: 'user@user.com'}}).resolves(responseUser1);
    bcryptCompare.resolves(true);
    generateToken.resolves(responseToken);

    const result1 = await LoginService.Login('user@user.com', 'secret_user');
    expect(result1).to.be.equal(tokenCheck);
  });

  it('02 - Testa o retorno em um caso de fracasso do método "Login": ', async () => {
    const userssFindOne = sinon.stub(Users, 'findOne');
    const bcryptCompare = sinon.stub(Bcrypt, 'compare');

    userssFindOne.withArgs({ where: { email: 'emai@email.com' } }).resolves(undefined);
    bcryptCompare.resolves(false);

    try {
      await LoginService.Login('emai@email.com', '123456');
    } catch (E) {
      const error = E as Error;

      expect(error.status).to.equal(401);
      expect(error.message).to.equal('Invalid email or password');
    }
  });

  it('03 - Testa se o método "getRole" retorna o "role" do usuário: ', async () => {
    const utilsVerifyToken = sinon.stub(auth, 'verifyToken');
    const bcryptCompare = sinon.stub(Bcrypt, 'compare');
    // @ts-ignore
    const usersFindByPk = sinon.stub(Users, 'findByPk');

    utilsVerifyToken.withArgs('valid_token').returns(1);
    // @ts-ignore
    utilsVerifyToken.withArgs('invalid_token').throws(new Error(401, 'Token must be a valid token'));
    bcryptCompare.resolves(false);
    // @ts-ignore
    usersFindByPk.withArgs(1).resolves(responseUser1);

    const role = await LoginService.getRole('valid_token');
    expect(role).to.equal('admin');

    try {
      await LoginService.getRole('invalid_token');
    } catch (E) {
      const error = E as Error;

      expect(error.status).to.equal(401);
      expect(error.message).to.equal('Token must be a valid token');
    }
  });

  it('04 - Testa se o método "getRole" lança um erro em caso de parametros inválidos: ', async () => {
    const usersFindOne = sinon.stub(Users, 'findOne');
    const bcryptCompare = sinon.stub(Bcrypt, 'compare');
    //@ts-ignore
    usersFindOne.withArgs({ where: { email: 'user@user.com' } }).resolves(responseUser1);
    bcryptCompare.resolves(false);

    try {
      await LoginService.verifyCredentials('user@user.com', '123456');
    } catch (E) {
      const error = E as Error;

      expect(error.status).to.equal(401);
      expect(error.message).to.equal('Invalid email or password');
    }
  });
});
