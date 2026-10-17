import { useParams, Link } from 'react-router-dom';
import { getProductById, formatPrice } from '../data/products.js';
import NotFound from './NotFound.jsx';
import { useState } from 'react';
import BotonComprar from '../components/atoms/BotonComprar.jsx';
import BotonAgregar from '../components/atoms/BotonAgregar.jsx';
import BotonQuitar from '../components/atoms/BotonQuitar.jsx';

export default function Product() {
  const [cantidad, setCantidad] = useState(0);

  function agregarProducto() {
      setCantidad(cantidad + 1);
  }

    function quitarProducto() {
      setCantidad(cantidad > 0 ? cantidad - 1 : 0 );
  }

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

        <div style = {{display: 'flex', gap: '20px', alignItems: 'center'}}>
          <BotonQuitar
            onClick = {quitarProducto}
          />
          
          <p>
            {cantidad}
          </p>

          <BotonAgregar
            onClick = {agregarProducto}
          />

          <BotonComprar />
        </div>

        <br />
        <Link to="/#productos">← Volver a productos</Link>
        <br />
      </div>
    </main>
  );
}
