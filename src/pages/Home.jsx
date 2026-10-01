import ProductCard from '../components/ProductCard.jsx';
import { products } from '../data/products.js';

export default function Home() {
  return (
    <main>
      <section id="productos">
        <h1 className="center">Productos destacados</h1>
        <br />
        <div className="d-flex center">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
