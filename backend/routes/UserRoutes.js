import express from 'express';
const UserRoutes = express.Router();
import { authJwt } from '../middlewares/index.js';

UserRoutes.get('/', authJwt.verifyToken, (req, res) => {
    res.send('Bienvenido a la página de usuario');
});

export default UserRoutes;



