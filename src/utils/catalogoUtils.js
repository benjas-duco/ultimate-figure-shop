export function filtrarProductos(productos = [], categoria = 'Todos') {
  if (!Array.isArray(productos)) return [];
  if (!categoria || categoria === 'Todos') {
    return productos;
  }
  return productos.filter(
    (producto) =>
      String(producto.category || '').toLowerCase() ===
      String(categoria).toLowerCase()
  );
}

export function obtenerCategorias(productos = []) {
  if (!Array.isArray(productos)) return [];
  const categorias = productos
    .map((p) => p.category)
    .filter((cat) => Boolean(cat && String(cat).trim()));
  return [...new Set(categorias)];
}

export function obtenerPrecioFinal(producto) {
  const precioBase = Number(producto?.price) || 0;
  if (producto?.enOferta && Number(producto?.descuento) > 0) {
    const factor = 1 - Number(producto.descuento) / 100;
    return Math.max(0, Math.round(precioBase * factor));
  }
  return precioBase;
}

export function filtrarOfertas(productos = []) {
  if (!Array.isArray(productos)) return [];
  return productos.filter((p) => Boolean(p?.enOferta));
}