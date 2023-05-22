import sinon from 'sinon';
import chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http')
import chaiAsPromised from 'chai-as-promised';
import TeamsService from '../services/Teams';
import allTeamsResponse from './mocks/responses/allTeams';
import allTeamsCheck from './mocks/checks/allTeams';
import oneTeamResponse from './mocks/responses/oneTeam';
import oneTeamCheck from './mocks/checks/oneTeam';
import Error from '../utils/Error';
import { app } from '../app';

const { expect } = chai;

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('05 - Testa a camada de "TeamsController', () => {
  let chaiHttpResponse: Response;

  afterEach(() => sinon.restore());

  it('01 - Testa um caso de sucesso do método "getAll"', async () => {
    const teamServiceGetAll = sinon.stub(TeamsService, 'getAll');

    teamServiceGetAll.resolves(allTeamsResponse);

    // @ts-ignore
    chaiHttpResponse = await chai.request(app).get('/teams');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(allTeamsCheck);
  });

  it('02 - Testa um caso de fracasso do método "getAll"', async () => {
    const teamServiceGetAll = sinon.stub(TeamsService, 'getAll');

    const newErrorResponse = new Error(500, 'xablau');

    const newErrorCheck = new Error(500, 'xabau');
    teamServiceGetAll.throws(newErrorResponse);

    try {
      await chai.request(app).get('/teams');
    } catch (e) {
      expect(teamServiceGetAll).to.throw(newErrorCheck);
    }
  });

  it('03 - Testa um caso de sucesso do método "getById"', async () => {
    const teamServiceGetById = sinon.stub(TeamsService, 'getById');

    teamServiceGetById.resolves(oneTeamResponse);

    // @ts-ignore
    chaiHttpResponse = await chai.request(app).get('/teams/2');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(oneTeamCheck);
  });


  it('04 - Testa um caso de fracasso do método "getById"', async () => {
    const teamServiceGetById = sinon.stub(TeamsService, 'getById');

    const newErrorResponse = new Error(404, 'Not found');

    const newErrorCheck = new Error(404, 'Not found');
    teamServiceGetById.throws(newErrorResponse);

    try {
      await chai.request(app).get('/teams/900');
    } catch (e) {
      expect(teamServiceGetById).to.throw(newErrorCheck);
    }
  });
});