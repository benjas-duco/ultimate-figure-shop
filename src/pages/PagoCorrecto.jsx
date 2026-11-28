import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { formatPrice } from '../data/products.js';
import { calcularSubtotal } from '../utils/cartUtils.js';

export default function PagoCorrecto() {
  let orden = null;
  try {
    const raw = localStorage.getItem('ultima_orden');
    orden = raw ? JSON.parse(raw) : null;
  } catch {
    orden = null;
  }

  if (!orden) {
    return (
      <main className="my-5 px-3">
        <h1 className="center">Compra Exitosa</h1>
        <div className="center text-center my-4">
          <p className="text-muted">No hay una orden registrada para mostrar.</p>
          <Link to="/catalogo" className="btn btn-dark">
            Volver al Catálogo
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="my-5 px-3">
      <div className="mx-auto r-border border p-4 bg-white shadow-sm" style={{ maxWidth: 850, width: '100%' }}>
        <div className="alert alert-success" role="alert">
          <h1 className="h4 mb-1">¡Compra realizada con éxito!</h1>
          <p className="mb-0">
            Número de orden: <strong>{orden.numeroOrden}</strong> — Fecha: {orden.fecha}
          </p>
        </div>

        <h2 className="h5 mt-4 mb-2">Datos del Cliente y Entrega</h2>
        <p className="mb-3">
          <strong>Cliente:</strong> {orden.cliente.nombre} {orden.cliente.apellidos} ({orden.cliente.correo})
          <br />
          <strong>Dirección:</strong> {orden.entrega.calle}
          {orden.entrega.departamento ? `, ${orden.entrega.departamento}` : ''} — {orden.entrega.comuna},{' '}
          {orden.entrega.region}
          {orden.entrega.indicaciones ? (
            <>
              <br />
              <strong>Indicaciones:</strong> {orden.entrega.indicaciones}
            </>
          ) : null}
        </p>

        <h2 className="h5 mt-4 mb-2">Detalle de Productos</h2>
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

        <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2">
          <h3 className="h5 mb-0">
            Total pagado: <span className="text-success">{formatPrice(orden.total)}</span>
          </h3>
          <Link to="/catalogo" className="btn btn-dark">
            Seguir comprando
          </Link>
        </div>
      </div>
    </main>
  );
}