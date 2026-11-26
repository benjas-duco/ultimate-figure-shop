export function filtrarProductos(productos = [], categoria = 'Todos') {
  if (!Array.isArray(productos)) return [];
  if (!categoria || categoria === 'Todos') {
    return productos;
  }
  return productos.filter((producto) => producto.category === categoria);
}