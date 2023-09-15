import express from 'express';
const authRouter = express.Router();

import * as authCtrl from '../controllers/AuthController.js';
import { verifySingup, validateRegister} from '../middlewares/index.js';


authRouter.post('/register',[verifySingup.checkDuplicateUsernameOrEmail, verifySingup.checkRolesExisted, validateRegister.validateRegister, validateRegister.validate], authCtrl.Register);

// Ruta para obtener todos los usuarios
authRouter.get('/users', authCtrl.GetAllUsers);

// Ruta para obtener un usuario por su ID
authRouter.get('/users/:id', authCtrl.GetUserById);

// Ruta para actualizar un usuario por su ID
authRouter.put('/users/:id', authCtrl.UpdateUserById);

// Ruta para eliminar un usuario por su ID
authRouter.delete('/users/:id', authCtrl.DeleteUserById);


authRouter.post('/login', [validateRegister.validateLogin, validateRegister.validate], authCtrl.Login);


export default authRouter;