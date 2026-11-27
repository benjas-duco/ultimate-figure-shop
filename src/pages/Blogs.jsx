import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export const BLOG_POSTS = [
  {
    id: '1',
    titulo: 'Caso Curioso #1: Cómo identificar detalles clave en figuras Nendoroid',
    resumenCorto:
      'Consejos rápidos para revisar articulaciones, rostros intercambiables y el estado de la caja en tu colección.',
    contenidoLargo:
      'Las figuras Nendoroid destacan por su tamaño compacto, expresiones faciales intercambiables y accesorios detallados. Al manipularlas, conviene sujetar las piezas desde su base o articulación principal evitando forzar uniones pequeñas, mantenerlas alejadas de luz solar directa para prevenir decoloración y conservar su empaque original si planeas exhibirlas o guardarlas a largo plazo.',
    imagen: '/imagenes/MarinKitagawaS2_Nendoroid.webp',
  },
  {
    id: '2',
    titulo: 'Caso Curioso #2: Exhibición segura y cuidado del polvo en vitrinas',
    resumenCorto:
      'Qué considerar al organizar tus figuras en repisas o escritorios para mantenerlas limpias y estables.',
    contenidoLargo:
      'Una buena exhibición combina estabilidad y protección frente al polvo ambiental. Usar superficies niveladas, evitar zonas con humedad o cambios bruscos de temperatura y realizar limpiezas periódicas suaves ayuda a que tanto figuras de escala como líneas POP UP PARADE luzcan impecables con el paso del tiempo.',
    imagen: '/imagenes/kirby.webp',
  },
];

export default function Blogs() {
  return (
    <Container className="my-5" style={{ minHeight: '60vh' }}>
      <h1 className="text-center mb-4">Noticias y Blogs de la Tienda</h1>
      <Row className="g-4">
        {BLOG_POSTS.map((post) => (
          <Col key={post.id} md={6}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={post.imagen}
                alt={post.titulo}
                style={{
                  height: 260,
                  width: '100%',
                  objectFit: 'cover',
                  objectPosition: '15%',
                }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{post.titulo}</Card.Title>
                <Card.Text className="text-muted flex-grow-1">
                  {post.resumenCorto}
                </Card.Text>
                <div>
                  <Button as={Link} to={`/blogs/${post.id}`} variant="dark">
                    Ver caso completo
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}