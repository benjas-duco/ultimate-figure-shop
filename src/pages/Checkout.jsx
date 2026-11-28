import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import * as regionesModulo from '../data/regiones.js';
import { formatPrice } from '../data/products.js';
import { calcularSubtotal, calcularTotalCarrito } from '../utils/cartUtils.js';

const REGIONES_BASE =
  regionesModulo.regiones ||
  regionesModulo.default || [
    {
      nombre: 'Región Metropolitana de Santiago',
      comunas: ['Santiago', 'San Ramón', 'Cerrillos', 'Maipú', 'Ñuñoa'],
    },
    {
      nombre: 'Región de La Araucanía',
      comunas: ['Temuco', 'Lautaro', 'Villarrica', 'Pucón'],
    },
  ];

function leerUsuario() {
  try {
    const raw =
      localStorage.getItem('usuario_actual') ||
      localStorage.getItem('sesion_activa') ||
      localStorage.getItem('currentUser');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function Checkout() {
  const navigate = useNavigate();
  const usuario = leerUsuario();

  const cartItems = (() => {
    try {
      return JSON.parse(localStorage.getItem('carrito_compras') || '[]');
    } catch {
      return [];
    }
  })();

  const [form, setForm] = useState({
    nombre: usuario?.nombre || '',
    apellidos: usuario?.apellidos || '',
    correo: usuario?.correo || usuario?.email || '',
    calle: usuario?.direccion || usuario?.calle || '',
    departamento: usuario?.departamento || '',
    region: usuario?.region || REGIONES_BASE[0]?.nombre || '',
    comuna: usuario?.comuna || REGIONES_BASE[0]?.comunas?.[0] || '',
    indicaciones: '',
    simularError: false,
  });

  const [error, setError] = useState('');

  const regionActual = REGIONES_BASE.find((r) => (r.nombre || r) === form.region);
  const comunas = regionActual?.comunas || [];
  const total = calcularTotalCarrito(cartItems);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    if (name === 'region') {
      const reg = REGIONES_BASE.find((r) => (r.nombre || r) === value);
      setForm((prev) => ({
        ...prev,
        region: value,
        comuna: reg?.comunas?.[0] || '',
      }));
      return;
    }
    setForm((prev) => ({ ...prev, [name]: val }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.apellidos.trim() || !form.correo.trim() || !form.calle.trim()) {
      setError('Completa nombre, apellidos, correo y calle.');
      return;
    }
    setError('');

    const orden = {
      numeroOrden: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      fecha: new Date().toLocaleString('es-CL'),
      cliente: {
        nombre: form.nombre.trim(),
        apellidos: form.apellidos.trim(),
        correo: form.correo.trim(),
      },
      entrega: {
        calle: form.calle.trim(),
        departamento: form.departamento.trim(),
        region: form.region,
        comuna: form.comuna,
        indicaciones: form.indicaciones.trim(),
      },
      items: cartItems,
      total,
    };

    localStorage.setItem('ultima_orden', JSON.stringify(orden));

    if (form.simularError) {
      navigate('/pago-error');
    } else {
      localStorage.removeItem('carrito_compras');
      navigate('/pago-correcto');
    }
  };

  if (cartItems.length === 0) {
    return (
      <main className="my-5 px-3">
        <h1 className="center">Checkout</h1>
        <div className="center text-center my-4">
          <p className="text-muted">Tu carrito está vacío.</p>
          <Link to="/catalogo" className="btn btn-dark">
            Ir al Catálogo
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="my-5 px-3">
      <h1 className="center mb-4">Finalizar Compra</h1>

      <div className="mx-auto" style={{ maxWidth: 850, width: '100%' }}>
        <div className="r-border border p-4 mb-4 bg-white shadow-sm">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="h5 mb-0">Resumen del Carrito</h2>
            <span className="badge bg-dark fs-6">Total: {formatPrice(total)}</span>
          </div>

          <Table responsive bordered align="middle" className="mb-0">
            <thead className="table-dark">
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{formatPrice(item.price)}</td>
                  <td>{item.quantity}</td>
                  <td>{formatPrice(calcularSubtotal(item.price, item.quantity))}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <form onSubmit={onSubmit} className="r-border border p-4 bg-white shadow-sm" noValidate>
          <h2 className="h5 mb-3">Información del Cliente y Entrega</h2>

          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="nombre" className="form-label">Nombre *</label>
              <input id="nombre" name="nombre" type="text" className="form-control" value={form.nombre} onChange={onChange} />
            </div>

            <div className="col-md-6">
              <label htmlFor="apellidos" className="form-label">Apellidos *</label>
              <input id="apellidos" name="apellidos" type="text" className="form-control" value={form.apellidos} onChange={onChange} />
            </div>

            <div className="col-12">
              <label htmlFor="correo" className="form-label">Correo *</label>
              <input id="correo" name="correo" type="email" className="form-control" value={form.correo} onChange={onChange} />
            </div>

            <div className="col-md-8">
              <label htmlFor="calle" className="form-label">Calle *</label>
              <input id="calle" name="calle" type="text" className="form-control" value={form.calle} onChange={onChange} />
            </div>

            <div className="col-md-4">
              <label htmlFor="departamento" className="form-label">Departamento (opcional)</label>
              <input id="departamento" name="departamento" type="text" className="form-control" value={form.departamento} onChange={onChange} />
            </div>

            <div className="col-md-6">
              <label htmlFor="region" className="form-label">Región *</label>
              <select id="region" name="region" className="form-select" value={form.region} onChange={onChange}>
                {REGIONES_BASE.map((r, i) => {
                  const nom = r.nombre || r;
                  return <option key={i} value={nom}>{nom}</option>;
                })}
              </select>
            </div>

            <div className="col-md-6">
              <label htmlFor="comuna" className="form-label">Comuna *</label>
              <select id="comuna" name="comuna" className="form-select" value={form.comuna} onChange={onChange}>
                {comunas.map((c, i) => {
                  const com = c.nombre || c;
                  return <option key={i} value={com}>{com}</option>;
                })}
              </select>
            </div>

            <div className="col-12">
              <label htmlFor="indicaciones" className="form-label">Indicaciones (opcional)</label>
              <textarea id="indicaciones" name="indicaciones" rows={2} className="form-control" value={form.indicaciones} onChange={onChange} />
            </div>

            <div className="col-12">
              <div className="form-check">
                <input id="simularError" name="simularError" type="checkbox" className="form-check-input" checked={form.simularError} onChange={onChange} />
                <label htmlFor="simularError" className="form-check-label text-muted">
                  Simular error en el pago
                </label>
              </div>
            </div>
          </div>

          {error && <div className="alert alert-danger mt-3 mb-0">{error}</div>}

          <div className="d-flex justify-content-between align-items-center mt-4 flex-wrap gap-2">
            <Link to="/carrito" className="btn btn-outline-secondary">← Volver al Carrito</Link>
            <Button type="submit" variant="success">Pagar ahora {formatPrice(total)}</Button>
          </div>
        </form>
      </div>
    </main>
  );
}