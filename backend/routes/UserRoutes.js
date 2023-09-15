import express from 'express';
const UserRoutes = express.Router();
import { authJwt, verifySingup } from '../middlewares/index.js';


// Ruta para la página de usuario
UserRoutes.get('/user', (req, res) => {
    // Renderiza la página de usuario o envía la respuesta adecuada
    res.send('Bienvenido a la página de usuario');
});

// Ruta para la página de administrador
UserRoutes.get('/admin', (req, res) => {
    // Renderiza la página de administrador o envía la respuesta adecuada
    res.send('Bienvenido a la página de administrador');
});

export default UserRoutes;

