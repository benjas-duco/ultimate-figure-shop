import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import FormField from '../components/FormField.jsx';
import useForm from '../hooks/useForm.js';
import {
  validateContactName,
  validateEmail,
  validateContactComment,
} from '../utils/validators.js';

const validate = (v) => {
  const errors = {};
  const nombreError = validateContactName(v.nombre);
  const correoError = validateEmail(v.correo);
  const comentarioError = validateContactComment(v.comentario);

  if (nombreError) errors.nombre = nombreError;
  if (correoError) errors.correo = correoError;
  if (comentarioError) errors.comentario = comentarioError;
  return errors;
};

export default function Contacto() {
  const [estadoEnvio, setEstadoEnvio] = useState(null);

  const { values, field, handleSubmit } = useForm(
    { nombre: '', correo: '', comentario: '' },
    validate
  );

  const comentarioProps = field('comentario');

  const onSubmit = handleSubmit(
    () => {
      const mensajesGuardados = JSON.parse(localStorage.getItem('mensajes_contacto')) || [];
      mensajesGuardados.push({
        id: Date.now(),
        nombre: values.nombre.trim(),
        correo: values.correo.trim(),
        comentario: values.comentario.trim(),
        fecha: new Date().toISOString(),
      });
      localStorage.setItem('mensajes_contacto', JSON.stringify(mensajesGuardados));
      setEstadoEnvio({
        tipo: 'success',
        texto: 'Mensaje enviado correctamente. ¡Gracias por escribirnos!',
      });
    },
    () => {
      setEstadoEnvio({
        tipo: 'danger',
        texto: 'Revisa los campos obligatorios antes de enviar tu mensaje.',
      });
    }
  );

  return (
    <Container className="my-5" style={{ minHeight: '60vh' }}>
      <h1 className="text-center mb-4">Contacto</h1>
      <div className="d-flex justify-content-center">
        <Card className="p-4 shadow-sm" style={{ width: '100%', maxWidth: 550 }}>
          <form onSubmit={onSubmit} noValidate>
            <FormField
              {...field('nombre')}
              label="Nombre completo"
              placeholder="Ingresa tu nombre"
              maxLength={100}
            />

            <FormField
              {...field('correo')}
              label="Correo electrónico"
              type="email"
              placeholder="usuario@duoc.cl / @gmail.com"
              maxLength={100}
            />

            <div className="mb-3">
              <label htmlFor="comentario" className="form-label">
                Comentario
              </label>
              <textarea
                id="comentario"
                name="comentario"
                rows={4}
                maxLength={500}
                placeholder="Escribe tu consulta o mensaje..."
                value={comentarioProps.value}
                onChange={comentarioProps.onChange}
                onBlur={comentarioProps.onBlur}
                className={`form-control ${
                  comentarioProps.showValidation
                    ? comentarioProps.error
                      ? 'is-invalid'
                      : 'is-valid'
                    : ''
                }`}
              />
              {comentarioProps.showValidation && comentarioProps.error && (
                <div className="invalid-feedback">{comentarioProps.error}</div>
              )}
            </div>

            {estadoEnvio && (
              <div className={`alert alert-${estadoEnvio.tipo} py-2`} role="alert">
                {estadoEnvio.texto}
              </div>
            )}

            <div className="d-grid">
              <Button type="submit" variant="dark">
                Enviar mensaje
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Container>
  );
}