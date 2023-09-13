import express from 'express';
/*import { createForm, deleteform, updateForm, getForms, getFormid } from '../controllers/FormController.js';*/
import { createForm } from '../controllers/FormController.js';
import { authJwt } from '../middlewares/index.js';

const FormRouter = express.Router();


FormRouter.post('/', createForm);
/*FormRouter.get('/', getForms)
FormRouter.get('/:id',getFormid )
FormRouter.put ('/:id', [authJwt.verifyToken, authJwt.isAdmin], updateForm )
FormRouter.delete ('/:id', [authJwt.verifyToken, authJwt.isAdmin], deleteform)*/

export default FormRouter