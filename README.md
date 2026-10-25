# Ultimate Figure Shop (React)

Tienda de figuras hecha con React + Vite + React Router + Bootstrap.

## Uso

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de producción en /dist
npm run preview  # previsualizar el build
```

## Estructura

```
public/imagenes/        imágenes (se sirven en /imagenes/...)
src/
  main.jsx              punto de entrada (Router + Bootstrap + estilos)
  App.jsx               definición de rutas
  style.css             estilos propios (los mismos de antes)
  data/products.js      catálogo de productos (única fuente de datos)
  components/           Layout, Navbar, Footer, ProductCard, FormField
  pages/                Home, Product, Login, Register, NotFound
  hooks/useForm.js      manejo de formularios y validación
  utils/validators.js   reglas de validación
```

## Rutas

| Ruta | Página |
|------|--------|
| `/` | Inicio / productos destacados |
| `/figure/:id` | Detalle de figura |
| `/login` | Iniciar sesión |
| `/register` | Registro |

Para agregar un producto basta con añadirlo a `src/data/products.js`.

## Pruebas unitarias

```bash
npm install --save-dev karma karma-jasmine jasmine-core karma-chrome-launcher  # installar jasmin y karma
npm install --save-dev karma-coverage                                          # para crear documento de cobertura de testing
npm run test                                                                   # ejecutar pruebas unitarias de jasmin y karma
```
Al ejecutar estos comandos se crea automaticamente un archivo llamado coverage/ dentro de este archivo se encuentra index.html el cual contiene el documento de cobertura de testing
