import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/organism/ProductCard.jsx';
import { products } from '../data/products.js';

export default function Catalogo() {
  const [busqueda, setBusqueda] = useState('');

  const productosFiltrados = products.filter((product) =>
    product.name.toLowerCase().includes(busqueda.trim().toLowerCase())
  );

  return (
    <main>
      <h1 className="center">Catálogo Completo</h1>

      <div className="d-flex justify-content-center flex-wrap gap-2 mb-3">
        <Link to="/categorias" className="btn btn-outline-dark btn-sm">
          Ver por Categorías
        </Link>
        <Link to="/ofertas" className="btn btn-outline-dark btn-sm">
          Ver Ofertas
        </Link>
      </div>

      <div className="d-flex justify-content-center mb-4 px-3">
        <input
          type="search"
          className="form-control"
          style={{ maxWidth: 400 }}
          placeholder="Buscar figura por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {productosFiltrados.length === 0 ? (
        <p className="center text-muted my-4">
          No se encontraron figuras que coincidan con "{busqueda}".
        </p>
      ) : (
        <div className="home_productos">
          {productosFiltrados.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}