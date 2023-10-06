import React, { useState, useEffect } from 'react';
import { EditModalForm, DeleteModalForm, EditModalUser, DeleteModalUser, SuccessModal} from '../../Components/Modal/Modal';
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
  const [successMessage, setSuccessMessage] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/form')
      .then((response) => response.json())
      .then((data) => setForms(data))
      .catch((error) => console.error('Error al obtener formularios:', error));

    fetch('http://localhost:8000/auth/users?role=user')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error al obtener usuarios:', error));
  }, []);

  const token = localStorage.getItem('token');

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

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setIsSuccessModalOpen(true);
  };


  const handleSaveForm = (formId, editedData) => {
    fetch(`http://localhost:8000/form/${formId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(editedData),
    })
      .then((response) => {
        if (response.ok) {
          showSuccessMessage('Formulario editado con éxito.');
          setIsEditFormModalOpen(false); // Cierra el modal de edición
          // Actualiza la lista de formularios después de la edición
          setForms((prevForms) =>
            prevForms.map((form) => (form._id === formId ? { ...form, ...editedData } : form))
          );
        } else {
          console.error('Error al actualizar el formulario');
        }
      })
      .catch((error) => {
        console.error('Error al actualizar el formulario:', error);
      });
  };

  const handleSaveFormDelete = (formId) => {
    fetch(`http://localhost:8000/form/${formId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    })
      .then((response) => {
        if (response.ok) {
          showSuccessMessage('Formulario eliminado con éxito.');
          setIsDeleteFormModalOpen(false); // Cierra el modal de eliminación
          // Actualiza la lista de formularios después de la eliminación
          setForms((prevForms) => prevForms.filter((form) => form._id !== formId));
        } else {
          console.error('Error al eliminar el formulario');
        }
      })
      .catch((error) => {
        console.error('Error al eliminar el formulario:', error);
      });
  };


  const handleSaveUser = (userId, editedUser) => {
    fetch(`http://localhost:8000/auth/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify(editedUser),
    })
      .then((response) => {
        if (response.ok) {
          showSuccessMessage('Usuario editado con éxito.');
          setIsEditUserModalOpen(false); 
          setUsers((prevUsers) =>
          prevUsers.map((user) => (user._id === userId ? { ...user, ...editedUser } : user))
        );
        } else {
          console.error('Error al actualizar el usuario');
        }
      })
      .catch((error) => {
        console.error('Error al actualizar el usuario:', error);
      });
  };

  const handleSaveUserDelete = (userId) => {
    fetch(`http://localhost:8000/auth/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    })
      .then((response) => {
        if (response.ok) {
          showSuccessMessage('Usuario eliminado con éxito.');
          setIsDeleteUserModalOpen(false); 
          setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        } else {
          console.error('Error al eliminar el usuario');
        }
      })
      .catch((error) => {
        console.error('Error al eliminar el usuario:', error);
      });
  };

  
  

  const togglePasswordVisibility = (userId) => {
    setPasswordVisibility((prevVisibility) => ({
      ...prevVisibility,
      [userId]: !prevVisibility[userId],
    }));
  };

  

  return (
    <div>
      <div className='button-logout-register'>
        <HeaderRegister /> 
        <Logout />
      </div>
      <div>
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
          onDelete={() => handleSaveFormDelete(deleteFormId)}
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
          onDelete={() => handleSaveUserDelete(deleteUserId)}
        />
      </div>
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        message={successMessage}
      />

    </div>
  );
}

export default Admin;


