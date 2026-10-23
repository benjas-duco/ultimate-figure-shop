import { products } from "../src/data/products.js";


describe("Pruebas unitarias de la pagina Carrito", function(){

    function calcularSubtotal(precio, cantidad){
        if(cantidad <= 0) return 0;
        return precio * cantidad
    }

    function calcularTotalCarrito(items){
        return items.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    }

    it("Deberia calcular el subtotal de solo un producto multiplicando precio * cantidad", function(){
        const Figura = products[0] //Primera figura en la lista de products
        const cantidadComprada = 2;

        const subtotal = calcularSubtotal(Figura.price, cantidadComprada);

        //Verificacion del precio
        expect(subtotal).toEqual(Figura.price * 2);
    });

    it("Deberia devolver 0 calculando precio con cantidades 0 o negativos", function(){
        const Figura = products[0]

        expect(calcularSubtotal(Figura.price, 0)).toEqual(0);
        expect(calcularSubtotal(Figura.price, -2)).toEqual(0);
    });

    it("Deberia calcular el total del precio de diferentes figuras en el carrito", function(){
        const Figura = products[0]
        const Figura2 = products[1]
        const carrito = [
            {id:Figura.id, precio: Figura.price, cantidad: 1},
            {id:Figura2.id, precio: Figura2.price, cantidad: 2}
        ];

        const total = calcularTotalCarrito(carrito);
        const totalEsperado = (Figura.price * 1) + (Figura2.price * 2);

        expect(total).toEqual(totalEsperado);
    });
})