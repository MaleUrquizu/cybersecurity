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


export const Login = async (req, res) => {

    const userFound = await User.findOne({ email: req.body.email }).populate("roles");

    if (!userFound) return res.status(400).json({ message: "User not found" })

    const matchPassword = await User.comparePassword(req.body.password, userFound.password)

    if (!matchPassword) return res.status(401).json({ token: null, message: "email o contraseña incorrectos" })

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
        expiresIn: 86400
    })

    res.json({ token })
}