import sinon from 'sinon';
import chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http')
import chaiAsPromised from 'chai-as-promised';

const { expect } = chai;

import Matches from '../database/models/Matches';

import MatchesService from '../services/Matches';
import allMatchesResponse from './mocks/responses/allMatches';
import allMatchesCheck from './mocks/checks/allMatches';
import matchesInProgressCheck from './mocks/checks/matchesInProgress';
import matchesFinishedCheck from './mocks/checks/matchesFinished';
import newMatchResponse from './mocks/responses/newMatch';
import createdMatch from './mocks/responses/createdMatch';
import updateMatch from './mocks/responses/updateMatch';
import matchFinished from './mocks/responses/matchFinished';

import Teams from '../database/models/Teams';

chai.use(chaiHttp);
chai.use(chaiAsPromised);

describe('04 - Testa a camada service de "MatchesService": ', () => {
  afterEach(() => sinon.restore());

  it('01 - Testa um caso de sucesso do método "getAll":', async () => {
    // @ts-ignore
    const matchesFindAll = sinon.stub(Matches, 'findAll');

    matchesFindAll.withArgs({
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    })
    // @ts-ignore
    .resolves(allMatchesResponse);

    // @ts-ignore
    const result = await MatchesService.getAll();

    expect(result).to.deep.equal(allMatchesCheck);
  });

  it('02 - Testa um caso de sucesso do método "getAll" com o parâmetro "inProgress" === "true": ', async () => {
    // @ts-ignore
    const matchesFindAll = sinon.stub(Matches, 'findAll');

    matchesFindAll.withArgs({
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    })
      // @ts-ignore
      .resolves(allMatchesResponse);

    // @ts-ignore
    const result = await MatchesService.getAll('true');

    expect(result).to.deep.equal(matchesInProgressCheck);
  });

  it('03 - Testa um caso de sucesso do método "getAll" com o parâmetro "inProgress" === "false": ', async () => {
    // @ts-ignore
    const matchesFindAll = sinon.stub(Matches, 'findAll');

    matchesFindAll.withArgs({
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
    })
      // @ts-ignore
    .resolves(allMatchesResponse);

    // @ts-ignore
    const result = await MatchesService.getAll('false');

    expect(result).to.deep.equal(matchesFinishedCheck);
  });

  it('04 - Testa um caso de sucesso do método "newMatch": ', async () => {
    const matchesCreate = sinon.stub(Matches, 'create');

    // @ts-ignore
    matchesCreate.withArgs(newMatchResponse).resolves(createdMatch);

    const result = await MatchesService.newMatch(newMatchResponse);

    expect(result).to.be.equal(createdMatch);
  });

  it('05 - Testa um caso de sucesso do método "attMatch": ', async () => {
    const matchesUpdate = sinon.stub(Matches, 'update');

    matchesUpdate.withArgs(updateMatch, { where: { id: 1 } }).resolves([ 1 ]);

    const result = await MatchesService.attMatch(1, {
      homeTeamGoals: 1,
      awayTeamGoals: 2,
    });

    expect(result).to.be.deep.equal([ 1 ]);
  });

  it('06 - Testa um caso de sucesso do método "attMatch": ', async () => {
    const matchesUpdate = sinon.stub(Matches, 'update');

    matchesUpdate.withArgs({
      inProgress: false,
    }, {
      where: {
        id: 5,
      },
    })
    .resolves([0]);

    // @ts-ignore
    expect(await MatchesService.finishMatch(1))
      .to.be.deep.equal(matchFinished);
  });
});
