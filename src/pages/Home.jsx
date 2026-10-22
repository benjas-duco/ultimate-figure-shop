import ProductCard from '../components/organism/ProductCard.jsx';
import { products } from '../data/products.js';

export default function Home() {
  return (
    <main>
      <section id="productos">
        <h1 className="center">Productos destacados</h1>
        <br />
        <div className='home_banner'>
          <div className="home_banner_gallery">
            <img src="./imagenes/HatsuneMiku.webp" alt="Figura 1" />
            <img src="./imagenes/MarinKitagawaS2_Nendoroid.webp" alt="Figura 2" />
          </div>
        </div>
        <br />
        <h1 className="leftext">Populares</h1>
        <div className="home_productos">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
