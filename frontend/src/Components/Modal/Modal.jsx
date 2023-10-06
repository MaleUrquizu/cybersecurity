import React from 'react';
import Modal from 'react-modal';
import '../Modal/Modal.css'

Modal.setAppElement('#root'); 

function EditModalForm({ isOpen, onClose, onSave, formData }) {
    const [editedData, setEditedData] = React.useState(formData || {});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  const handleSave = () => {
    onSave(editedData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal-custom-style" >
      <h1>Editar Formulario</h1>
      <input
        type="text"
        name="Subject"
        value={editedData.Subject}
        onChange={handleInputChange}
        placeholder="Subject"
      />
      <input
        type="text"
        name="Name"
        value={editedData.Name}
        onChange={handleInputChange}
        placeholder="Name"
      />
      <input
        type="text"
        name="Email"
        value={editedData.Email}
        onChange={handleInputChange}
        placeholder="Email"
      />
      <input
        type="text"
        name="Message"
        value={editedData.Message}
        onChange={handleInputChange}
        placeholder="Message"
      />
      <div>
      <button onClick={handleSave}>Guardar Cambios</button>
      </div>
    </Modal>
  );
}

function DeleteModalForm({ isOpen, onClose, onDelete }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal-custom-style">
      <h1 className='deleteModalForm'>¿Quieres eliminar el formulario?</h1>
      <button onClick={onDelete}>Confirmar Borrado</button>
    </Modal>
  );
}

function EditModalUser({ isOpen, onClose, onSave, userData }) {
    const [editedUser, setEditedUser] = React.useState(userData || {}); 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  const handleSave = () => {
    onSave(editedUser);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal-custom-style" >
      <h1>Editar Usuario</h1>
      <input
        type="text"
        name="username"
        value={editedUser.username || ''}
        onChange={handleInputChange}
        placeholder="Username"
      />
      <input
        type="text"
        name="firstName"
        value={editedUser.firstName}
        onChange={handleInputChange}
        placeholder="FirstName"
      />
      <input
        type="text"
        name="lastName"
        value={editedUser.lastName}
        onChange={handleInputChange}
        placeholder="LastName"
      />
      <input
        type="text"
        name="email"
        value={editedUser.email}
        onChange={handleInputChange}
        placeholder="Email"
      />
      <input
        type="text"
        name="password"
        value={editedUser.password}
        onChange={handleInputChange}
        placeholder="Password"
      />
      <button onClick={handleSave}>Guardar Cambios</button>
    </Modal>
  );
}

function DeleteModalUser({ isOpen, onClose, onDelete }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal-custom-style">
      <h1>¿Quieres eliminar al usuario?</h1>
      <button onClick={onDelete}>Confirmar Borrado</button>
    </Modal>
  );
}

function SuccessModal({ isOpen, onClose, message }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="modal-custom-style">
      <h1>Solicitud exitosa</h1>
      <p>{message}</p>
      <button onClick={onClose}>Cerrar</button>
    </Modal>
  );
}


export { EditModalForm, DeleteModalForm, EditModalUser, DeleteModalUser, SuccessModal };
