import ProductCard from '../components/organism/ProductCard.jsx';
import { products } from '../data/products.js';

export default function Catalogo() {
  return (
    <main className="py-5">
      <div className="container">
        <h1 className="text-center mb-4">Catálogo Completo</h1>
        
        <div className="home_productos">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}