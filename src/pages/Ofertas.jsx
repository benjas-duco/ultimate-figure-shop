import { Link } from 'react-router-dom';
import ProductCard from '../components/organism/ProductCard.jsx';
import { products } from '../data/products.js';
import { filtrarOfertas } from '../utils/catalogoUtils.js';

export default function Ofertas() {
  const ofertas = filtrarOfertas(products);

  return (
    <main>
      <h1 className="center">Ofertas</h1>

      {ofertas.length === 0 ? (
        <div className="center my-5 text-center">
          <p className="text-muted">Actualmente no hay ofertas.</p>
          <Link to="/catalogo" className="btn btn-dark btn-sm">
            Ir al Catálogo
          </Link>
        </div>
      ) : (
        <section className="home_productos">
          {ofertas.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}
    </main>
  );
}