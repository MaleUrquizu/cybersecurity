import express from 'express';
const authRouter = express.Router();

import * as authCtrl from '../controllers/AuthController.js';
import { verifySingup, validateRegister , authJwt} from '../middlewares/index.js';
import loginLimiter from '../middlewares/loginLimiter.js';


authRouter.post('/register',[verifySingup.checkDuplicateUsernameOrEmail, verifySingup.checkRolesExisted, validateRegister.validateRegister, validateRegister.validate], /*[authJwt.verifyToken, authJwt.isAdmin],*/ authCtrl.Register);

authRouter.get('/users', authCtrl.GetAllUsers);

authRouter.get('/users/:id', [authJwt.verifyToken, authJwt.isAdmin],  authCtrl.GetUserById);

authRouter.put('/users/:id', [authJwt.verifyToken, authJwt.isAdmin], authCtrl.UpdateUserById);

authRouter.delete('/users/:id', [authJwt.verifyToken, authJwt.isAdmin], authCtrl.DeleteUserById);


authRouter.post('/login', loginLimiter, [validateRegister.validateLogin, validateRegister.validate], authCtrl.Login);

authRouter.post('/logout', authCtrl.logout);


export default authRouter;