import { useParams, Link } from 'react-router-dom';
import { getProductById, formatPrice } from '../data/products.js';
import NotFound from './NotFound.jsx';

export default function Product() {
  const { id } = useParams();
  const product = getProductById(id);

  if (!product) return <NotFound />;

  return (
    <main style={{ width: 'fit-content', marginInline: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <h1>{product.name}</h1>
        <br />
        <div className="image_container">
          <img src={product.image} alt={product.name} width="300" />
        </div>
        <br />
        <p>{product.description}</p>
        <h3 className="text-center">
          Precio: {formatPrice(product.price)}
          {product.preorder && (
            <>
              <br />
              Orden anticipada
            </>
          )}
        </h3>
        <br />
        <button type="button" className="btn btn-success btn-lg">
          Comprar
        </button>
        <br />
        <Link to="/#productos">← Volver a productos</Link>
        <br />
      </div>
    </main>
  );
}
