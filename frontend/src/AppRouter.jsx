import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; 

import Admin from './Pages/Admin/Admin';
import User from './Pages/User/User';
import { Home } from './Pages/Home/Home';
/*import { useAuth } from './Context/AuthContext.jsx';

const ProtectedRoute = ({ element, isAuthenticated }) => {
    return isAuthenticated ? element : <Navigate to="/" />;
};*/

const AppRouter = () => {
    /*const { isAuthenticated } = useAuth();*/

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route
                path="/admin"
                element={<Admin />}
                /*element={<ProtectedRoute element={<Admin />} isAuthenticated={isAuthenticated} />}*/
            />
            <Route
                path="/user"
                element={<User />}
                /*element={<ProtectedRoute element={<User />} isAuthenticated={isAuthenticated} />}*/
            />
        </Routes>
    );
};

export default AppRouter;

