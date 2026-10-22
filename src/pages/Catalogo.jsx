import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ProductCard from '../components/organism/ProductCard.jsx';
import { products } from '../data/products.js';

export default function Catalogo() {
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');

    const productosFiltro = categoriaSeleccionada === 'Todos' ? products : products.filter(p => p.category === categoriaSeleccionada);
    return (
        <main>
            <h1 className="center">Catálogo Completo</h1>
            <div className="d-flex justify-content-center gap-2 mb-4">
                <Button 
                    variant={setCategoriaSeleccionada === 'Todos' ? 'dark' : 'outline-dark'}
                    onClick={() => setCategoriaSeleccionada('Todos')}
                >
                    Todos
                </Button>
                <Button
                    variant={setCategoriaSeleccionada === 'Nendoroid' ? 'dark' : 'outline-dark'}
                    onClick={() => setCategoriaSeleccionada('Nendoroid')}
                >
                    Nendoroid
                </Button>
                <Button
                    variant={setCategoriaSeleccionada === 'POP UP PARADE' ? 'dark' : 'outline-dark'}
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