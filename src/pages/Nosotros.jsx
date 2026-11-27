import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

const desarrolladores = [
  {
    nombre: 'Benjamin Soto, Javier Fuentealba, Vicente Castro y Adriel Yañez',
    rol: 'Equipo de Desarrollo completo',
    descripcion: 'Desarrollo de vistas, navegación, validaciones de formularios y lógica de tienda.',
  },
  {
    nombre: 'Equipo FullStack II',
    rol: 'Testing, Calidad y Backend',
    descripcion: 'Pruebas unitarias con Jasmine/Karma y proyección de servicios REST.',
  },
];

export default function Nosotros() {
  return (
    <Container className="my-5" style={{ minHeight: '60vh' }}>
      <section className="mb-5 text-center">
        <h1 className="mb-3">Sobre Ultimate Figure Shop</h1>
        <p className="text-muted mx-auto" style={{ maxWidth: 720 }}>
          Somos una tienda especializada en figuras de colección de anime como Nendoroid y POP UP
          PARADE. Nuestro objetivo es acercar piezas originales a coleccionistas de forma simple,
          confiable y con despacho a todo Chile.
        </p>
      </section>

      <section>
        <h2 className="h4 text-center mb-4">Equipo de Desarrollo</h2>
        <Row className="g-4 justify-content-center">
          {desarrolladores.map((dev) => (
            <Col key={dev.nombre} md={6} lg={5}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{dev.nombre}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{dev.rol}</Card.Subtitle>
                  <Card.Text>{dev.descripcion}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  );
}