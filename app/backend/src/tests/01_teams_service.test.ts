import sinon from 'sinon';
import chai from 'chai';
import teamsResponses from './mocks/responses/allTeams';
import teamsCheck from './mocks/checks/allTeams';
import Teams from '../database/models/Teams';
import TeamsService from '../services/Teams';

const { expect } = chai;

describe('01 - Testa a rota de Times "/teams"', () => {
  afterEach(() => sinon.restore());

  it('01 - Testa se a rota GET/teams retorna todos os times do banco:', async  () => {
    sinon.stub(Teams, 'findAll')
      .withArgs()
    // @ts-ignore
      .resolves(teamsResponses);

    const allTeams = await TeamsService.getAll();

    expect(allTeams).to.be.deep.equal(teamsCheck);
  });

  it('02 - Testa se a rota GET/teams/:id retorna todos os times do banco:', async () => {
    const teamsFindByPk = sinon.stub(Teams, 'findByPk');

    teamsFindByPk
      .withArgs(1)
      // @ts-ignore
      .resolves(teamsResponses[0]);

    teamsFindByPk
      .withArgs(2)
      // @ts-ignore
      .resolves(teamsResponses[1]);

    teamsFindByPk
      .withArgs(3)
      // @ts-ignore
      .resolves(teamsResponses[2]);

    const team1 = await TeamsService.getById(1);
    expect(team1).to.be.deep.equal(teamsCheck[0]);

    const team2 = await TeamsService.getById(2);
    expect(team2).to.be.deep.equal(teamsCheck[1]);

    const team3 = await TeamsService.getById(3);
    expect(team3).to.be.deep.equal(teamsCheck[2]);

    sinon.restore();
  });
});
