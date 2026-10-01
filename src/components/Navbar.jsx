import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const linkClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`;

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
        <div className="container-fluid">
          <Link to="/" onClick={close}>
            <img src="/imagenes/logo.png" width="70" alt="Ultimate Figure Shop" />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            aria-controls="menuPrincipal"
            aria-expanded={open}
            aria-label="Mostrar navegación"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse${open ? ' show' : ''}`} id="menuPrincipal">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className={linkClass} to="/" end onClick={close}>
                  Inicio
                </NavLink>
              </li>
              <li className="nav-item">
                {/* Se usa Link (no NavLink) porque apunta a un ancla dentro de Inicio */}
                <Link className="nav-link" to="/#productos" onClick={close}>
                  Productos
                </Link>
              </li>
              <li className="nav-item">
                <NavLink className={linkClass} to="/register" onClick={close}>
                  Registrarse
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={linkClass} to="/login" onClick={close}>
                  Iniciar Sesión
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
