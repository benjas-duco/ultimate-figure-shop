import {
  validateEmail,
  validatePassword,
  validateName,
  validateConfirmPassword,
  validateTerms,
} from "../src/utils/validators.js";

describe("Pruebas unitarias para los validadores de autenticacion", function () {
  it("validateEmail deberia aceptar dominios permitidos y rechazar otros", function () {
    expect(validateEmail("usuario@gmail.com")).toBe("");
    expect(validateEmail("alumno@duoc.cl")).toBe("");
    expect(validateEmail("docente@profesor.duoc.cl")).toBe("");
    expect(validateEmail("correo-invalido")).not.toBe("");
    expect(validateEmail("usuario@hotmail.com")).not.toBe("");
  });

  it("validatePassword deberia exigir entre 4 y 10 caracteres", function () {
    expect(validatePassword("1234")).toBe("");
    expect(validatePassword("1234567")).toBe("");
    expect(validatePassword("1234567890")).toBe("");
    expect(validatePassword("123")).not.toBe("");
    expect(validatePassword("12345678901")).not.toBe("");
  });

  it("validateName deberia exigir nombre no vacio y de maximo 50 caracteres", function () {
    expect(validateName("Luis")).toBe("");
    expect(validateName("Lu")).toBe("");
    expect(validateName("")).not.toBe("");
    expect(validateName("   ")).not.toBe("");
    expect(validateName("a".repeat(51))).not.toBe("");
  });

  it("validateConfirmPassword deberia validar que las contraseñas coincidan", function () {
    const contrasenaReal = "prueba123";

    expect(validateConfirmPassword("prueba123", contrasenaReal)).toBe("");
    expect(validateConfirmPassword("otra-clave", contrasenaReal)).not.toBe("");
  });

  it("validateTerms deberia exigir que los terminos sean True", function () {
    expect(validateTerms(true)).toBe("");
    expect(validateTerms(false)).not.toBe("");
  });
});