import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { formatPrice } from '../data/products.js';
import { calcularSubtotal } from '../utils/cartUtils.js';

export default function PagoError() {
  let orden = null;
  try {
    const raw = localStorage.getItem('ultima_orden');
    orden = raw ? JSON.parse(raw) : null;
  } catch {
    orden = null;
  }

  return (
    <main className="my-5 px-3">
      <div className="mx-auto r-border border p-4 bg-white shadow-sm" style={{ maxWidth: 850, width: '100%' }}>
        <div className="alert alert-danger" role="alert">
          <h1 className="h4 mb-1">No se pudo realizar el pago</h1>
          <p className="mb-0">
            {orden
              ? `Intento de orden #${orden.numeroOrden}. Tu carrito sigue disponible para reintentar.`
              : 'Ocurrió un inconveniente al procesar el pago.'}
          </p>
        </div>

        {orden && (
          <>
            <h2 className="h5 mt-4 mb-2">Resumen del Intento</h2>
            <p className="mb-3">
              <strong>Cliente:</strong> {orden.cliente.nombre} {orden.cliente.apellidos} ({orden.cliente.correo})
              <br />
              <strong>Dirección:</strong> {orden.entrega.calle}
              {orden.entrega.departamento ? `, ${orden.entrega.departamento}` : ''} — {orden.entrega.comuna},{' '}
              {orden.entrega.region}
            </p>

            <Table responsive bordered align="middle">
              <thead className="table-dark">
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {orden.items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{formatPrice(item.price)}</td>
                    <td>{item.quantity}</td>
                    <td>{formatPrice(calcularSubtotal(item.price, item.quantity))}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <p className="fw-bold">Total: {formatPrice(orden.total)}</p>
          </>
        )}

        <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
          <Link to="/carrito" className="btn btn-outline-dark">
            Volver al Carrito
          </Link>
          <Link to="/checkout" className="btn btn-success">
            Volver a intentar el pago
          </Link>
        </div>
      </div>
    </main>
  );
}