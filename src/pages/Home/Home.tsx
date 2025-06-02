// pages/Home.tsx
import { useEffect, useState } from "react";
import { Card } from "../../components/Card/Card";
import { fetchProducts, Product } from "../../services/productService";
import { Spinner } from "../../components/Spinner/Spinner";
import img07 from "../../img/img07.png"
import '../Page.css';

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
      <div id="banner">
        <figure>
          <img src={img07} alt="imagem do banner, doutora fazendo botox em paciente" />
        </figure>
        <h2>Tech Nova 2025</h2>
      </div>
      <div>
        <h3>Sobre nós</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos autem itaque cupiditate quis sapiente illo consequatur aliquam dignissimos id enim, ipsam soluta! Expedita doloribus tempore exercitationem explicabo ducimus sint debitis eos fugit magni, ullam cupiditate hic corporis in quibusdam dolor similique eum. Consequuntur, excepturi. Dicta soluta amet molestiae, quaerat, suscipit esse praesentium unde quisquam deleniti explicabo delectus maiores deserunt tempora! Accusamus officiis, error repellat et, consequatur eveniet ex ut autem placeat iure quia excepturi odit? Iusto odio laborum aliquid, sunt laboriosam eaque delectus, placeat deleniti repellat, qui tempora. Atque nihil hic quo provident voluptatem a obcaecati expedita perferendis animi quasi explicabo repellat consectetur sequi modi pariatur id, ut vero quam sapiente maiores quibusdam tempore dolorem? Ipsa, veniam! Distinctio, minus eos quos esse ducimus adipisci tenetur nesciunt cupiditate architecto atque quo, mollitia eveniet voluptatem voluptas, deserunt praesentium temporibus cum molestias vero ex. Ipsa magnam impedit nihil quasi, vero aspernatur sapiente quas quam perspiciatis blanditiis laborum dicta sequi. Magni iste iure quod? Corrupti id voluptatum aspernatur perspiciatis ipsam reiciendis quas distinctio explicabo, ratione quibusdam illum ex beatae dolores mollitia cupiditate at dicta! Hic quia esse exercitationem amet veniam. Facilis, facere animi praesentium quas, magni modi quasi quis commodi unde veniam ea at!</p>
      </div>
      <div>
        <h3>
          Nossos Prodecimentos
        </h3>
        {loading ? (
          <Spinner type="rodando" size="medio" colorClass="roxo" blockScreen />
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
