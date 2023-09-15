import React, { useState, useEffect } from 'react';
import { EditModalForm, DeleteModalForm, EditModalUser, DeleteModalUser } from '../Components/Modal/Modal';

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


  return (
    <div>
      <h1>ADMIN</h1>
      <div className="form-cards">
        {/* Mostrar formularios */}
        {forms.map((form) => (
          <div key={form._id} className="form-card">
            <h2>{form.Subject}</h2>
            <p><strong>Nombre:</strong> {form.Name}</p>
            <p><strong>Email:</strong> {form.Email}</p>
            <p><strong>Mensaje:</strong> {form.Message}</p>
            <button onClick={() => handleEditForm(form)}>Editar</button>
            <button onClick={() => handleDeleteForm(form._id)}>Borrar</button>
          </div>
        ))}
      </div>

      <div className="user-list">
        {/* Mostrar usuarios con el rol "user" */}
        {users.map((user) => (
          <div key={user._id} className="user-item">
            <h2>{user.username}</h2>
            <p><strong>Nombre:</strong> {user.firstName}</p>
            <p><strong>Apellido:</strong> {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Password:</strong> {user.password}</p>
            <button onClick={() => handleEditUser(user)}>Editar</button>
            <button onClick={() => handleDeleteUser(user._id)}>Borrar</button>
          </div>
        ))}
      </div>

      <EditModalForm
        isOpen={isEditFormModalOpen}
        onClose={() => setIsEditFormModalOpen(false)}
        onSave={(editedData) => handleSaveForm(editFormData._id, editedData)} // Reemplaza handleSaveForm con tu lógica real
        formData={editFormData}
      />
      <DeleteModalForm
        isOpen={isDeleteFormModalOpen}
        onClose={() => setIsDeleteFormModalOpen(false)}
        onDelete={() => handleDeleteForm(deleteFormId)} // Reemplaza handleDeleteForm con tu lógica real
      />

      <EditModalUser
        isOpen={isEditUserModalOpen}
        onClose={() => setIsEditUserModalOpen(false)}
        onSave={(editedUser) => handleSaveUser(editUserData._id, editedUser)} // Reemplaza handleSaveUser con tu lógica real
        userData={editUserData}
      />
      <DeleteModalUser
        isOpen={isDeleteUserModalOpen}
        onClose={() => setIsDeleteUserModalOpen(false)}
        onDelete={() => handleDeleteUser(deleteUserId)} // Reemplaza handleDeleteUser con tu lógica real
      />
    </div>
  );

}

export default Admin;
