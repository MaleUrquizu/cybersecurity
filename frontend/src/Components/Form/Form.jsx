import React, { useState, useEffect, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Modal from 'react-modal';
import '../Form/Form.css';

function Form() {
  const [formData, setFormData] = useState({
    Email: '',
    Name: '',
    Subject: '',
    Message: '',
    botField: '', 
    xssField: '',
    recaptchaToken: '', 
  });

  const resetForm = () => {
    setFormData({
      Email: '',
      Name: '',
      Subject: '',
      Message: '',
      botField: '',
      xssField: '',
      recaptchaToken: '',
    });
  };  

  const [formErrors, setFormErrors] = useState({
    Email: '',
    Name: '',
    Subject: '',
    Message: '',
  });
  
  
  const [modalSuccessIsOpen, setModalSuccessIsOpen] = useState(false); 
  const [modalErrorIsOpen, setModalErrorIsOpen] = useState(false); 

  const openSuccessModal = () => {
    setModalSuccessIsOpen(true);
  };

  const closeSuccessModal = () => {
    setModalSuccessIsOpen(false);
  };

  const openErrorModal = () => {
    setModalErrorIsOpen(true);
  };

  const closeErrorModal = () => {
    setModalErrorIsOpen(false);
  };

  const captcha = useRef(null);

  const onChange = (token) => {
    setFormData({ ...formData, recaptchaToken: token });
  };

  const resetCaptcha = () => {
    if (captcha.current) {
      captcha.current.reset(); // Resetea el reCAPTCHA
    }
  };

  const validateFormFields = () => {
    const { Email, Name, Subject, Message } = formData;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    const nameRegex = /^[A-Za-z]+$/;

    const errors = {};

    if (!emailRegex.test(Email) || Email.length > 100) {
      errors.Email = 'Email no válido o demasiado largo (max 100 caracteres)';
    }

    if (!nameRegex.test(Name) || Name.length > 80) {
      errors.Name = 'Nombre no válido o demasiado largo (max 80 caracteres)';
    }

    if (Subject.length > 120) {
      errors.Subject = 'Asunto demasiado largo (max 120 caracteres)';
    }

    if (Message.length > 400) {
      errors.Message = 'Mensaje demasiado largo (max 400 caracteres)';
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0; 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

  
    if (!formData.recaptchaToken) {
      alert('Por favor, complete el captcha antes de enviar el formulario.');
      return;
    }

    // Validar campos ocultos
    if (formData.botField.trim() || formData.xssField.trim()) {
      alert('No es posible enviar el formulario');
      return;
    }

    // Validar campos del formulario
    if (!validateFormFields()) {
      alert('Por favor, complete los campos correctamente.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // El formulario se envió con éxito, puedes redirigir o mostrar un mensaje de éxito
        openSuccessModal();
        resetForm();
        resetCaptcha();
      } else {
        // Manejar errores de respuesta del servidor si es necesario
        openErrorModal();
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };


  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      botField: '',
      xssField: '',
    }));
  }, [setFormData]);
  

  return (
    <div className='content-form'>
    <form className='form' onSubmit={handleSubmit}>
      <input type="hidden" name="bot-field" value={formData.botField} />
      <input type="hidden" name="xss-field" value={formData.xssField} />
      <div className='form-field'>
        <input
          type="email"
          name="Email"
          placeholder="Email"
          maxLength="100"
          value={formData.Email}
          onChange={(e) => setFormData({ ...formData, Email: e.target.value })}
          required
        />
        <span className="error">{formErrors.Email}</span>
      </div>
      <div className='form-field'>
        <input
          type="text"
          name="Name"
          placeholder="Name"
          maxLength="80"
          pattern="[A-Za-z]+"
          value={formData.Name}
          onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
          required
        />
        <span className="error">{formErrors.Name}</span>
      </div>
      <div className='form-field'>
        <input
          type="text"
          name="Subject"
          placeholder="Subject"
          maxLength="120"
          value={formData.Subject}
          onChange={(e) => setFormData({ ...formData, Subject: e.target.value })}
          required
        />
        <span className="error">{formErrors.Subject}</span>
      </div>
      <div className='form-field'>
        <textarea
          name="Message"
          placeholder="Message"
          maxLength="400"
          value={formData.Message}
          onChange={(e) => setFormData({ ...formData, Message: e.target.value })}
          required
        ></textarea>
        <span className="error">{formErrors.Message}</span>
      </div>
      <div className='form-captcha'>
        <ReCAPTCHA
          ref={captcha}
          sitekey="6LfPQf8nAAAAAOh61ZTLrXVLudGvOHZZ50kNN05W"
          onChange={onChange}
        />
      </div>
      <button className='button-form' type="submit">Submit</button>
    </form>
    {/* Modal de éxito */}
    <Modal
        isOpen={modalSuccessIsOpen}
        onRequestClose={closeSuccessModal}
        contentLabel="Formulario Enviado con Éxito"
        className="modal-background"
      >
        <h2>Formulario Enviado con Éxito</h2>
        <p>Tu formulario se ha enviado correctamente.</p>
        <button onClick={closeSuccessModal}>Cerrar</button>
      </Modal>

      {/* Modal de error */}
      <Modal
        isOpen={modalErrorIsOpen}
        onRequestClose={closeErrorModal}
        contentLabel="Error al Enviar el Formulario"
        className="modal-background"
      >
        <h2>Error al Enviar el Formulario</h2>
        <p>Hubo un problema al enviar el formulario.</p>
        <button onClick={closeErrorModal}>Cerrar</button>
      </Modal>
    </div>
  );
}

export default Form;
