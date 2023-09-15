import React, { useState } from 'react';
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
  const [isLogin, setIsLogin] = useState(true);
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
      if (!isLogin && datos.password !== confirmPassword) {
        setError("Las contraseñas no coinciden.");
        return;
      } else if (!isLogin && !validatePassword(datos.password)) {
        setError("La contraseña debe contener al menos 8 caracteres, una letra mayúscula, un número, una letra y un símbolo.");
        return;
      } else if (!isLogin && !validateEmail(datos.email)) {
        setError("Por favor, introduce un correo electrónico válido.");
        return;
      } else {
        try {
          let res;
          if (isLogin) {
            res = await axios.post("http://localhost:8000/user/login", datos);
          } else {
            res = await axios.post("http://localhost:8000/user/register", datos);
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
            setError('Error en el inicio de sesión o registro. Por favor, intenta de nuevo.');
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
          <h2 className="registration">{isLogin ? 'Inicio de sesión' : 'Registro'}</h2>

        </div>
        <form className='form-register' onSubmit={(e) => handleSubmit(e)} >
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
            Contraseña:
            <input
              type="password"
              name="password"
              value={datos.password}
              onChange={handleInputChange}
              required
            />
          </label>
          {!isLogin && (
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
          )}
          {!isLogin && (
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
          )}
          <button className="register-login" type="submit">
            {isLogin ? 'Iniciar sesión' : 'Registrarme'}
          </button>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
        </form>
        <p>
          {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}{' '}
          <button
            className="login-register"
            onClick={() => {
              resetState();
              setIsLogin(!isLogin);
            }}
          >
            {isLogin ? 'Regístrate' : 'Inicia sesión'}
          </button>
        </p>
      </div>
    </div>
  );
};
export default Register;



