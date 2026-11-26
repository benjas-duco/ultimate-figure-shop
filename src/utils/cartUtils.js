export function calcularSubtotal(price, quantity) {
  const numericPrice = Number(price) || 0;
  const numericQuantity = Number(quantity) || 0;
  if (numericQuantity <= 0) return 0;
  return numericPrice * numericQuantity;
}

export function calcularTotalCarrito(items = []) {
  if (!Array.isArray(items)) return 0;
  return items.reduce(
    (acc, item) => acc + calcularSubtotal(item.price, item.quantity),
    0
  );
}

export function incrementarItemCantidad(items, id) {
  return items.map((item) =>
    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
  );
}

export function decrementarItemCantidad(items, id) {
  return items.map((item) =>
    item.id === id && item.quantity > 1
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
}

export function eliminarItemCarrito(items, id) {
  return items.filter((item) => item.id !== id);
}