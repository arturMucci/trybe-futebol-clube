import * as express from 'express';
import MatchesController from '../controllers/Matches';

const MatchesRouter = express.Router();

MatchesRouter.get(
  '/',
  MatchesController.getAll,
);

export default MatchesRouter;
