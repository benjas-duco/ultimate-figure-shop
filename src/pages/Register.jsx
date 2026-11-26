import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FormField from '../components/FormField.jsx';
import useForm from '../hooks/useForm.js';
import { REGIONES_CHILE } from '../data/regiones.js';
import {
  validateRun,
  validateName,
  validateLastName,
  validateEmail,
  validateBirthDate,
  validateRegion,
  validateComuna,
  validateAddress,
  validateUserRole,
  validatePassword,
  validateConfirmPassword,
  validateTerms,
  } from '../utils/validators.js';

const createValidator = (isAdmin) => (v) => {
  const errors = {};
  const checks = {
    run: validateRun(v.run),
    nombre: validateName(v.nombre),
    apellidos: validateLastName(v.apellidos),
    email: validateEmail(v.email),
    fechaNacimiento: validateBirthDate(v.fechaNacimiento),
    region: validateRegion(v.region),
    comuna: validateComuna(v.comuna),
    direccion: validateAddress(v.direccion),
    password: validatePassword(v.password),
    confirmarPassword: validateConfirmPassword(v.confirmarPassword, v.password),
  };

  if (isAdmin) {
    checks.tipoUsuario = validateUserRole(v.tipoUsuario);
  } else {
    checks.terminos = validateTerms(v.terminos);
  }

  Object.entries(checks).forEach(([campo, error]) => {
    if (error) errors[campo] = error;
  });
  return errors;
};

