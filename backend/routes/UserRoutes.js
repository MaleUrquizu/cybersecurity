import express from 'express';
const UserRoutes = express.Router();
import * as userCtrl from '../controllers/UserController.js';
import { authJwt, verifySingup } from '../middlewares/index.js';


//Todos los usuarios
UserRoutes.get('/', userCtrl.getAllUsers);

export default UserRoutes;
