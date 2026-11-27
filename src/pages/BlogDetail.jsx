import { Link, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { BLOG_POSTS } from './Blogs.jsx';

export default function BlogDetail() {
  const { id } = useParams();
  const post = BLOG_POSTS.find((item) => item.id === id);

  if (!post) {
    return (
      <Container className="my-5 text-center" style={{ minHeight: '60vh' }}>
        <h1 className="h3 mb-3">Artículo no encontrado</h1>
        <Button as={Link} to="/blogs" variant="dark">
          ← Volver a Blogs
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5" style={{ maxWidth: 800, minHeight: '60vh' }}>
      <Card className="shadow-sm">
        <Card.Img
          variant="top"
          src={post.imagen}
          alt={post.titulo}
          style={{ maxHeight: 380, objectFit: 'cover' }}
        />
        <Card.Body className="p-4">
          <Card.Title as="h1" className="h3 mb-3">
            {post.titulo}
          </Card.Title>
          <Card.Text style={{ lineHeight: 1.7 }}>{post.contenidoLargo}</Card.Text>
          <Button as={Link} to="/blogs" variant="outline-dark" className="mt-3">
            ← Volver a Blogs
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}