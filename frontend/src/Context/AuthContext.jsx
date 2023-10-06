/*import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);*/

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    // Recuperar roles del localStorage al cargar la aplicación
    const storedRoles = JSON.parse(localStorage.getItem('userRoles'));
    if (Array.isArray(storedRoles)) {
      setUserRoles(storedRoles);
    }
  }, []);

  const login = (userData, roles) => {
    setUser(userData);
    // Verifica si roles es un array de strings antes de guardarlo en localStorage
    if (Array.isArray(roles) && roles.every((role) => typeof role === 'string')) {
      setUserRoles(roles);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('userRoles', JSON.stringify(roles)); // Guardar roles en localStorage
    } else {
      // Manejar el caso en que los roles no sean válidos
      console.error('Los roles no son válidos.');
    }
  };

  const logout = () => {
    setUser(null);
    setUserRoles([]); // Limpiar los roles del usuario al cerrar sesión
    localStorage.removeItem('user');
    localStorage.removeItem('userRoles'); // Eliminar roles de localStorage al cerrar sesión
  };

  return (
    <AuthContext.Provider value={{ user, userRoles, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
