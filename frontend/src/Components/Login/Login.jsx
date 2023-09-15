import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Register/Register.css';

const Login = ({ isOpen, onClose }) => {
  const [datos, setDatos] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    let newDatos = { ...datos, [name]: value };
    setDatos(newDatos);
  };

  const resetState = () => {
    setDatos({
      email: "",
      password: "",
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      console.log("no enviar");
    } else {
      try {
        let res;
        res = await axios.post("http://localhost:8000/auth/login", datos);
        if (res.status === 200) {
          localStorage.setItem("token", res.data.token);
  
          // Verifica si la propiedad roles existe en la respuesta
          if (res.data.roles && res.data.roles.includes('admin')) {
            navigate('/admin');
          } else if (res.data.roles && res.data.roles.includes('user')) {
            navigate('/user');
          } else {
            // Maneja el caso en el que roles no está definido o no contiene 'admin' ni 'user'
            console.error('Roles no definidos o no válidos en la respuesta del servidor.');
          }
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
          setError('Error en el inicio de sesión. Por favor, intenta de nuevo.');
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
          <h2 className="registration"> Inicio de sesión</h2>
        </div>
        <form className='form-register' onSubmit={(e) => handleSubmit(e)} >
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
          <button className="register-login" type="submit">
            Iniciar sesión
          </button>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
