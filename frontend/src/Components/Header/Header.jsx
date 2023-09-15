import React, { useState } from 'react';
import '../Header/Header.css';
import Login from '../Login/Login.jsx';

export const Header = () => {
    return (
        <div>
            <Menu />
        </div>
    )
}

function Menu() {
    //REGISTER
    const [isModalOpen, setIsModalOpen] = useState(false)


    const handleOpenModal = () => {
        setIsModalOpen(true)
    }


    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    return (
        <div className="header">
            <div className="menu">
                <div className="register">
                    <button className="registro-icon" onClick={handleOpenModal}>Login
                    </button>
                    <Login isOpen={isModalOpen} onClose={handleCloseModal} />
                </div>
            </div>
        </div>
    )
}