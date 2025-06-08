import React from 'react';
import { useEffect, useState } from "react";
import { fetchProducts, Product } from "../../services/productService";
import { Card } from "../../components/Card/Card";
import { Spinner } from "../../components/Spinner/Spinner";
import './Procedimentos.css';
import '../Page.css';


export default function Procedimentos() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);
  return (
    <div className="procedimentos-container">
      <h1> Procedimentos</h1>
      <div className="adicionar-btn">
        <button className="add-button"> Adicionar Procedimento</button>
      </div>
      <div className="product-service-section">
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
    </div>
  );
}
