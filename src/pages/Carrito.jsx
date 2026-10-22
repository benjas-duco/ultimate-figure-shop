import { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { formatPrice } from '../data/products.js';

export default function Carrito() {
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem('carrito_compras');
        return saved ? JSON.parse(saved) : [];
    });

    // 1. Corregido: Agregado el operador * para calcular el total
    const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    function actualizarCarrito(nuevoCarrito){
        setCartItems(nuevoCarrito);
        localStorage.setItem('carrito_compras', JSON.stringify(nuevoCarrito));
    }

    function incrementarCantidad(id){
        const actualizado = cartItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        actualizarCarrito(actualizado);
    }

    function decrementarCantidad(id){
        const actualizado = cartItems.map((item) =>
            // 2. Corregido: Agregado - 1 correctamente en la condición
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        actualizarCarrito(actualizado);
    }

    function eliminarProducto(id){
        const actualizado = cartItems.filter((item) =>
            item.id !== id
        );
        actualizarCarrito(actualizado);
    }

    function vaciarCarrito() {
        setCartItems([]);
        // 3. Corregido: removeItem en lugar de setItem vacío
        localStorage.removeItem('carrito_compras');
    }

    return (
        <Container className="my-5" style={{ minHeight: '60vh' }}>
        <h1 className="text-center mb-4">Carrito de Compras</h1>

        {cartItems.length === 0 ? (
            <div className="text-center py-5">
            <p className="fs-4 text-muted mb-3">Tu carrito está vacío.</p>
            <Link to="/" className="btn btn-outline-primary">
                ← Volver al Catálogo
            </Link>
            </div>
        ) : (
            <div>
            <Table responsive bordered align="middle" className="shadow-sm">
                <thead className="table-dark text-center">
                <tr>
                    <th>Producto</th>
                    <th>Precio Unitario</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th>Acción</th>
                </tr>
                </thead>
                <tbody>
                {cartItems.map((item) => (
                    <tr key={item.id}>
                    <td>
                        <div className="d-flex align-items-center gap-3">
                        {item.image && (
                            <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                            />
                        )}
                        <span className="fw-bold">{item.name}</span>
                        </div>
                    </td>
                    <td className="text-center">{formatPrice(item.price)}</td>
                    <td className="text-center">
                        <div className="d-flex justify-content-center align-items-center gap-2">
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => decrementarCantidad(item.id)}
                        >
                            -
                        </Button>
                        <span className="fw-bold px-2">{item.quantity}</span>
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => incrementarCantidad(item.id)}
                        >
                            +
                        </Button>
                        </div>
                    </td>
                    <td className="text-center fw-bold">
                        {formatPrice(item.price * item.quantity)}
                    </td>
                    <td className="text-center">
                        <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => eliminarProducto(item.id)}
                        >
                        Quitar
                        </Button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <div className="d-flex justify-content-between align-items-center mt-4 p-3 bg-light rounded shadow-sm">
                <Button variant="danger" onClick={vaciarCarrito}>
                Vaciar Carrito
                </Button>

                <div className="text-end">
                <h3 className="mb-2">
                    Total: <span className="text-success">{formatPrice(total)}</span>
                </h3>
                <Button
                    variant="success"
                    size="lg"
                    onClick={() => {
                    alert('¡Compra simulada con éxito!');
                    vaciarCarrito();
                    }}
                >
                    Pagar / Finalizar Compra
                </Button>
                </div>
            </div>
            </div>
        )}
        </Container>
    );
}