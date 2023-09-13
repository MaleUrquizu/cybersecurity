/*import FormLock from "../models/FormModel.js";
import { validationResult } from 'express-validator';
import * as entities from 'html-entities';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.recaptchaSecretKey;

// Crear un formulario
export const createForm = async (req, res) => {
    const { Email, Name, Subject, Message, recaptchaToken } = req.body;
    console.log('Datos recibidos en el servidor:', Email, Name, Subject, Message, recaptchaToken);

    // Validar campos requeridos
    if (!Email || !Name || !Subject || !Message) {
        return res.status(400).json({ message: "Todos los campos son requeridos." });
    }

    try {
        // Verificar reCAPTCHA
        const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
            params: {
                secret: secretKey,
                response: recaptchaToken,
            },
        });

        if (!response.data.success) {
            return res.status(400).json({ message: 'Error de reCAPTCHA' });
        }

        // Resto del código para validar campos, escapar caracteres, etc.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Escapar caracteres
        const escapedEmail = entities.escape(Email);
        const escapedName = entities.escape(Name);
        const escapedSubject = entities.escape(Subject);
        const escapedMessage = entities.escape(Message);

        // Resto del código para crear el formulario en la base de datos
        const form = await FormLock.create({
            Email: escapedEmail,
            Name: escapedName,
            Subject: escapedSubject,
            Message: escapedMessage,
        });

        res.status(201).json(form);
    } catch (error) {
        console.error('Error en el controlador (createForm):', error);
        res.status(500).json({ message: 'Error de validación de reCAPTCHA' });
      }
};


//traer un formulario con su id
export const getFormid = async (req, res) => {
    try {
        const id = req.params.id
        const form = await FormLock.findById(id)
        res.status(200).json(form)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//todos los formularios.
export const getForms = async (req, res) => {
    try {
        const form = await FormLock.find()
        res.status(200).json(form)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//Actualizar el formulario.
export const updateForm = async (req, res) => {
    const { Email, Name, Subject, Message } = req.body

    if (!Email && !Name && !Subject && !Message) {
        return res.status(400).json({ message: "Debe proporcionar al menos un campo para actualizar." });
    }
    try {
        const id = req.params.id
        const form = await FormLock.findByIdAndUpdate({ _id: id }, req.body, { new: true });
        if (!form) {
            return res.status(404).json({ message: "No se encontró el fromulario con el id especificado." });
        }
        res.status(200).json(form);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//borrar
export const deleteform = async (req, res) => {
    try {
        console.log(req.params.id)
        const id = req.params.id
        const form = await FormLock.deleteOne({ _id: id });
        if (!form) {
            res.status(404).json({ message: "No se encontró el fromulario con el id especificado." });
        }
        res.status(200).json({ message: "¡Formulario se ha eliminado correctamente!" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}*/


import FormLock from "../models/FormModel.js";

//Crud (crear, leer, actulizar, borrar)

//crear

export const createForm = async (req, res) =>{
    const {Email, Name, Subject, Message} = req.body
    if (!Email || !Name || !Subject || !Message ){
        return res.status(400).json ({message: "Todos los campos son requeridos."})
    }
    try {
        const form = await FormLock.create(req.body)
        res.status(201).json(form)
        
    } catch (error) {
        res.status(400).json({message: error.message})
    }
};

//traer un formulario con su id
export const getFormid = async (req,res) =>{
    try {
        const id = req.params.id 
        const form =await FormLock.findById(id)
        res.status(200).json(form)
        
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

//todos los formularios.
export const getForms = async (req,res) =>{
    try {
        const form =await FormLock.find()
        res.status(200).json(form)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

//Actualizar el formulario.
export const updateForm = async (req, res) => {
    const {Email, Name, Subject, Message} = req.body

    if(!Email && !Name && !Subject && !Message ) {
        return res.status(400).json({ message: "Debe proporcionar al menos un campo para actualizar." });
    }
    try {
        const id = req.params.id
        const form = await FormLock.findByIdAndUpdate({_id: id}, req.body, {new:true});
        if (!form){
            return res.status(404).json({ message: "No se encontró el fromulario con el id especificado." });
        }
        res.status(200).json(form);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//borrar
export const deleteform = async (req, res) =>{
    try {
        console.log(req.params.id) 
        const id = req.params.id
        const form = await FormLock.deleteOne({_id: id});
         if (!form){
            res.status(404).json({ message: "No se encontró el fromulario con el id especificado." });
         }
         res.status(200).json({ message: "¡Formulario se ha eliminado correctamente!" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}