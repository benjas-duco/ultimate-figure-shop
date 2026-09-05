// register.js
// Reglas de validación para el formulario de registro de usuario

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formRegistro');
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmarPassword = document.getElementById('confirmarPassword');
    const terminos = document.getElementById('terminos');
    const feedbackConfirmar = document.getElementById('feedbackConfirmar');
    const mensajeRegistro = document.getElementById('mensajeRegistro');

    // Valida un campo individual usando las reglas nativas del HTML (required, minlength, type)
    function validarCampo(campo) {
        if (!campo.checkValidity()) {
            campo.classList.add('is-invalid');
            campo.classList.remove('is-valid');
            return false;
        } else {
            campo.classList.remove('is-invalid');
            campo.classList.add('is-valid');
            return true;
        }
    }

    // Valida que ambas contraseñas coincidan
    function validarConfirmacion() {
        const passwordValida = validarCampo(password);
        const coincide = password.value === confirmarPassword.value && confirmarPassword.value !== '';

        if (!confirmarPassword.checkValidity() || !coincide) {
            confirmarPassword.classList.add('is-invalid');
            confirmarPassword.classList.remove('is-valid');

            // Mensaje distinto según el motivo del error
            feedbackConfirmar.textContent = !confirmarPassword.checkValidity()
                ? 'La contraseña debe tener al menos 6 caracteres.'
                : 'Las contraseñas no coinciden.';

            return false;
        } else {
            confirmarPassword.classList.remove('is-invalid');
            confirmarPassword.classList.add('is-valid');
            return true && passwordValida;
        }
    }

    // Valida el checkbox de términos y condiciones
    function validarTerminos() {
        if (!terminos.checked) {
            terminos.classList.add('is-invalid');
            terminos.classList.remove('is-valid');
            return false;
        } else {
            terminos.classList.remove('is-invalid');
            terminos.classList.add('is-valid');
            return true;
        }
    }

    // Validación en tiempo real para los campos de texto
    [nombre, email, password].forEach(campo => {
        campo.addEventListener('blur', () => validarCampo(campo));
        campo.addEventListener('input', () => {
            if (campo.classList.contains('is-invalid')) {
                validarCampo(campo);
            }
            // Si cambia la contraseña, revalida también la confirmación
            if (campo === password && confirmarPassword.value !== '') {
                validarConfirmacion();
            }
        });
    });

    // Validación en tiempo real para la confirmación de contraseña
    confirmarPassword.addEventListener('blur', validarConfirmacion);
    confirmarPassword.addEventListener('input', () => {
        if (confirmarPassword.classList.contains('is-invalid')) {
            validarConfirmacion();
        }
    });

    // Validación en tiempo real para el checkbox de términos
    terminos.addEventListener('change', validarTerminos);

    // Validación al enviar el formulario
    form.addEventListener('submit', (evento) => {
        evento.preventDefault();
        evento.stopPropagation();

        const nombreValido = validarCampo(nombre);
        const emailValido = validarCampo(email);
        const confirmacionValida = validarConfirmacion();
        const terminosValidos = validarTerminos();

        form.classList.add('was-validated');

        if (nombreValido && emailValido && confirmacionValida && terminosValidos) {
            mensajeRegistro.textContent = 'Registro exitoso. ¡Bienvenido/a!';
            mensajeRegistro.className = 'mb-3 text-success';

            // Aquí puedes agregar la lógica real de registro
            // form.submit(); o una petición fetch al backend

        } else {
            mensajeRegistro.textContent = 'Por favor completa correctamente todos los campos obligatorios.';
            mensajeRegistro.className = 'mb-3 text-danger';
        }
    });
});
