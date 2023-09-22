import React, { useState, useEffect } from 'react';
import { EditModalForm, DeleteModalForm, EditModalUser, DeleteModalUser } from '../../Components/Modal/Modal';
import '../Admin/Admin.css'
import { HeaderRegister } from '../../Components/Header/HeaderRegister.jsx';
import Logout from '../../Components/Logout/Logout.jsx';

function Admin() {
  const [forms, setForms] = useState([]);
  const [users, setUsers] = useState([]);
  const [isEditFormModalOpen, setIsEditFormModalOpen] = useState(false);
  const [isDeleteFormModalOpen, setIsDeleteFormModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const [deleteFormId, setDeleteFormId] = useState(null);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);
  const [editUserData, setEditUserData] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [showUserList, setShowUserList] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState({});

  useEffect(() => {
    // Obtener formularios
    fetch('http://localhost:8000/form')
      .then((response) => response.json())
      .then((data) => setForms(data))
      .catch((error) => console.error('Error al obtener formularios:', error));

    // Obtener usuarios con el rol "user"
    fetch('http://localhost:8000/auth/users?role=user')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error al obtener usuarios:', error));
  }, []);

  const handleEditForm = (form) => {
    setIsEditFormModalOpen(true);
    setEditFormData(form);
  };

  const handleDeleteForm = (formId) => {
    setIsDeleteFormModalOpen(true);
    setDeleteFormId(formId);
  };

  const handleEditUser = (user) => {
    setIsEditUserModalOpen(true);
    setEditUserData(user);
  };

  const handleDeleteUser = (userId) => {
    setIsDeleteUserModalOpen(true);
    setDeleteUserId(userId);
  };

  const handleSaveForm = (formId, editedData) => {
    // Realiza una solicitud HTTP para actualizar el formulario en la base de datos
    fetch(`http://localhost:8000/form/${formId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedData),
    })
      .then((response) => {
        if (response.ok) {
          // Actualización exitosa, puedes realizar alguna acción adicional si es necesario
        } else {
          // Manejo de errores en caso de que la actualización falle
          console.error('Error al actualizar el formulario');
        }
      })
      .catch((error) => {
        console.error('Error al actualizar el formulario:', error);
      });
  };

  const handleSaveUser = (userId, editedUser) => {
    // Realiza una solicitud HTTP para actualizar el usuario en la base de datos
    fetch(`http://localhost:8000/auth/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedUser),
    })
      .then((response) => {
        if (response.ok) {
          // Actualización exitosa, puedes realizar alguna acción adicional si es necesario
        } else {
          // Manejo de errores en caso de que la actualización falle
          console.error('Error al actualizar el usuario');
        }
      })
      .catch((error) => {
        console.error('Error al actualizar el usuario:', error);
      });
  };

  const togglePasswordVisibility = (userId) => {
    // Cambia la visibilidad de la contraseña para el usuario específico
    setPasswordVisibility((prevVisibility) => ({
      ...prevVisibility,
      [userId]: !prevVisibility[userId],
    }));
  };

  return (
    <div>
      <div>
        <Logout />
      </div>
      <div>
        <HeaderRegister />
      </div>
      <div className="button-form-users">
        <button onClick={() => setShowUserList(!showUserList)}>
          Mostrar {showUserList ? 'Formularios' : 'Usuarios'}
        </button>
      </div>
      <div className="form-cards">
        {showUserList ? (
          users && users.length > 0 ? (
            users.map((user) => (
              <div key={user._id} className="user-item">
                <h2>{user.username}</h2>
                <p><strong>Nombre:</strong> {user.firstName}</p>
                <p><strong>Apellido:</strong> {user.lastName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p className="password">
                  <strong>Password:</strong>
                  {passwordVisibility[user._id] ? user.password : '••••••••••'}
                </p>
                <button onClick={() => handleEditUser(user)}>Editar</button>
                <button onClick={() => handleDeleteUser(user._id)}>Borrar</button>
                <button onClick={() => togglePasswordVisibility(user._id)}>
                  {passwordVisibility[user._id] ? 'Ocultar Contraseña' : 'Mostrar Contraseña'}
                </button>
              </div>

            ))
          ) : (
            <p>No hay usuarios disponibles.</p>
          )
        ) : (
          forms.map((form) => (
            <div key={form._id} className="form-card">
              <h2>{form.Subject}</h2>
              <p><strong>Nombre:</strong> {form.Name}</p>
              <p><strong>Email:</strong> {form.Email}</p>
              <p><strong>Mensaje:</strong> {form.Message}</p>
              <button onClick={() => handleEditForm(form)}>Editar</button>
              <button onClick={() => handleDeleteForm(form._id)}>Borrar</button>
            </div>
          ))
        )}
      </div>

      <EditModalForm
        isOpen={isEditFormModalOpen}
        onClose={() => setIsEditFormModalOpen(false)}
        onSave={(editedData) => handleSaveForm(editFormData._id, editedData)}
        formData={editFormData}
      />
      <DeleteModalForm
        isOpen={isDeleteFormModalOpen}
        onClose={() => setIsDeleteFormModalOpen(false)}
        onDelete={() => handleDeleteForm(deleteFormId)}
      />

      <EditModalUser
        isOpen={isEditUserModalOpen}
        onClose={() => setIsEditUserModalOpen(false)}
        onSave={(editedUser) => handleSaveUser(editUserData._id, editedUser)}
        userData={editUserData}
      />
      <DeleteModalUser
        isOpen={isDeleteUserModalOpen}
        onClose={() => setIsDeleteUserModalOpen(false)}
        onDelete={() => handleDeleteUser(deleteUserId)}
      />
    </div>
  );
}

export default Admin;


