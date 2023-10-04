import express from 'express';
const authRouter = express.Router();

import * as authCtrl from '../controllers/AuthController.js';
import { verifySingup, validateRegister , authJwt} from '../middlewares/index.js';
import loginLimiter from '../middlewares/loginLimiter.js';


authRouter.post('/register',[verifySingup.checkDuplicateUsernameOrEmail, verifySingup.checkRolesExisted, validateRegister.validateRegister, validateRegister.validate], /*[authJwt.verifyToken, authJwt.isAdmin],*/ authCtrl.Register);

// Ruta para obtener todos los usuarios
authRouter.get('/users', authCtrl.GetAllUsers);

// Ruta para obtener un usuario por su ID
authRouter.get('/users/:id', /*[authJwt.verifyToken, authJwt.isAdmin], */ authCtrl.GetUserById);

// Ruta para actualizar un usuario por su ID
authRouter.put('/users/:id', /*[authJwt.verifyToken, authJwt.isAdmin],*/ authCtrl.UpdateUserById);

// Ruta para eliminar un usuario por su ID
authRouter.delete('/users/:id',/* [authJwt.verifyToken, authJwt.isAdmin],*/ authCtrl.DeleteUserById);


authRouter.post('/login', loginLimiter, [validateRegister.validateLogin, validateRegister.validate], authCtrl.Login);
  

authRouter.post('/logout', authCtrl.logout);


export default authRouter;