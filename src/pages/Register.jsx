import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import FormField from '../components/FormField.jsx';
import useForm from '../hooks/useForm.js';
import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateTerms,
} from '../utils/validators.js';

const validate = (v) => {
  const errors = {};
  const checks = {
    nombre: validateName(v.nombre),
    email: validateEmail(v.email),
    password: validatePassword(v.password),
    confirmarPassword: validateConfirmPassword(v.confirmarPassword, v.password),
    terminos: validateTerms(v.terminos),
  };
  Object.entries(checks).forEach(([campo, error]) => {
    if (error) errors[campo] = error;
  });
  return errors;
};

export default function Register() {
  const [mensaje, setMensaje] = useState(null);

  const savedValues = JSON.parse(localStorage.getItem('register_data')) || {
    nombre: '',
    email: '',
    password: '',
    confirmarPassword: '',
    terminos: false
  };

  const { values, field, handleSubmit, handleCheckboxChange } = useForm(
    savedValues,
    validate
  );

  useEffect(() => {
    localStorage.setItem('register_data', JSON.stringify(values));
  }, [values]);

  const onSubmit = handleSubmit(
    () => {
      setMensaje({ tipo: 'success', texto: 'Registro exitoso. ¡Bienvenido/a!' });
      localStorage.removeItem('register_data');
    },
    () => {
      setMensaje({
        tipo: 'danger',
        texto: 'Por favor completa correctamente todos los campos obligatorios.',
      });
    }
  );

  return (
    <main>
      <section id="registro" style={{ width: '100%' }}>
        <h1 className="center">Crear Cuenta</h1>
        <br />
        <div className="d-flex justify-content-center">
          <div className="card p-4" style={{ width: 350 }}>
            <form onSubmit={onSubmit} noValidate>
              <FormField {...field('nombre')} label="Nombre completo" placeholder="Ingresa tu nombre" />
              <FormField {...field('email')} label="Correo electrónico" type="email" placeholder="ejemplo@correo.com" />
              <FormField {...field('password')} label="Contraseña" type="password" placeholder="Ingresa tu contraseña" />
              <FormField
                {...field('confirmarPassword')}
                label="Confirmar contraseña"
                type="password"
                placeholder="Repite tu contraseña"
              />
              <FormField
                {...field('terminos')}
                label="Acepto los términos y condiciones"
                type="checkbox"
                onChange={handleCheckboxChange}
              />

              <div className="mb-3">
                {mensaje && <span className={`text-${mensaje.tipo}`}>{mensaje.texto}</span>}
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-dark">
                  Registrarse
                </button>
              </div>

              <p className="text-center mt-3">
                ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
