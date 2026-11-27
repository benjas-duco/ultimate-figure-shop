import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ProductCard from '../components/organism/ProductCard.jsx';
import { products } from '../data/products.js';
import { filtrarProductos } from '../utils/catalogoUtils.js';

export default function Catalogo() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');

  const productosFiltro = filtrarProductos(products, categoriaSeleccionada);

  return (
    <main>
      <h1 className="center">Catálogo Completo</h1>
      <div className="d-flex justify-content-center gap-2 mb-4">
        <Button
          variant={categoriaSeleccionada === 'Todos' ? 'dark' : 'outline-dark'}
          onClick={() => setCategoriaSeleccionada('Todos')}
        >
          Todos
        </Button>
        <Button
          variant={categoriaSeleccionada === 'Nendoroid' ? 'dark' : 'outline-dark'}
          onClick={() => setCategoriaSeleccionada('Nendoroid')}
        >
          Nendoroid
        </Button>
        <Button
          variant={categoriaSeleccionada === 'POP UP PARADE' ? 'dark' : 'outline-dark'}
          onClick={() => setCategoriaSeleccionada('POP UP PARADE')}
        >
          POP UP PARADE
        </Button>
      </div>
      <div className="home_productos">
        {productosFiltro.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}