import { Link } from 'react-router-dom';
import { formatPrice } from '../data/products.js';

export default function ProductCard({ product }) {
  return (
    <div style={{ width: 300, marginInline: 10 }}>
      <h2 className="center">{product.name}</h2>
      <div className="image_container">
        <Link to={`/figure/${product.id}`}>
          <img src={product.image} alt={product.name} width="300" />
        </Link>
      </div>
      <p>{product.description}</p>
      <p>
        <strong>Precio: {formatPrice(product.price)}</strong>
      </p>
    </div>
  );
}
