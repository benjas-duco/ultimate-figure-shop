import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main>
      <section className="text-center">
        <h1>Página no encontrada</h1>
        <p>
          <Link to="/">Volver al inicio</Link>
        </p>
      </section>
    </main>
  );
}
