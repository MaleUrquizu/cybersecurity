import React, { useState } from 'react';
import '../Header/Header.css';
import Register from '../Register/Register.jsx'

export const HeaderRegister = () => {
    return (
        <div>
            <MenuRegister />
        </div>
    )
}

function MenuRegister() {
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
                    <button className="registro-icon" onClick={handleOpenModal}>Register
                    </button>
                    <Register isOpen={isModalOpen} onClose={handleCloseModal} />
                </div>
            </div>
        </div>
    )
}