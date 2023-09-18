import express from 'express';
const UserRoutes = express.Router();
import { authJwt } from '../middlewares/index.js';

// Ruta para la página de usuario (requiere autenticación)
UserRoutes.get('/', authJwt.verifyToken, (req, res) => {
    // Renderiza la página de usuario o envía la respuesta adecuada
    res.send('Bienvenido a la página de usuario');
});

export default UserRoutes;



