// pages/Home.tsx
import { useEffect, useState } from "react";
import { Card } from "../components/Card/Card";
import { fetchProducts, Product } from "../services/productService";
import { Spinner } from "../components/Spinner/Spinner";
import './Page.css';
import logo1 from "../img/produto.png"

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
        Acreditamos na transformação positiva que a jornada da beleza pode proporcionar. Para isso, oferecemos tratamentos estéticos confiáveis e seguros, impulsionados por alta tecnologia e pela personalização de atendimento, ajudando a elevar a autoestima e o amor próprio de nossos clientes.<br></br>

Mais do que uma rede de lojas, somos uma comunidade de profissionais que valorizam a diversidade da autoestima. Nós somos a TechNova e estamos prontos para te acompanhar na sua jornada da beleza.        </p>
      </div>
      <div className="product-service-section">
        <h2>Conheça nossos produtos</h2>
        
        <div id="conteudo">
          <img src={logo1} alt="Imagem produto" />
          <h3>Serviço</h3>
        </div>

        {loading ? (
          <Spinner type="rodando" size="medio" colorClass="purple" blockScreen />
        ) : (
          <div className="products-grid">
            {products.map((item) => (
              <Card key={item.id} {...item} />
            ))}
          </div>
        )}
      </div>

    </section>
  );
}
