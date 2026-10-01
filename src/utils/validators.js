// Reglas de validación reutilizables. Cada una devuelve un mensaje de error o '' si es válido.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (value) =>
  EMAIL_REGEX.test(value.trim()) ? '' : 'Por favor ingresa un correo válido.';

export const validatePassword = (value) =>
  value.length >= 6 ? '' : 'La contraseña debe tener al menos 6 caracteres.';

export const validateName = (value) =>
  value.trim().length >= 3 ? '' : 'Por favor ingresa tu nombre completo (mínimo 3 caracteres).';

export const validateConfirmPassword = (value, password) => {
  if (value.length < 6) return 'La contraseña debe tener al menos 6 caracteres.';
  if (value !== password) return 'Las contraseñas no coinciden.';
  return '';
};

export const validateTerms = (checked) =>
  checked ? '' : 'Debes aceptar los términos y condiciones para continuar.';
