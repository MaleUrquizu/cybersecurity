
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';
import dotenv from 'dotenv';


 dotenv.config(); // Carga las variables de entorno desde el archivo .env


 // Get all users
 console.log(process.env.JWT_SECRET);


export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
 