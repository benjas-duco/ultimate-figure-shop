// Única fuente de datos de los productos (antes estaba duplicada en index.html y figure-N.html)
export const products = [
  {
    id: 1,
    name: 'Hatsune Miku',
    description: 'POP UP PARADE Hatsune Miku: Cinnamoroll Collaboration Ver. L Size',
    price: 56990,
    image: '/imagenes/HatsuneMiku.webp',
    preorder: true,
  },
  {
    id: 2,
    name: 'Frieren',
    description: 'POP UP PARADE Frieren: Braids Ver.',
    price: 30990,
    image: '/imagenes/Frieren.webp',
    preorder: true,
  },
  {
    id: 3,
    name: 'Kirby',
    description: 'POP UP PARADE Kirby: Wheelie Rider Ver.',
    price: 40990,
    image: '/imagenes/kirby.webp',
    preorder: true,
  },
];

export const getProductById = (id) => products.find((p) => p.id === Number(id));

// 56990 -> "$56.990"
export const formatPrice = (price) => `$${price.toLocaleString('es-CL')}`;
