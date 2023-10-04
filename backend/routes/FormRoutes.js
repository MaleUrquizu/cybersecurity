import express from 'express';
import { createForm, deleteform, updateForm, getForms, getFormid } from '../controllers/FormController.js';
import { authJwt } from '../middlewares/index.js';
import limiter from '../middlewares/limiter.js';

const FormRouter = express.Router();


FormRouter.post('/', limiter, createForm);
FormRouter.get('/', getForms)
FormRouter.get('/:id', getForms)
FormRouter.put ('/:id', /*[authJwt.verifyToken, authJwt.isAdmin], */updateForm )
FormRouter.delete ('/:id',/* [authJwt.verifyToken, authJwt.isAdmin],*/ deleteform)

export default FormRouter