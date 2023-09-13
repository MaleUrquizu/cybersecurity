import React, { useState } from 'react';

import Register from '../Register/Register.jsx'
import '../Header/Header.css';

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
                    <Register isOpen={isModalOpen} onClose={handleCloseModal} />
                </div>
                
            </div>

        </div>
    )
}