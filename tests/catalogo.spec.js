import { products } from "../src/data/products.js";
import { filtrarProductos } from "../src/utils/catalogoUtils.js";

describe("Pruebas unitarias para el filtro real del catalogo", function () {
  it("Deberia retornar todos los productos si la categoria es 'Todos'", function () {
    const resultado = filtrarProductos(products, "Todos");
    expect(resultado.length).toBe(products.length);
  });

  it("Deberia filtrar correctamente solo los productos 'Nendoroid'", function () {
    const resultado = filtrarProductos(products, "Nendoroid");
    const esperado = products.filter((p) => p.category === "Nendoroid").length;
    expect(resultado.length).toBe(esperado);
  });

  it("Deberia filtrar correctamente solo los productos 'POP UP PARADE'", function () {
    const resultado = filtrarProductos(products, "POP UP PARADE");
    const esperado = products.filter((p) => p.category === "POP UP PARADE").length;
    expect(resultado.length).toBe(esperado);
  });

  it("Deberia retornar una lista vacia si se busca una categoria que no existe", function () {
    const resultado = filtrarProductos(products, "No existe");
    expect(resultado).toEqual([]);
    expect(resultado.length).toBe(0);
  });
});