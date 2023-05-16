import * as express from 'express';
import validateToken from '../middlewares/validateToken';
import validateTeams from '../middlewares/validateTeams';
import MatchesController from '../controllers/Matches';

const MatchesRouter = express.Router();

MatchesRouter.get(
  '/',
  MatchesController.getAll,
);

MatchesRouter.post(
  '/',
  validateToken,
  validateTeams,
  MatchesController.newMatch,
);

MatchesRouter.patch(
  '/:id/finish',
  validateToken,
  MatchesController.finishMatch,
);

MatchesRouter.patch(
  '/:id',
  validateToken,
  MatchesController.attMatch,
);

export default MatchesRouter;
