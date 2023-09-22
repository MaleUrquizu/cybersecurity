import React from 'react';
import axios from 'axios';
import '../Logout/Logout.css'

const Logout = () => {
  const handleLogout = async () => {
    try {
      // Envía una solicitud POST al endpoint de logout en tu backend
      await axios.post('http://localhost:8000/auth/logout');

      // Borra el token almacenado en las cookies o en el almacenamiento local del navegador
      // Por ejemplo, si estás utilizando cookies:
      localStorage.removeItem('token');

      // O si estás utilizando el almacenamiento local del navegador:
      // localStorage.removeItem('token');

      // Redirige al usuario a la página de inicio de sesión u otra página deseada
      window.location.href = '/'; // Cambia '/login' por la URL deseada
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <button className='logout' onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
