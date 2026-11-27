import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      <hr />
      <section id="contacto" className="ps-3 pe-3 mb-3">
        <h2>Contacto</h2>
        <p className="mb-3">
          Dirección: Av. Pepito Suarez 435
          <br />
          Teléfono: +56 9 5234 6543
          <br />
          Correo: contacto@figureshop.com
        </p>

        <div className="d-flex flex-wrap gap-2">
          <Link to="/nosotros" className="btn btn-outline-dark btn-sm">
            Nosotros
          </Link>
          <Link to="/blogs" className="btn btn-outline-dark btn-sm">
            Blogs
          </Link>
        </div>
      </section>

      <footer className="ps-3 pe-3 pb-3">
        <p className="mb-0">@2026 Ultimate Figure Shop</p>
      </footer>
    </>
  );
}