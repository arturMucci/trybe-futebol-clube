import * as express from 'express';
import TeamsController from '../controllers/Teams';

const TeamsRouter = express.Router();

TeamsRouter.get(
  '/',
  TeamsController.getAll,
);

TeamsRouter.get(
  '/:id',
  TeamsController.getById,
);

export default TeamsRouter;
