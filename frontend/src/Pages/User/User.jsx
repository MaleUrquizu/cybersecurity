import React, { useState, useEffect } from 'react';
import Logout from '../../Components/Logout/Logout';
import '../User/User.css';


function User() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    
    fetch('http://localhost:8000/form') 
      .then((response) => response.json())
      .then((data) => setForms(data))
      .catch((error) => console.error('Error al obtener formularios:', error));
  }, []);

  return (
    
    <div>
      <div className="logout-user">
       <Logout /> 
      </div>
      <h1 className='title-user'>Formuarios de contacto recibidos</h1>
      <div className="form-cards">
        {forms.map((form) => (
          <div key={form._id} className="form-card">
            <h2>{form.Subject}</h2>
            <p><strong>Nombre:</strong> {form.Name}</p>
            <p><strong>Email:</strong> {form.Email}</p>
            <p><strong>Mensaje:</strong> {form.Message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default User;
