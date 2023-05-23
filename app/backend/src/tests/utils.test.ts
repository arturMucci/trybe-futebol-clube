import sinon from 'sinon';
import chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http')
import chaiAsPromised from 'chai-as-promised';

const { expect } = chai;

import JWT from 'jsonwebtoken';
import { generateToken, verifyToken } from '../utils/auth';
import HttpError from '../utils/HttpError';

const secret = process.env.JWT_SECRET || 'insecure';

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('07 - Testa as funções utilitárias', () => {
  afterEach(() => sinon.restore());

  it('01 - Testa um caso de sucesso da função generate token', async () => {
    const jwtSign = sinon.stub(JWT, 'sign');

    // @ts-ignore
    jwtSign.withArgs({
        id: 1,
      },
      secret,
      {
        expiresIn: '1d',
        algorithm: 'HS256',
      })
      //  @ts-ignore
      .returns('valid_token');

      expect(generateToken(1)).to.be.equal('valid_token');
  });

  it('02 - Testa um caso de sucesso da função verifyToken', () => {
    const jwtVerify = sinon.stub(JWT, 'verify');

    // @ts-ignore
    jwtVerify.withArgs('valid_token', secret).returns({ id: 1 });

    expect(verifyToken('valid_token')).to.be.equal(1);
  });

  it('03 - Testa um caso de falha da função verifyToken', () => {
    const jwtVerify = sinon.stub(JWT, 'verify');

    jwtVerify.withArgs('invalid_token', secret)
    // @ts-ignore
      .throws(new HttpError(401, 'Token must be a valid token'));

    try {
      verifyToken('invalid_token');
    } catch (e) {
      const error = e as HttpError;
      expect(error.status).to.be.equal(401);
      expect(error.message).to.be.equal('Token must be a valid token');
    }
  });
});