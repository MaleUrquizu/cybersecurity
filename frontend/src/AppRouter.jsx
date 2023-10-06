/*import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; 
import { useAuth } from './Context/AuthContext';

import Admin from './Pages/Admin/Admin';
import User from './Pages/User/User';
import { Home } from './Pages/Home/Home';

const AppRouter = () => {
    const { user } = useAuth();

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route
                path="/admin"
                element={user && user.role === 'admin' ? <Admin /> : <Navigate to="/" />}
            />
            <Route
                path="/user"
                element={user && user.role === 'user' ? <User /> : <Navigate to="/" />}
            />
        </Routes>
    );
};

export default AppRouter;
*/

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './Context/AuthContext';

import Admin from './Pages/Admin/Admin';
import User from './Pages/User/User';
import { Home } from './Pages/Home/Home';

const AppRouter = () => {
    const { userRoles } = useAuth();

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route
                path="/admin"
                element={
                    userRoles.includes('admin') ? (
                        <Admin />
                    ) : (
                        userRoles.includes('user') ? (
                            <Navigate to="/user" />
                        ) : (
                            <Navigate to="/" />
                        )
                    )
                }
            />
            <Route
                path="/user"
                element={
                    userRoles.includes('user') ? (
                        <User />
                    ) : (
                        userRoles.includes('admin') ? (
                            <Navigate to="/admin" />
                        ) : (
                            <Navigate to="/" />
                        )
                    )
                }
            />
        </Routes>
    );
};

export default AppRouter;

