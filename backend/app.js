/*import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import './database/db.js'

import FormRouter from './routes/FormRoutes.js';
import authRouter from './routes/AuthRoutes.js';
import UserRoutes from './routes/UserRoutes.js';
import AdminRoutes from './routes/AdminRoutes.js';
import { createRoles } from './libs/initialSetup.js';


const app = express ();
createRoles();

app.use(express.json());
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/form', FormRouter);
app.use('/auth', authRouter);
app.use('/user', UserRoutes)
app.use('/admin', AdminRoutes)


app.listen(8000, () => {
    console.log('Servidor iniciado en el puerto 8000');
});
*/

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import './database/db.js';

import FormRouter from './routes/FormRoutes.js';
import authRouter from './routes/AuthRoutes.js';
import UserRoutes from './routes/UserRoutes.js';
import AdminRoutes from './routes/AdminRoutes.js';
import { createRoles } from './libs/initialSetup.js';
import { authJwt } from './middlewares/index.js';
import limiter from './middlewares/limiter.js';

const app = express();
createRoles();

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Rutas públicas (no requieren autenticación)
app.use('/form', limiter, FormRouter);

// Rutas de inicio de sesión (no aplicar el middleware de autenticación)
app.use('/auth', authRouter);


// Rutas protegidas para usuarios autenticados (requieren autenticación)
app.use('/user', authJwt.verifyToken, UserRoutes);

// Ruta de administrador (requiere autenticación y rol de administrador)
app.use('/admin', [authJwt.verifyToken, authJwt.isAdmin], AdminRoutes);


app.listen(8000, () => {
    console.log('Servidor iniciado en el puerto 8000');
});
