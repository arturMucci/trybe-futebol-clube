import express from 'express';
import LeaderboardController from '../controllers/Leaderboard';

const LeaderboardRouter = express.Router();

LeaderboardRouter.get(
  '/home',
  LeaderboardController.getAllHomeStatus,
);

LeaderboardRouter.get(
  '/away',
  LeaderboardController.getAllAwayStatus,
);

export default LeaderboardRouter;
