import { products } from "../src/data/products.js";
import {
  calcularSubtotal,
  calcularTotalCarrito,
  incrementarItemCantidad,
  decrementarItemCantidad,
  eliminarItemCarrito,
} from "../src/utils/cartUtils.js";

describe("Pruebas unitarias de la logica real del Carrito", function () {
  it("Deberia calcular el subtotal multiplicando price * quantity", function () {
    const figura = products[0];
    const cantidadComprada = 2;

    const subtotal = calcularSubtotal(figura.price, cantidadComprada);
    expect(subtotal).toBe(figura.price * 2);
  });

  it("Deberia devolver 0 con cantidades 0 o negativas", function () {
    const figura = products[0];

    expect(calcularSubtotal(figura.price, 0)).toBe(0);
    expect(calcularSubtotal(figura.price, -2)).toBe(0);
  });

  it("Deberia calcular el total de diferentes figuras en el carrito", function () {
    const figura1 = products[0];
    const figura2 = products[1];
    const carrito = [
      { id: figura1.id, price: figura1.price, quantity: 1 },
      { id: figura2.id, price: figura2.price, quantity: 2 },
    ];

    const total = calcularTotalCarrito(carrito);
    const totalEsperado = figura1.price * 1 + figura2.price * 2;

    expect(total).toBe(totalEsperado);
  });

  it("Deberia incrementar, decrementar sin bajar de 1 y eliminar productos", function () {
    const base = [
      { id: 1, price: 10000, quantity: 1 },
      { id: 2, price: 20000, quantity: 2 },
    ];

    const sumado = incrementarItemCantidad(base, 1);
    expect(sumado[0].quantity).toBe(2);

    const restadoNoMenorA1 = decrementarItemCantidad([{ id: 1, price: 10000, quantity: 1 }], 1);
    expect(restadoNoMenorA1[0].quantity).toBe(1);

    const sinItem2 = eliminarItemCarrito(base, 2);
    expect(sinItem2.length).toBe(1);
    expect(sinItem2[0].id).toBe(1);
  });
});