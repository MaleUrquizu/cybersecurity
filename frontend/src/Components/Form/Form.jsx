/*import React, { useState, useRef } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

const Form = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const captcha = useRef(null);

  const onChange = () => {
    if(captcha.current.getValue()){
    console.log('Es humano');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Valores de los campos:', email, name, subject, message, captcha.current.getValue());

    try {
      const response = await axios.post('http://localhost:8000/form/', {
        email,
        name,
        subject,
        message,
        recaptchaToken: captcha.current.getValue(),
      });
      
      console.log('Server response:', response.data);

      // Reiniciar los campos del formulario
      setEmail('');
      setName('');
      setSubject('');
      setMessage('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Contact Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <div>
          <ReCAPTCHA
            ref={captcha}
            sitekey="6LfPQf8nAAAAAOh61ZTLrXVLudGvOHZZ50kNN05W"
            onChange={onChange}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Form;*/




import React, { useState, useEffect, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
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

  const [formErrors, setFormErrors] = useState({
    Email: '',
    Name: '',
    Subject: '',
    Message: '',
  });

  const captcha = useRef(null);

  const onChange = (token) => {
    setFormData({ ...formData, recaptchaToken: token });
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

    return Object.keys(errors).length === 0; // Si no hay errores, la validación es exitosa
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
        alert('Formulario enviado con éxito');
      } else {
        // Manejar errores de respuesta del servidor si es necesario
        alert('Error al enviar el formulario');
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
    </div>
  );
}

export default Form;
