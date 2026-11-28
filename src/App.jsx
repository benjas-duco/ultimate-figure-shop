import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Product from './pages/Product.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import NotFound from './pages/NotFound.jsx';
import Carrito from './pages/Carrito.jsx';
import Catalogo from './pages/Catalogo.jsx';
import Nosotros from './pages/Nosotros.jsx';
import Blogs from './pages/Blogs.jsx';
import BlogDetail from './pages/BlogDetail.jsx';
import Contacto from './pages/Contacto.jsx';
import Categorias from './pages/Categorias.jsx';
import Ofertas from './pages/Ofertas.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="figure/:id" element={<Product />} />
        <Route path="catalogo" element={<Catalogo />} />
        <Route path="nosotros" element={<Nosotros />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/:id" element={<BlogDetail />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="categorias" element={<Categorias />} />
        <Route path="categorias/:categoria" element={<Categorias />} />
        <Route path="ofertas" element={<Ofertas />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}