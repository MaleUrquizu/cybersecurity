import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; 
import { useAuth } from './Context/AuthContext';

import Admin from './Pages/Admin/Admin';
import User from './Pages/User/User';
import { Home } from './Pages/Home/Home';
/*import { useAuth } from './Context/AuthContext.jsx';

const ProtectedRoute = ({ element, isAuthenticated }) => {
    return isAuthenticated ? element : <Navigate to="/" />;
};*/

const AppRouter = () => {
    /*const { isAuthenticated } = useAuth();*/
    const { user } = useAuth();

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route
                path="/admin"
                /*element={<Admin />}*/
                element={user && user.role === 'admin' ? <Admin /> : <Navigate to="/" />}
                /*element={<ProtectedRoute element={<Admin />} isAuthenticated={isAuthenticated} />}*/
            />
            <Route
                path="/user"
                /*element={<User />}*/
                element={user && user.role === 'user' ? <User /> : <Navigate to="/" />}
                /*element={<ProtectedRoute element={<User />} isAuthenticated={isAuthenticated} />}*/
            />
        </Routes>
    );
};

export default AppRouter;

