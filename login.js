// login.js
// Reglas de validación para el formulario de inicio de sesión

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formLogin');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const mensajeLogin = document.getElementById('mensajeLogin');

    // Valida un campo individual y marca/quita el estado de error (rojo)
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

    // Validación en tiempo real: al salir del campo (blur) y al escribir
    [email, password].forEach(campo => {
        campo.addEventListener('blur', () => validarCampo(campo));
        campo.addEventListener('input', () => {
            // Si ya estaba marcado en rojo, revalida mientras el usuario escribe
            if (campo.classList.contains('is-invalid')) {
                validarCampo(campo);
            }
        });
    });

    // Validación al enviar el formulario
    form.addEventListener('submit', (evento) => {
        evento.preventDefault();
        evento.stopPropagation();

        const emailValido = validarCampo(email);
        const passwordValido = validarCampo(password);

        // Clase de Bootstrap que activa los estilos :invalid / .invalid-feedback
        form.classList.add('was-validated');

        if (emailValido && passwordValido) {
            mensajeLogin.textContent = 'Inicio de sesión exitoso.';
            mensajeLogin.className = 'mb-3 text-success';

            // Aquí puedes agregar la lógica real de autenticación
            // form.submit(); o una petición fetch al backend

        } else {
            mensajeLogin.textContent = 'Por favor completa correctamente todos los campos obligatorios.';
            mensajeLogin.className = 'mb-3 text-danger';
        }
    });
});
