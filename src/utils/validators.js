// Reglas de validación reutilizables. Cada una devuelve un mensaje de error o '' si es válido.

// Dominios permitidos: @duoc.cl, @profesor.duoc.cl o @gmail.com
const ALLOWED_EMAIL_REGEX = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

// --- 1. VALIDACIONES DE USUARIO / LOGIN / REGISTRO ---

export const validateRun = (value) => {
  const cleanRun = String(value || '').trim().toUpperCase();
  if (!cleanRun) return 'El RUN es obligatorio.';
  
  // Validar que no tenga puntos ni guion y tenga entre 7 y 9 caracteres (cuerpo + DV)
  if (!/^[0-9]{6,8}[0-9K]$/.test(cleanRun)) {
    return 'El RUN debe tener entre 7 y 9 caracteres, sin puntos ni guion (ej: 19011022K).';
  }

  const body = cleanRun.slice(0, -1);
  const dv = cleanRun.slice(-1);

  // Cálculo del dígito verificador (Módulo 11)
  let sum = 0;
  let multiplier = 2;

  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i], 10) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const remainder = 11 - (sum % 11);
  let expectedDv = '';
  if (remainder === 11) expectedDv = '0';
  else if (remainder === 10) expectedDv = 'K';
  else expectedDv = String(remainder);

  return dv === expectedDv ? '' : 'El RUN ingresado no es válido (dígito verificador incorrecto).';
};

export const validateEmail = (value) => {
  const trimmed = String(value || '').trim();
  if (!trimmed) return 'El correo es obligatorio.';
  if (trimmed.length > 100) return 'El correo no puede superar los 100 caracteres.';
  return ALLOWED_EMAIL_REGEX.test(trimmed)
    ? ''
    : 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.';
};

export const validatePassword = (value) => {
  const val = String(value || '');
  if (val.length < 4 || val.length > 10) {
    return 'La contraseña debe tener entre 4 y 10 caracteres.';
  }
  return '';
};

export const validateConfirmPassword = (value, password) => {
  const val = String(value || '');
  if (val.length < 4 || val.length > 10) {
    return 'La contraseña debe tener entre 4 y 10 caracteres.';
  }
  if (val !== password) return 'Las contraseñas no coinciden.';
  return '';
};

// Mantenemos validateName por retrocompatibilidad si algún componente antiguo lo usa
export const validateName = (value) => {
  const trimmed = String(value || '').trim();
  if (!trimmed) return 'El nombre es obligatorio.';
  if (trimmed.length > 50) return 'El nombre no puede superar los 50 caracteres.';
  return '';
};

export const validateLastName = (value) => {
  const trimmed = String(value || '').trim();
  if (!trimmed) return 'Los apellidos son obligatorios.';
  if (trimmed.length > 100) return 'Los apellidos no pueden superar los 100 caracteres.';
  return '';
};

export const validateBirthDate = (value) => {
  if (!value) return ''; // Es opcional
  const date = new Date(value);
  if (isNaN(date.getTime())) return 'Fecha de nacimiento inválida.';
  if (date > new Date()) return 'La fecha de nacimiento no puede ser futura.';
  return '';
};

export const validateRegion = (value) => {
  return String(value || '').trim() ? '' : 'Debes seleccionar una región.';
};

export const validateComuna = (value) => {
  return String(value || '').trim() ? '' : 'Debes seleccionar una comuna.';
};

export const validateAddress = (value) => {
  const trimmed = String(value || '').trim();
  if (!trimmed) return 'La dirección es obligatoria.';
  if (trimmed.length > 300) return 'La dirección no puede superar los 300 caracteres.';
  return '';
};

export const validateUserRole = (value) => {
  const validRoles = ['Administrador', 'Cliente', 'Vendedor'];
  return validRoles.includes(value) ? '' : 'Debes seleccionar un tipo de usuario válido.';
};

export const validateTerms = (checked) =>
  checked ? '' : 'Debes aceptar los términos y condiciones para continuar.';


// --- 2. VALIDACIONES DE CONTACTO ---

export const validateContactName = (value) => {
  const trimmed = String(value || '').trim();
  if (!trimmed) return 'El nombre es obligatorio.';
  if (trimmed.length > 100) return 'El nombre no puede superar los 100 caracteres.';
  return '';
};

export const validateContactComment = (value) => {
  const trimmed = String(value || '').trim();
  if (!trimmed) return 'El comentario es obligatorio.';
  if (trimmed.length > 500) return 'El comentario no puede superar los 500 caracteres.';
  return '';
};


// --- 3. VALIDACIONES DE PRODUCTO (ADMIN) ---

export const validateProductCode = (value) => {
  const trimmed = String(value || '').trim();
  if (!trimmed) return 'El código del producto es obligatorio.';
  if (trimmed.length < 3) return 'El código debe tener al menos 3 caracteres.';
  return '';
};

export const validateProductName = (value) => {
  const trimmed = String(value || '').trim();
  if (!trimmed) return 'El nombre del producto es obligatorio.';
  if (trimmed.length > 100) return 'El nombre no puede superar los 100 caracteres.';
  return '';
};

export const validateProductDescription = (value) => {
  const trimmed = String(value || '').trim();
  if (trimmed.length > 500) return 'La descripción no puede superar los 500 caracteres.';
  return ''; // Es opcional
};

export const validateProductPrice = (value) => {
  if (value === '' || value === null || value === undefined) {
    return 'El precio es obligatorio.';
  }
  const num = Number(value);
  if (isNaN(num) || num < 0) {
    return 'El precio debe ser un número mayor o igual a 0.';
  }
  return '';
};

export const validateProductStock = (value) => {
  if (value === '' || value === null || value === undefined) {
    return 'El stock es obligatorio.';
  }
  const num = Number(value);
  if (!Number.isInteger(num) || num < 0) {
    return 'El stock debe ser un número entero mayor o igual a 0.';
  }
  return '';
};

export const validateProductCriticalStock = (value) => {
  if (value === '' || value === null || value === undefined) {
    return ''; // Es opcional
  }
  const num = Number(value);
  if (!Number.isInteger(num) || num < 0) {
    return 'El stock crítico debe ser un número entero mayor o igual a 0.';
  }
  return '';
};

export const validateProductCategory = (value) => {
  return String(value || '').trim() ? '' : 'Debes seleccionar una categoría.';
};

export const validateProductImage = (value) => {
  if (!value || !String(value).trim()) return ''; // Es opcional
  return '';
};