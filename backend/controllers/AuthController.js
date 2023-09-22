import User from "../models/UserModel.js";
import jwt from 'jsonwebtoken';
import config from "../config.js";
import Role from "../models/RoleModel.js";
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

export const Register = async (req, res) => {
    const { firstName, lastName, username, email, password, roles } = req.body;

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            firstName, 
            lastName,
            username,
            email,
            password: hashedPassword
        });

        if (roles) {
            const foundRoles = await Role.find({ name: { $in: roles } });
            newUser.roles = foundRoles.map(role => role.id);
        } else {
            const role = await Role.findOne({ name: "user" });
            newUser.roles = [role.id];
        }

        const savedUser = await newUser.save();

        const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).json({ token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
};
 

// Obtener todos los usuarios
export const GetAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
};

// Obtener un usuario por su ID
export const GetUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

// Actualizar un usuario por su ID
export const UpdateUserById = async (req, res) => {
    const userId = req.params.id;
    const { firstName, lastName, username, email, password, roles } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Actualiza los campos del usuario
        user.firstName = firstName;
        user.lastName = lastName;
        user.username = username;
        user.email = email;

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 12);
            user.password = hashedPassword;
        }

        if (roles) {
            const foundRoles = await Role.find({ name: { $in: roles } });
            user.roles = foundRoles.map(role => role.id);
        }

        await user.save();

        res.status(200).json({ message: 'Usuario actualizado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};

// Eliminar un usuario por su ID
export const DeleteUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        await user.remove();

        res.status(200).json({ message: 'Usuario eliminado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};


//LOGIN

export const Login = async (req, res) => {

    const userFound = await User.findOne({ email: req.body.email }).populate("roles");

    if (!userFound) return res.status(400).json({ message: "Email o contraseña incorrectos" })

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)

    if (!matchPassword) return res.status(401).json({ token: null, message: "Email o contraseña incorrectos" })

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
        expiresIn: 86400
    })

     // Obtén los roles del usuario
     const roles = userFound.roles.map(role => role.name);

     // Incluye los roles en la respuesta
     res.json({ token, roles });

}


//LOGOUT


// authController.js

export const logout = async (req, res) => {
    try {
      // Borra la cookie de sesión (esto es un ejemplo, adapta a tu sistema)
      res.clearCookie('token'); // Si estás utilizando cookies
  
      // O elimina el token del almacenamiento local del navegador (si lo estás utilizando)
      // localStorage.removeItem('token');
  
      res.json({ message: "Sesión cerrada exitosamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al cerrar sesión' });
    }
  };
  
  