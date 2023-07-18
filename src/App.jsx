import React, { useState } from 'react';
import TableComponent from './component api/TableComponent';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'message') {
      setMessage(value);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!name) {
      errors.name = 'El nombre es obligatorio';
    }
    if (!email) {
      errors.email = 'El correo electrónico es obligatorio';
    } else if (!isValidEmail(email)) {
      errors.email = 'El correo electrónico no es válido';
    }
    if (!message) {
      errors.message = 'El mensaje es obligatorio';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValidEmail = (email) => {
    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {

      console.log('Nombre:', name);
      console.log('Correo electrónico:', email);
      console.log('Mensaje:', message);

      setName('');
      setEmail('');
      setMessage('');
      setErrors({});
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Nombre:
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
            />
          </label>
          {errors.name && <div>{errors.name}</div>}
        </div>
        <div>
          <label>
            Correo electrónico:
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
          </label>
          {errors.email && <div>{errors.email}</div>}
        </div>
        <div>
          <label>
            Mensaje:
            <textarea
              name="message"
              value={message}
              onChange={handleInputChange}
            ></textarea>
          </label>
          {errors.message && <div>{errors.message}</div>}
        </div>
        <button type="submit">Enviar</button>

      </form>
      <br />
      <div><TableComponent /></div>
    </div>
  );
};

export default ContactForm;
