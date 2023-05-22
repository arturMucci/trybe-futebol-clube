import sinon from 'sinon';
import chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http')
import chaiAsPromised from 'chai-as-promised';

import { app } from '../app';
import LoginController from '../controllers/Login';
import LoginService from '../services/Login';
import * as Auth from '../utils/auth';

import tokenResponse from './mocks/responses/token';
import Users from '../database/models/Users';
import user1 from './mocks/responses/user1'
import Error from '../utils/Error';

const { expect } = chai;

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('06 - Testa a camada de "LoginController"', () => {
  let chaiHttpResponse: Response;

  afterEach(() => sinon.restore());

  it('01 - Testa um caso de sucesso de "Login"', async () => {
    const loginServiceLogin = sinon.stub(LoginService, 'Login');

    loginServiceLogin.resolves(tokenResponse);

    // @ts-ignore
    chaiHttpResponse = await chai.request(app)
      .post('/Login')
      .send({
        email: 'admin@admin.com',
        password: '123456',
      });

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal({ token: tokenResponse });
  });

  it('02 - Testa um caso de fracasso de "Login" (faltando parametros)', async () => {
    // @ts-ignore
    chaiHttpResponse = await chai.request(app)
      .post('/Login')
      .send({
        // email: 'invalid_email',
        password: '123456',
      });

    expect(chaiHttpResponse.status).to.be.equal(400);
    // expect(chaiHttpResponse.body).to.be.deep.equal({ token: tokenResponse });
  });

  it('03 - Testa um caso de sucesso de "getRole"', async () => {
    const utilsVerifyToken = sinon.stub(Auth, 'verifyToken');
    const loginServiceGetRole = sinon.stub(LoginService, 'getRole');
    const userFindByPk = sinon.stub(Users, 'findByPk');

    utilsVerifyToken.withArgs('valid_token').resolves(1);
    //@ts-ignore
    userFindByPk.withArgs(1).resolves(user1);
    loginServiceGetRole.resolves('admin');

    // @ts-ignore
    chaiHttpResponse = await chai.request(app)
      .get('/Login/role')
      .set(
        'authorization',
        'valid_token',
      );

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal({ role: 'admin' });
  });
});