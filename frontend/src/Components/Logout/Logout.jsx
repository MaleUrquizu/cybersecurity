import React from 'react';
import axios from 'axios';
import '../Logout/Logout.css'

const Logout = () => {
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/auth/logout');
      localStorage.removeItem('token');

      window.location.href = '/'; 
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <button className='logout' onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
