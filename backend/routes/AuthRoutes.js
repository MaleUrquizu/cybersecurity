import express from 'express';
const authRouter = express.Router();

import * as authCtrl from '../controllers/AuthController.js';
import { verifySingup, validateRegister} from '../middlewares/index.js';


authRouter.post('/register',[verifySingup.checkDuplicateUsernameOrEmail, verifySingup.checkRolesExisted, validateRegister.validateRegister, validateRegister.validate], authCtrl.Register);
authRouter.post('/login', [validateRegister.validateLogin, validateRegister.validate], authCtrl.Login);

export default authRouter;