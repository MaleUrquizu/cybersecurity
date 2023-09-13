import React from 'react';
import { Home } from './Pages/Home';
import { Routes, Route } from 'react-router-dom';

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} /> 
        </Routes>
    );
};
