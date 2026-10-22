// Única fuente de datos de los productos (antes estaba duplicada en index.html y figure-N.html)
export const products = [
  {
    id: 1,
    name: 'Hatsune Miku',
    category: "POP UP PARADE",
    description: 'POP UP PARADE Hatsune Miku: Cinnamoroll Collaboration Ver. L Size',
    price: 56990,
    image: '/imagenes/HatsuneMiku.webp',
    preorder: true,
  },
  {
    id: 2,
    name: 'Frieren',
    category: "POP UP PARADE",
    description: 'POP UP PARADE Frieren: Braids Ver.',
    price: 30990,
    image: '/imagenes/Frieren.webp',
    preorder: true,
  },
  {
    id: 3,
    name: 'Kirby',
    category: "POP UP PARADE",
    description: 'POP UP PARADE Kirby: Wheelie Rider Ver.',
    price: 40990,
    image: '/imagenes/kirby.webp',
    preorder: true,
  },
  {
    id: 4,
    name: 'Marin Kitagawa Nendoroid',
    category: "Nendoroid",
    description: 'My Dress-Up Darling Temporada 2 - Figura Nendoroid Marin Kitagawa: Uniforme de Invierno Ver.',
    price: 43990,
    image: '/imagenes/MarinKitagawaS2_Nendoroid.webp',
    preorder: true
  },
  {
    id: 5,
    name: 'Wakana Gojo Nendoroid',
    category: "Nendoroid",
    description: 'My Dress-Up Darling - Figura Nendoroid Wakana Gojo (Reedición)',
    price: 43990,
    image: '/imagenes/WakanaGojo_Nendoroid.webp',
    preorder: true
  },
  {
    id: 6,
    name: 'Hatsune Miku Monitoring Ver.',
    category: "Nendoroid",
    description: 'My Dress-Up Darling - Figura Nendoroid Wakana Gojo (Reedición)',
    price: 50990,
    image: '/imagenes/MikuMonitoring_Nendoroid.webp',
    preorder: true
  }
];

export const getProductById = (id) => products.find((p) => p.id === Number(id));

// 56990 -> "$56.990"
export const formatPrice = (price) => `$${price.toLocaleString('es-CL')}`;
