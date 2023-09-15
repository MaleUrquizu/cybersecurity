import React from 'react';
import { Home } from './Pages/Home';
import { Routes, Route } from 'react-router-dom';
import Admin from './Pages/Admin';
import User from './Pages/User';

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/admin" element={<Admin />} /> 
            <Route path="/user" element={<User />} /> 
        </Routes>
    );
};
