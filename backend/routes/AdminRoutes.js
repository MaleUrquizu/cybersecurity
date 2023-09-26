import express from 'express';
const UserRoutes = express.Router();
import { authJwt } from '../middlewares/index.js';

const AdminRoutes = express.Router();

AdminRoutes.get("/", [authJwt.verifyToken, authJwt.isAdmin], (req, res) => {
    res.send('Bienvenido a la página de administrador');
});

export default AdminRoutes;