import { useState } from 'react';

/**
 * Manejo de formularios controlados con validación.
 * - initialValues: valores iniciales { campo: valor }
 * - validate(values): devuelve { campo: 'mensaje de error' } (solo los campos con error)
 *
 * Un error se muestra cuando el campo fue "tocado" (blur) o ya se intentó enviar el formulario.
 */
export default function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const errors = validate(values);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setValues((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  // Un checkbox no dispara blur de forma fiable al marcarlo, así que se marca como tocado al cambiar
  const handleCheckboxChange = (e) => {
    handleChange(e);
    handleBlur(e);
  };

  const handleSubmit = (onValid, onInvalid) => (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (Object.keys(errors).length === 0) onValid?.(values);
    else onInvalid?.(errors);
  };

  // Props listos para esparcir en <FormField />
  const field = (name) => ({
    name,
    id: name,
    value: values[name],
    checked: values[name],
    error: errors[name] || '',
    showValidation: Boolean(touched[name] || submitted),
    onChange: handleChange,
    onBlur: handleBlur,
  });

  return { values, errors, field, handleSubmit, handleCheckboxChange };
}
