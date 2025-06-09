import React, { useEffect, useState } from "react";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  Product
} from "../../services/productService";
import { CardProcedimentos } from "../../components/Card/CardProcedimentos";
import { Spinner } from "../../components/Spinner/Spinner";
import "./Procedimentos.css";
import "../Page.css";

export default function Procedimentos() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({ titulo: "", descricao: ""});

  const loadProducts = () => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAdd = () => {
    setSelectedProduct(null);
    setForm({ titulo: "", descricao: ""});
    setModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setForm({
      titulo: product.titulo,
      descricao: product.descricao
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    await deleteProduct(id);
    loadProducts();
  };

  const handleSave = async () => {
    if (!form.titulo || !form.descricao) {
      alert("Preencha todos os campos.");
      return;
    }

    const data = {
      titulo: form.titulo,
      descricao: form.descricao
    };

    if (selectedProduct) {
      await updateProduct(selectedProduct.id, data);
    } else {
      await createProduct(data);
    }

    setModalOpen(false);
    setSelectedProduct(null);
    loadProducts();
  };

  return (
    <div className="procedimentos-container">
      <h1>Procedimentos</h1>
      <div className="adicionar-btn">
        <button className="add-button" onClick={handleAdd}>
          Adicionar Procedimento
        </button>
      </div>

      <div className="product-service-section">
        {loading ? (
          <Spinner type="rodando" size="medio" colorClass="purple" blockScreen />
        ) : (
          <div className="products-grid">
            {products.map((item) => (
              <CardProcedimentos
                key={item.id}
                id={item.id}
                titulo={item.titulo}
                descricao={item.descricao}
                onEdit={() => handleEdit(item)}
                onDelete={() => handleDelete(item.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="modal-backdrop">
          <div className="modal-content card">
            <h2>{selectedProduct ? "Editar Procedimento" : "Novo Procedimento"}</h2>

            <input
              placeholder="Título"
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
            />

            <textarea
              placeholder="Descrição"
              value={form.descricao}
              onChange={(e) => setForm({ ...form, descricao: e.target.value })}
            />

            <div className="modal-actions">
              <button onClick={handleSave}>Salvar</button>
              <button onClick={() => setModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
