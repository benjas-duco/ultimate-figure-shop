import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Product from './pages/Product.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import NotFound from './pages/NotFound.jsx';
import Carrito from './pages/Carrito.jsx';
import Catalogo from './pages/Catalogo.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="figure/:id" element={<Product />} />
        <Route path="catalogo" element={<Catalogo />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
