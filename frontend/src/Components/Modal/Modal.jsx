import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Ajusta el elemento raíz de tu aplicación

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
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      {/* Contenido del modal de edición */}
      <h1>Editar Formulario</h1>
      <input
        type="text"
        name="Subject"
        value={editedData.Subject}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="Name"
        value={editedData.Name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="Email"
        value={editedData.Email}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="Message"
        value={editedData.Message}
        onChange={handleInputChange}
      />
      <button onClick={handleSave}>Guardar Cambios</button>
    </Modal>
  );
}

function DeleteModalForm({ isOpen, onClose, onDelete }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h1>¿Quieres eliminar el formulario?</h1>
      <button onClick={onDelete}>Confirmar Borrado</button>
    </Modal>
  );
}

function EditModalUser({ isOpen, onClose, onSave, userData }) {
    const [editedUser, setEditedUser] = React.useState(userData || {}); // Si userData es null, se inicializa como un objeto vacío

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
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      {/* Contenido del modal de edición */}
      <h1>Editar Usuario</h1>
      <input
        type="text"
        name="username"
        value={editedUser.username || ''}
        onChange={handleInputChange}
      />
      {/* Agrega más campos de usuario aquí según tus necesidades */}
      <button onClick={handleSave}>Guardar Cambios</button>
    </Modal>
  );
}

function DeleteModalUser({ isOpen, onClose, onDelete }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h1>¿Quieres eliminar al usuario?</h1>
      <button onClick={onDelete}>Confirmar Borrado</button>
    </Modal>
  );
}

export { EditModalForm, DeleteModalForm, EditModalUser, DeleteModalUser };
