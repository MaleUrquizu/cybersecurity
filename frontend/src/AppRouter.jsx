import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; 

import Admin from './Pages/Admin/Admin';
import User from './Pages/User/User';
import { Home } from './Pages/Home/Home';
import { useAuth } from './Context/AuthContext';

const ProtectedRoute = ({ element, isAuthenticated }) => {
    return isAuthenticated ? element : <Navigate to="/" />;
};

const AppRouter = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route
                path="/admin"
                element={<ProtectedRoute element={<Admin />} isAuthenticated={isAuthenticated} />}
            />
            <Route
                path="/user"
                element={<ProtectedRoute element={<User />} isAuthenticated={isAuthenticated} />}
            />
        </Routes>
    );
};

export default AppRouter;

