/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Register/Register.css';

const Register = ({ isOpen, onClose }) => {
  const [datos, setDatos] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
  });

  const [error, setError] = useState('');
  //const [isRegister, setIsRegister] = useState(true);
  const [success, setSuccess] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleInputChange = (e) => {
    let { name, value } = e.target;
    let newDatos = { ...datos, [name]: value };
    setDatos(newDatos);
  };

  const resetState = () => {
    setDatos({
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
    });
    setError('');
    setSuccess('');
    setConfirmPassword("");
  };*/

  /*const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };*/

  /*const handleSubmit = async (e) => {
    console.log("handleSubmit called");
    e.preventDefault();
    if (!e.target.checkValidity()) {
      console.log("no enviar");
      return;
    }

    try {
      let res;
      console.log("Enviando solicitud al servidor...");
      res = await axios.post("http://localhost:8000/auth/register", datos);
      console.log("Respuesta del servidor:", res);
      if (res.status === 200) {
        resetState();
        onClose();
      } else if (res.status === 201) {
        setError('');
        setSuccess(res.data.message);
        setTimeout(() => {
          setSuccess('');
          resetState();
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
        console.log('Datos enviados:', datos);

      } else {
        setError('Error en el registro. Por favor, intenta de nuevo.');
      }
    }
  };


  if (!isOpen) {
    return null;
  }

  return (
    <div className="registro">
      <div className="registro-content">
        <div className="registration">
          <button className="registration-x" onClick={() => {
            resetState();
            onClose();
          }}>
            x
          </button>
          <h2 className="registration">Registro</h2>
        </div>

        <form className='form-register' onSubmit={(e) => handleSubmit(e)}>
          <label className="registros">
            Usuario:
            <input
              type="text"
              name="username"
              value={datos.username}
              onChange={handleInputChange}
              required
            />
          </label>
          <label className="registros">
            Nombre:
            <input
              type="text"
              name="firstName"
              value={datos.firstName}
              onChange={handleInputChange}
              required
            />
          </label>
          <label className="registros">
            Apellido:
            <input
              type="text"
              name="lastName"
              value={datos.lastName}
              onChange={handleInputChange}
              required
            />
          </label>
          <label className="registros">
            Correo electrónico:
            <input
              type="email"
              name="email"
              value={datos.email}
              onChange={handleInputChange}
              required
            />
          </label>
          <label className="registros">
            Contraseña:
            <input
              type="password"
              name="password"
              value={datos.password}
              onChange={handleInputChange}
              required
            />
          </label>
          <label className="registros">
            Confirmar contraseña:
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <button className="create-user-button" type="submit" onClick={handleSubmit}>
            Crear Usuario
          </button>

        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
    </div>
  );
};

export default Register;*/



import React, { useState } from "react";
import axios from "axios";

function Register ({ updateUsersList }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Datos que se envían:", formData);

      const response = await axios.post("http://127.0.0.1:8000/auth/register", formData);
      console.log("Usuario creado:", response.data);
      updateUsersList(response.data);
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      // Puedes mostrar un mensaje de error al usuario aquí.
    }
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div>
          <label>Apellido:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
        <div>
          <label>Nombre de usuario:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Confirmar Contraseña:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Register;





