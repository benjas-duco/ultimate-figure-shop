import { Link, useParams } from 'react-router-dom';

export const BLOG_POSTS = [
  {
    id: '1',
    titulo: 'Caso Curioso #1: Detalles clave en figuras Nendoroid',
    resumenCorto: 'Consejos rápidos para cuidar piezas, rostros y empaques.',
    contenidoLargo:
      'Las figuras Nendoroid destacan por su tamaño compacto, expresiones faciales intercambiables y accesorios detallados. Conviene manipularlas con cuidado, evitar el sol directo y conservar su caja original.',
    imagen: '/imagenes/MarinKitagawaS2_Nendoroid.webp',
  },
  {
    id: '2',
    titulo: 'Caso Curioso #2: Exhibición y cuidado en vitrinas',
    resumenCorto: 'Cómo mantener tus figuras limpias y estables en tu espacio.',
    contenidoLargo:
      'Una buena exhibición combina superficies estables, protección frente al polvo y limpiezas periódicas suaves para mantener tus figuras en buen estado.',
    imagen: '/imagenes/kirby.webp',
  },
];

export default function BlogDetail() {
  const { id } = useParams();
  const post = BLOG_POSTS.find((item) => item.id === id);

  if (!post) {
    return (
      <main className="p-4">
        <h1 className="center">Artículo no encontrado</h1>
        <div className="center mt-3">
          <Link to="/blogs" className="btn btn-dark">
            Volver a Blogs
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <section className="product_main gap-4 flex-wrap">
        <div className="product_image_container">
          <img src={post.imagen} alt={post.titulo} />
        </div>
        <div style={{ maxWidth: 600 }}>
          <h1>{post.titulo}</h1>
          <p className="mt-3" style={{ lineHeight: 1.7 }}>
            {post.contenidoLargo}
          </p>
          <Link to="/blogs" className="btn btn-outline-dark mt-3">
            ← Volver a Blogs
          </Link>
        </div>
      </section>
    </main>
  );
}