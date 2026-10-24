import { products } from "../src/data/products.js";

describe("Pruebas unitarias para el filtro de catalogo", function(){
    function filtrarProductos(productos, categoria){
        if(categoria === 'Todos'){
            return productos;
        }
        return productos.filter(p => p.category === categoria);
    }

    it("Deberia retornar todos los productos si la categoria es 'Todos'", function(){
        const resultado = filtrarProductos(products, 'Todos');

        // Comprueba que devuelva todos los productos
        expect(resultado.length).toEqual(products.length);
    });

    it("Deberia filtrar correctamente solo los productos 'Nendoroid'", function(){
        const resultado = filtrarProductos(products, 'Nendoroid');
        // Filtro para solo tomar Nendoroids
        const resultadoEsperado = products.filter(p => p.category === 'Nendoroid').length;

        expect(resultado.length).toEqual(resultadoEsperado);
    });

    it("Deberia filtrar correctamente solo los productos 'POP UP PARADE'", function(){
        const resultado = filtrarProductos(products, 'POP UP PARADE');
        // Filtro para tomar solo POP UP PARADE
        const resultadoEsperado = products.filter(p => p.category === 'POP UP PARADE').length;

        expect(resultado.length).toEqual(resultadoEsperado);
    });

    it("Deberia retornar una lista vacia si se busca una categoria que no existe", function(){
        const resultado = filtrarProductos(products, 'No existe');

        expect(resultado).toEqual([]);
        expect(resultado.length).toEqual(0)
    });
})