import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormField from '../components/FormField.jsx';
import useForm from '../hooks/useForm.js';
import { validateEmail, validatePassword } from '../utils/validators.js';

const validate = (v) => {
  const errors = {};
  const email = validateEmail(v.email);
  const password = validatePassword(v.password);
  if (email) errors.email = email;
  if (password) errors.password = password;
  return errors;
};

export default function Login() {
  const [mensaje, setMensaje] = useState(null);
  const { field, handleSubmit, handleCheckboxChange } = useForm(
    { email: '', password: '', recordarme: false },
    validate
  );

  const onSubmit = handleSubmit(
    () => {
      setMensaje({ tipo: 'success', texto: 'Inicio de sesión exitoso.' });
      // Aquí puedes agregar la lógica real de autenticación (fetch al backend, etc.)
    },
    () =>
      setMensaje({
        tipo: 'danger',
        texto: 'Por favor completa correctamente todos los campos obligatorios.',
      })
  );

  return (
    <main>
      <section id="login">
        <h1 className="center">Iniciar Sesión</h1>
        <br />
        <div className="d-flex justify-content-center">
          <div className="card p-4" style={{ width: 350 }}>
            <form onSubmit={onSubmit} noValidate>
              <FormField {...field('email')} label="Correo electrónico" type="email" placeholder="ejemplo@correo.com" />
              <FormField {...field('password')} label="Contraseña" type="password" placeholder="Ingresa tu contraseña" />
              <FormField
                {...field('recordarme')}
                id="recordarme"
                label="Recordarme"
                type="checkbox"
                error=""
                onChange={handleCheckboxChange}
              />

              <div className="mb-3">
                {mensaje && <span className={`text-${mensaje.tipo}`}>{mensaje.texto}</span>}
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-dark">
                  Ingresar
                </button>
              </div>

              <p className="text-center mt-3">
                ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
