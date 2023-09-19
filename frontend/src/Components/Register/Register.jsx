import React, { useState, useEffect } from 'react';
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
  const [isRegister, setIsRegister] = useState(true);
  const [success, setSuccess] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verificar si el token tiene el rol de administrador (ajusta la lógica según tu estructura de token)
      const roles = token.roles; // Aquí asumimos que el token contiene información sobre roles
      if (roles && roles.includes('admin')) {
        setIsAdmin(true);
      }
    }
  }, []);

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
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      console.log("no enviar");
    } else {
      if (!isAdmin) {
        console.error('No tienes permisos para registrar usuarios.');
        return;
      } else if (!isRegister && datos.password !== confirmPassword) {
        setError("Las contraseñas no coinciden.");
        return;
      } else if (!isRegister && !validatePassword(datos.password)) {
        setError("La contraseña debe contener al menos 8 caracteres, una letra mayúscula, un número, una letra y un símbolo.");
        return;
      } else if (!isRegister && !validateEmail(datos.email)) {
        setError("Por favor, introduce un correo electrónico válido.");
        return;
      } else {
        try {
          let res;
          if (isRegister) {
            res = await axios.post("http://localhost:8000/auth/register", datos);
          }
          console.log(res.data);
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
          } else {
            setError('Error en el registro. Por favor, intenta de nuevo.');
          }
        }
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
        {isAdmin ? (
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
          </form>
        ) : (
          <p>No tienes permisos para registrar usuarios.</p>
        )}
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
    </div>
  );
};

export default Register;




