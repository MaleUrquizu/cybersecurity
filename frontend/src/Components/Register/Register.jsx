import React, { useState } from "react";
import axios from "axios";
import Modal from 'react-modal';
import '../Register/Register.css'


function Register({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Datos que se envían:", formData);

      const response = await axios.post("http://127.0.0.1:8000/auth/register", formData);
      console.log("Usuario creado:", response.data);

      // Configura el mensaje de confirmación
      setConfirmationMessage("Usuario creado con éxito.");

      // Abre el modal
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      // Puedes mostrar un mensaje de error al usuario aquí.
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetState();
    onClose();
  };


  const resetState = () => {
    setFormData({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="registro-overlay">
      <div className="registro-content">
        <div className="registration">
          <button className="registration-x" onClick={() => {
            resetState();
            onClose();
          }}>
            x
          </button>
          <h2 className="registration">Register</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="registros">Name:</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div>
            <label className="registros">Lastname:</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
          <div>
            <label className="registros">Username:</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />
          </div>
          <div>
            <label className="registros">Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label className="registros">Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div>
            <label className="registros">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button className="create-user-button" type="submit">Registrarse</button>
        </form>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Usuario creado"
        className="modal-custom-style" 
      >
        <h2>{confirmationMessage}</h2>
        <button onClick={closeModal}>Cerrar</button>
      </Modal>
    </div>
  );
}

export default Register;





