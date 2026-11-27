import { Link } from 'react-router-dom';
import { BLOG_POSTS } from './BlogDetail.jsx';

export default function Blogs() {
  return (
    <main>
      <h1 className="center">Noticias y Blogs</h1>

      <section className="home_productos">
        {BLOG_POSTS.map((post) => (
          <article key={post.id} className="product_card">
            <div className="image_container">
              <img src={post.imagen} alt={post.titulo} />
            </div>
            <h2 className="h5 mt-3">{post.titulo}</h2>
            <p className="text-muted">{post.resumenCorto}</p>
            <Link to={`/blogs/${post.id}`} className="btn btn-dark btn-sm mt-auto">
              Ver caso
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}