import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Login/Login.css';

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
            console.log('Redirigiendo a /admin');
            navigate('/admin');
          } else if (res.data.roles && res.data.roles.includes('user')) {
            console.log('Redirigiendo a /user');
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
    <div className="login">
      <div className="login-content">
        <div className="close">
          <button className="close-x" onClick={() => {
            resetState();
            onClose();
          }}>
            x
          </button>
          </div>
          <h2 className="title-login"> Inicio de sesión</h2>
        <form className='form-login' onSubmit={(e) => handleSubmit(e)} >
          <label className="register-login">
            Correo electrónico:
            <input
              type="email"
              name="email"
              value={datos.email}
              onChange={handleInputChange}
              required
            />
          </label>
          <label className="register-login">
            Contraseña:
            <input
              type="password"
              name="password"
              value={datos.password}
              onChange={handleInputChange}
              required
            />
          </label>
          <button className="login-button" type="submit">
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


/*import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import '../Register/Register.css';

  const Login = ({ isOpen, onClose }) => {
    const { login } = useAuth(); // Obtiene la función de inicio de sesión del contexto
    const navigate = useNavigate();
  
    const [datos, setDatos] = useState({
      email: "",
      password: ""
    });
  
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
  
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
        console.log("No enviar el formulario porque hay campos inválidos");
      } else {
        try {
          const { user } = await login(datos.email, datos.password); // Inicia sesión y obtiene el usuario
    
          // Verifica el rol del usuario y redirige según corresponda
          if (user.roles && user.roles.includes('admin')) {
            // Redirige al panel de administrador si el usuario es un admin
            navigate('/admin');
          } else if (user.roles && user.roles.includes('user')) {
            // Redirige a la página de usuario si el usuario es un usuario normal
            navigate('/user');
          } else {
            // Maneja el caso en el que el rol no está definido o no contiene 'admin' ni 'user'
            console.error('Roles no definidos o no válidos en la respuesta del servidor.');
          }
    
          // Resto del código para manejar el resultado de la autenticación
          // Por ejemplo, mostrar mensajes de éxito o error
          setSuccess('Inicio de sesión exitoso');
          setTimeout(() => {
            resetState();
            onClose();
          }, 2000); // Redirige o cierra el formulario después de 2 segundos
    
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

export default Login;*/
