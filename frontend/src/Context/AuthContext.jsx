import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRoles, setUserRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    // Función para iniciar sesión
    const login = async (email, password) => {
        try {
            const response = await axios.post("http://localhost:8000/auth/login", {
                email,
                password,
            });

            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem("token", token);

                // Actualizar el estado de autenticación
                setIsAuthenticated(true);

                // Obtener los roles del user desde la respuesta del servidor
                const roles = response.data.roles || [];
                setUserRoles(roles);

                return true; // Inicio de sesión exitoso
            }
        } catch (error) {
            console.error("Error en el inicio de sesión:", error);
            return false; // Inicio de sesión fallido
        }
    };

    // Función para cerrar sesión
    const logout = () => {
        // Eliminar el token del almacenamiento local
        localStorage.removeItem("token");

        // Restablecer el estado de autenticación y roles
        setIsAuthenticated(false);
        setUserRoles([]);
    };

    useEffect(() => {
        // Comprobar si hay un token almacenado en el almacenamiento local
        const token = localStorage.getItem("token");

        if (token) {
            // Si hay un token, puedes considerar al user como autenticado
            setIsAuthenticated(true);
        }

        setLoading(false);
    }, []);

    const contextValue = {
        isAuthenticated,
        userRoles,
        loading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};



/*import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { setToken, deleteToken, getToken, initAxiosInterceptors } from './AuthHelpers.jsx';

// Define el contexto de autenticación
const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // No sabemos si hay un usuario autenticado
    const [cargandoUser, setCargandoUser] = useState(true);

    initAxiosInterceptors();

    useEffect(() => {
        async function cargarUser() {
            if (!getToken()) {
                setCargandoUser(false);
                return;
            }
            try {
                const { data } = await axios.get('http://127.0.0.1:8000/auth/users');
                setUser(data.user);
                setCargandoUser(false);
            } catch (error) {
                console.error('Error al cargar el usuario:', error);
            }
        }
        cargarUser();
    }, []);

    const login = async (email, password) => {
        try {
          const response = await axios.post("http://127.0.0.1:8000/auth/login", {
            email,
            password,
          });
          const { user, token } = response.data;
          setUser(user);
          setToken(token);
          
          return user; // Devuelve el objeto del usuario después de iniciar sesión
        } catch (error) {
          console.error('Error al iniciar sesión:', error);
          throw error;
        }
      };

    function logout() {
        setUser(null);
        deleteToken();
    }

    const contextValue = {
        user,
        cargandoUser,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// Define un hook personalizado para acceder al contexto de autenticación
export const useAuth = () => {
    return useContext(AuthContext);
};*/
