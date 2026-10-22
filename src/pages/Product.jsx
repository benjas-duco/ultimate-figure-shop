import { useParams, Link } from 'react-router-dom';
import { getProductById, formatPrice } from '../data/products.js';
import NotFound from './NotFound.jsx';
import { useState, useEffect   } from 'react';
import BotonAgregar from '../components/atoms/BotonAgregar.jsx';
import BotonQuitar from '../components/atoms/BotonQuitar.jsx';
import BotonAgregarCarrito from '../components/atoms/BotonAgregarCarrito.jsx';

export default function Product() {
  const { id } = useParams();
  const product = getProductById(id);
  const storageKey = `cantidad_producto_${id}`;

  const [cantidad, setCantidad] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved != null ? Number(saved) : 1;
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


  function handleAgregarAlCarrito(){
    const cantidadAComprar = cantidad <= 0 ? 1 : cantidad;
    const carritoActual = JSON.parse(localStorage.getItem('carrito_compras')) || [];
    const verifExistente = carritoActual.findIndex(item => item.id === product.id);

    if(verifExistente !== -1){
      carritoActual[verifExistente].quantity += cantidadAComprar;
      console.log("El producto ya existía, nueva cantidad acumulada:", carritoActual[verifExistente].quantity);
    } else {
      const nuevoItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: cantidadAComprar
      };
      carritoActual.push(nuevoItem);
      console.log("Producto nuevo agregado al arreglo:", nuevoItem);
    }

    localStorage.setItem('carrito_compras', JSON.stringify(carritoActual));
    alert(`¡Se han añadido ${cantidadAComprar} unidad(es) al carrito!`);
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

            <BotonAgregarCarrito 
              onClick={handleAgregarAlCarrito} 
            />
          </div>
          <Link to="/#productos">
            ← Volver a productos
          </Link>
        </div>
      </div>
    </main>
  );
}
