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


authRouter.post('/login', [validateRegister.validateLogin, validateRegister.validate], loginLimiter, (req, res, next) => {
    // Verifica si el usuario ha alcanzado el límite de intentos
    if (req.rateLimit.remaining === 0) {
      // El usuario ha excedido el límite de intentos, puedes redirigirlo a una página de error
      return res.status(429).json({ message: 'Demasiados intentos de inicio de sesión. Inténtalo de nuevo más tarde.' });
    }
  
    // Si no ha excedido el límite, continúa con la lógica de inicio de sesión
    authCtrl.Login(req, res, next);
  });
  

authRouter.post('/logout', loginLimiter, authCtrl.logout);


export default authRouter;