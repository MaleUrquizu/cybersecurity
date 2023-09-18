import express from 'express';
const UserRoutes = express.Router();
import { authJwt } from '../middlewares/index.js';

const AdminRoutes = express.Router();

// Ruta para la página de administrador (requiere autenticación y rol de administrador)
AdminRoutes.get("/", [authJwt.verifyToken, authJwt.isAdmin], (req, res) => {
    // Renderiza la página de administrador o envía la respuesta adecuada
    res.send('Bienvenido a la página de administrador');
});

export default AdminRoutes;