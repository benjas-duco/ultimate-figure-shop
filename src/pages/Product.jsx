import { useParams, Link } from 'react-router-dom';
import { getProductById, formatPrice } from '../data/products.js';
import NotFound from './NotFound.jsx';
import { useState, useEffect   } from 'react';
import BotonComprar from '../components/atoms/BotonComprar.jsx';
import BotonAgregar from '../components/atoms/BotonAgregar.jsx';
import BotonQuitar from '../components/atoms/BotonQuitar.jsx';

export default function Product() {
  const { id } = useParams();
  const product = getProductById(id);
  const storageKey = `cantidad_producto_${id}`;

  const [cantidad, setCantidad] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved != null ? Number(saved) : 0;
  });

  useEffect(() =>{
    localStorage.setItem(storageKey, cantidad);
  }, [storageKey, cantidad]);

  function agregarProducto() {
      setCantidad(cantidad + 1);
  }

    function quitarProducto() {
      setCantidad(cantidad > 0 ? cantidad - 1 : 0 );
  }

  if (!product) return <NotFound />;

  return (
    <main className="product_main">
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: '50px',
          width: '100%',
          maxWidth: '1100px',
          margin: '0 auto'
        }}
      >
        <div className="product_image_container" style={{ flexShrink: 0 }}>
          <img src={product.image} alt={product.name} />
        </div>

        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', maxWidth: '500px'}}>
          <h1>
            {product.name}
          </h1>

          <p>
            {product.description}
          </p>

          <h3 style={{ marginBottom: '20px' }}>
            Precio: {formatPrice(product.price)}
            {product.preorder && (
              <>
                <br />
                Orden anticipada
              </>
            )}
          </h3>

          <div style={{display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '25px'}}>
            <BotonQuitar 
              onClick={quitarProducto} 
            />

            <p>
              {cantidad}
            </p>

            <BotonAgregar 
              onClick={agregarProducto} 
            />

            <BotonComprar />
          </div>
          <Link to="/#productos">
            ← Volver a productos
          </Link>
        </div>
      </div>
    </main>
  );
}
