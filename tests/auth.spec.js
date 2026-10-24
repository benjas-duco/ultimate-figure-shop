import { validateEmail, validatePassword, validateName, validateConfirmPassword, validateTerms } from "../src/utils/validators.js";

describe("Pruebas unitarias para los validadores de autenticacion", function(){
    it("validateEmail deberia retornar nada si el correo es correcto y un mensaje si es incorrecto", function(){
        // Correo correcto no devuelve nada
        expect(validateEmail("usuario@gmail.com")).toEqual('');
        // Correo incorrecto si devuelve algo
        expect(validateEmail("correo-invalido")).not.toEqual('');
    });

    it("validatePassword deberia exigir almenos 8 caracteres", function(){
        // Contraseña correcta no devuelve nada
        expect(validatePassword("secreto123")).toEqual('');
        // Contraseña incorrecta si devuelve algo
        expect(validatePassword("1234567")).not.toEqual('');
    });

    it("validateName deberia exigir al menos 3 caracteres", function(){
        expect(validateName("Luis")).toEqual('');
        expect(validateName("Lu")).not.toEqual('');
    });

    it("validateConfirmPassword deberia validar que la contraseñas coincidan", function(){
        const contrasenaReal = "prueba123";

        expect(validateConfirmPassword("prueba123", contrasenaReal)).toEqual('');
        expect(validateConfirmPassword("constraseña-invalida", contrasenaReal)).not.toEqual('');
    });

    it("validateTerms deberia exigir que los terminos sean True", function(){
        expect(validateTerms(true)).toEqual('');
        expect(validateTerms(false)).not.toEqual('');
    });
})
