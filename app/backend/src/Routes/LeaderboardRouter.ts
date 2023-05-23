import express from 'express';
import LeaderboardController from '../controllers/Leaderboard';

const LeaderboardRouter = express.Router();

LeaderboardRouter.get(
  '/home',
  LeaderboardController.getAllStatus,
);

export default LeaderboardRouter;
