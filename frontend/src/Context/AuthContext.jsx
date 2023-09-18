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

                // Obtener los roles del usuario desde la respuesta del servidor
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
            // Si hay un token, puedes considerar al usuario como autenticado
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
