import express from 'express';
import validateToken from '../middlewares/validateToken';
import validateLogin from '../middlewares/validateLogin';
import LoginController from '../controllers/Login';

const LoginRouter = express.Router();

LoginRouter.post(
  '/',
  validateLogin,
  LoginController.Login,
);

LoginRouter.get(
  '/role',
  validateToken,
  LoginController.getRole,
);

export default LoginRouter;