export default function Register({ isAdmin = false }) {
  const [mensaje, setMensaje] = useState(null);

  const defaultValues = {
    run: '',
    nombre: '',
    apellidos: '',
    email: '',
    fechaNacimiento: '',
    region: '',
    comuna: '',
    direccion: '',
    tipoUsuario: 'Cliente',
    password: '',
    confirmarPassword: '',
    terminos: false,
  };

  const storageKey = isAdmin ? 'admin_user_draft' : 'register_data';
  const savedValues = JSON.parse(localStorage.getItem(storageKey)) || defaultValues;

  const { values, field, handleSubmit, handleCheckboxChange, setFieldValue } = useForm(
    savedValues,
    createValidator(isAdmin)
  );

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(values));
  }, [values, storageKey]);

  // Obtener comunas correspondientes a la región seleccionada
  const regionActual = REGIONES_CHILE.find((r) => r.region === values.region);
  const comunasDisponibles = regionActual ? regionActual.comunas : [];

  const handleRegionChange = (e) => {
    const nuevaRegion = e.target.value;
    setFieldValue('region', nuevaRegion);
    setFieldValue('comuna', ''); // Reinicia la comuna al cambiar de región
  };

  const onSubmit = handleSubmit(
    () => {
      setMensaje({
        tipo: 'success',
        texto: isAdmin ? 'Usuario creado correctamente.' : 'Registro exitoso. ¡Bienvenido/a!',
      });
      localStorage.removeItem(storageKey);
    },
    () => {
      setMensaje({
        tipo: 'danger',
        texto: 'Por favor completa correctamente todos los campos obligatorios.',
      });
    }
  );

  // Helpers para los <select> usando el mismo estado de validación de useForm
  const regionProps = field('region');
  const comunaProps = field('comuna');
  const rolProps = field('tipoUsuario');

  return (
    <main>
      <section id="registro" className="container py-4">
        <h1 className="text-center mb-4">
          {isAdmin ? 'Crear Nuevo Usuario' : 'Crear Cuenta'}
        </h1>

        <div className="d-flex justify-content-center">
          <div className="card p-4 shadow-sm" style={{ width: '100%', maxWidth: 650 }}>
            <form onSubmit={onSubmit} noValidate>
              <div className="row">
                <div className="col-md-6">
                  <FormField
                    {...field('run')}
                    label="RUN (sin puntos ni guion)"
                    placeholder="Ej: 19011022K"
                    maxLength={9}
                  />
                </div>
                <div className="col-md-6">
                  <FormField
                    {...field('fechaNacimiento')}
                    label="Fecha de nacimiento (opcional)"
                    type="date"
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <FormField
                    {...field('nombre')}
                    label="Nombre"
                    placeholder="Ingresa tu nombre"
                    maxLength={50}
                  />
                </div>
                <div className="col-md-6">
                  <FormField
                    {...field('apellidos')}
                    label="Apellidos"
                    placeholder="Ingresa tus apellidos"
                    maxLength={100}
                  />
                </div>
              </div>

              <FormField
                {...field('email')}
                label="Correo electrónico"
                type="email"
                placeholder="usuario@duoc.cl / @gmail.com"
                maxLength={100}
              />

              {/* Select dependiente de Región y Comuna */}
              <div className="row mb-3">
                <div className="col-md-6 mb-3 mb-md-0">
                  <label htmlFor="region" className="form-label">Región</label>
                  <select
                    id="region"
                    name="region"
                    value={regionProps.value}
                    onChange={handleRegionChange}
                    onBlur={regionProps.onBlur}
                    className={`form-select ${
                      regionProps.showValidation ? (regionProps.error ? 'is-invalid' : 'is-valid') : ''
                    }`}
                  >
                    <option value="">Selecciona una región...</option>
                    {REGIONES_CHILE.map((item) => (
                      <option key={item.region} value={item.region}>
                        {item.region}
                      </option>
                    ))}
                  </select>
                  {regionProps.showValidation && regionProps.error && (
                    <div className="invalid-feedback">{regionProps.error}</div>
                  )}
                </div>

                <div className="col-md-6">
                  <label htmlFor="comuna" className="form-label">Comuna</label>
                  <select
                    id="comuna"
                    name="comuna"
                    value={comunaProps.value}
                    onChange={comunaProps.onChange}
                    onBlur={comunaProps.onBlur}
                    disabled={!values.region}
                    className={`form-select ${
                      comunaProps.showValidation ? (comunaProps.error ? 'is-invalid' : 'is-valid') : ''
                    }`}
                  >
                    <option value="">
                      {values.region ? 'Selecciona una comuna...' : 'Primero elige una región'}
                    </option>
                    {comunasDisponibles.map((comuna) => (
                      <option key={comuna} value={comuna}>
                        {comuna}
                      </option>
                    ))}
                  </select>
                  {comunaProps.showValidation && comunaProps.error && (
                    <div className="invalid-feedback">{comunaProps.error}</div>
                  )}
                </div>
              </div>

              <FormField
                {...field('direccion')}
                label="Dirección"
                placeholder="Calle, número, depto/casa"
                maxLength={300}
              />

              {isAdmin && (
                <div className="mb-3">
                  <label htmlFor="tipoUsuario" className="form-label">Tipo de usuario</label>
                  <select
                    id="tipoUsuario"
                    name="tipoUsuario"
                    value={rolProps.value}
                    onChange={rolProps.onChange}
                    onBlur={rolProps.onBlur}
                    className={`form-select ${
                      rolProps.showValidation ? (rolProps.error ? 'is-invalid' : 'is-valid') : ''
                    }`}
                  >
                    <option value="Administrador">Administrador</option>
                    <option value="Cliente">Cliente</option>
                    <option value="Vendedor">Vendedor</option>
                  </select>
                  {rolProps.showValidation && rolProps.error && (
                    <div className="invalid-feedback">{rolProps.error}</div>
                  )}
                </div>
              )}

              <div className="row">
                <div className="col-md-6">
                  <FormField
                    {...field('password')}
                    label="Contraseña (4 a 10 caracteres)"
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    maxLength={10}
                  />
                </div>
                <div className="col-md-6">
                  <FormField
                    {...field('confirmarPassword')}
                    label="Confirmar contraseña"
                    type="password"
                    placeholder="Repite tu contraseña"
                    maxLength={10}
                  />
                </div>
              </div>

              {!isAdmin && (
                <FormField
                  {...field('terminos')}
                  label="Acepto los términos y condiciones"
                  type="checkbox"
                  onChange={handleCheckboxChange}
                />
              )}

              {mensaje && (
                <div className={`alert alert-${mensaje.tipo} py-2 mt-2`} role="alert">
                  {mensaje.texto}
                </div>
              )}

              <div className="d-grid mt-3">
                <button type="submit" className="btn btn-dark">
                  {isAdmin ? 'Guardar Usuario' : 'Registrarse'}
                </button>
              </div>

              {!isAdmin && (
                <p className="text-center mt-3 mb-0">
                  ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}