import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import './database/db.js'

import FormRouter from './routes/FormRoutes.js';
import authRouter from './routes/AuthRoutes.js';
import UserRoutes from './routes/UserRoutes.js';
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


app.listen(8000, () => {
    console.log('Servidor iniciado en el puerto 8000');
});


