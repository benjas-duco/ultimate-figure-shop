import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../components/organism/ProductCard.jsx';
import { products } from '../data/products.js';
import { obtenerCategorias, filtrarProductos } from '../utils/catalogoUtils.js';

export default function Categorias() {
  const { categoria } = useParams();
  const categoriaActual = categoria ? decodeURIComponent(categoria) : null;

  const categorias = useMemo(() => obtenerCategorias(products), []);
  const primeraCategoria = categorias[0] || 'Nendoroid';

  return (
    <main>
      <h1 className="center">
        {categoriaActual ? `Categoría: ${categoriaActual}` : 'Categorías'}
      </h1>

      <div className="d-flex justify-content-center flex-wrap gap-2 my-3">
        <Link
          to={`/categorias/${encodeURIComponent(primeraCategoria)}`}
          className="btn btn-outline-dark btn-sm"
        >
          Categoría #1 ({primeraCategoria})
        </Link>
        {categorias.map((cat) => (
          <Link
            key={cat}
            to={`/categorias/${encodeURIComponent(cat)}`}
            className={`btn btn-sm ${
              categoriaActual === cat ? 'btn-dark' : 'btn-outline-dark'
            }`}
          >
            {cat}
          </Link>
        ))}
        {categoriaActual && (
          <Link to="/categorias" className="btn btn-secondary btn-sm">
            Todas
          </Link>
        )}
      </div>

      {categoriaActual ? (
        <section className="home_productos">
          {filtrarProductos(products, categoriaActual).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      ) : (
        categorias.map((cat) => (
          <section key={cat} className="mb-4">
            <h2 className="center h4 mt-3">{cat}</h2>
            <div className="home_productos">
              {filtrarProductos(products, cat).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        ))
      )}
    </main>
  );
}