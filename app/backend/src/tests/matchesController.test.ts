import sinon from 'sinon';
import chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http')
import chaiAsPromised from 'chai-as-promised';

import { app } from '../app';
import createdMatch from './mocks/checks/createdMatch';
import allMatchesResponse from './mocks/responses/allMatches';
import allMatchesCheck from './mocks/checks/allMatches';
import MatchesService from '../services/Matches';
import updateMatch from './mocks/responses/updateMatch';
import newMatch from './mocks/responses/newMatch';
import * as Auth from '../utils/auth';
import TeamsService from '../services/Teams';
import allTeamsResponse from './mocks/responses/allTeams';

const { expect } = chai;

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('03 - Testa a camada de "MatchesController"', () => {
  let chaiHttpResponse: Response;

  afterEach(() => sinon.restore());

  it('01 - Testa um caso de sucesso de "getAll"', async () => {
    const MatchesServiceGetAll = sinon.stub(MatchesService, 'getAll');

    MatchesServiceGetAll.resolves(allMatchesResponse);
    //@ts-ignore
    chaiHttpResponse = await chai.request(app).get('/matches');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(allMatchesCheck);
  });

  it('02 - Testa um caso de sucesso de "newMatch"', async () => {
    const matchesServiceNewMatch = sinon.stub(MatchesService, 'newMatch');
    const verifyToken = sinon.stub(Auth, 'verifyToken');
    const serviceGetById = sinon.stub(TeamsService, 'getById');

    matchesServiceNewMatch.resolves(createdMatch);
    verifyToken.returns(1);
    serviceGetById.withArgs(10).resolves(allTeamsResponse[0]);
    serviceGetById.withArgs(11).resolves(allTeamsResponse[1]);

    //@ts-ignore
    chaiHttpResponse = await chai.request(app)
      .post('/matches')
      .set('authorization', 'valid_token')
      .send(newMatch);

    expect(chaiHttpResponse.status).to.be.equal(201);
    expect(chaiHttpResponse.body).to.be.deep.equal(createdMatch);
  });

  it('03 - Testa um caso de sucesso de "attMatch"', async () => {
    const serviceAttMatch = sinon.stub(MatchesService, 'attMatch');
    const verifyToken = sinon.stub(Auth, 'verifyToken');

    verifyToken.returns(1);
    serviceAttMatch.withArgs(1, updateMatch).resolves({
      // @ts-ignore
      id: 1,
      homeTeamId: 16,
      homeTeamGoals: 1,
      awayTeamId: 8,
      awayTeamGoals: 1,
      inProgress: false,
      homeTeam: {
        teamName: 'São Paulo',
      },
      awayTeam: {
        teamName: 'Grêmio',
      },
    });

    // @ts-ignore
    chaiHttpResponse = await chai.request(app)
      .patch('/matches/1')
      .set('authorization', 'valid_token')
      .send({
        homeTeamGoals: 4,
        awayTeamGoals: 2,
      });

    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('04 - Testa um caso de sucesso de "finishMatch"', async () => {
    const verifyToken = sinon.stub(Auth, 'verifyToken');
    const matchesServiceNewMatch = sinon.stub(MatchesService, 'finishMatch');

    verifyToken.withArgs('valid_token').returns(41);
    matchesServiceNewMatch.withArgs(41).resolves({ message: 'Finished' });

    //@ts-ignore
    chaiHttpResponse = await chai.request(app)
      .patch('/matches/41/finish')
      .set('authorization', 'valid_token');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Finished' });
  });
});