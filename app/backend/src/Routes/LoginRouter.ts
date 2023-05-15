import * as express from 'express';
import validateToken from '../middlewares/validateToken';
import validateLogin from '../middlewares/validateLogin';
import LoginController from '../controllers/Login';

const LoginRouter = express.Router();

LoginRouter.get(
  '/role',
  validateToken,
  LoginController.getRole,
);

LoginRouter.post(
  '/',
  validateLogin,
  LoginController.Login,
);

export default LoginRouter;
