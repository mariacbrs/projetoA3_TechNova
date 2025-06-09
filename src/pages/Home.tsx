import { useEffect, useState } from "react";
import { CardHome } from "../components/Card/CardHome";
import { fetchProducts, Product } from "../services/productService";
import { Spinner } from "../components/Spinner/Spinner";
import './Page.css';

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return (
    <section>
      <div className="hero-section">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>Tech Nova</h1>
        </div>
      </div>
      <div className="about-section">
        <h2>Sobre nós</h2>
        <p>
          Acreditamos na transformação positiva que a jornada da beleza pode proporcionar. Para isso, oferecemos tratamentos estéticos confiáveis e seguros, impulsionados por alta tecnologia e pela personalização de atendimento, ajudando a elevar a autoestima e o amor próprio de nossos clientes.</p>
        <p>Mais do que uma rede de lojas, somos uma comunidade de profissionais que valorizam a diversidade da autoestima. Nós somos a TechNova e estamos prontos para te acompanhar na sua jornada da beleza.</p>
      </div>
      <div className="product-service-section">
        <h2>Conheça nossos procedimentos</h2>

        {loading ? (
          <Spinner type="rodando" size="medio" colorClass="purple" blockScreen />
        ) : (
          <div className="products-grid">
            {products.map(p => (
              <CardHome
                key={p.id}
                title={p.titulo}
                description={p.descricao}
              />
            ))}
          </div>
        )}
      </div>

    </section>
  );
}
