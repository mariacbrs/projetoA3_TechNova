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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          interdum ante et velit aliquam interdum. Morbi commodo dolor enim, ut
          suscipit mi lacinia quis. Maecenas vestibulum erat id ex ultricies,
          sed sodales metus consequat. Vivamus ac dolor sit amet enim sodales
          tincidunt. In ipsum urna, pretium quis sollicitudin ac, congue a
          velit. Sed lacus nibh, ultricies nec enim id, ultrices auctor orci.
          Vivamus pellentesque aliquet arcu, et elementum libero tempus sit
          amet. Sed non luctus tellus, non accumsan purus. Mauris ullamcorper
          dictum eros sit amet volutpat.
        </p>
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
