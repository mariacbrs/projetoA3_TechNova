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
  const [modalConfirmacao, setModalConfirmacao] = useState(false);
  const [idParaExcluir, setIdParaExcluir] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({ nome: "", descricao: "" });

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
    setForm({ nome: "", descricao: "" });
    setModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setForm({
      nome: product.nome,
      descricao: product.descricao
    });
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setIdParaExcluir(id);
    setModalConfirmacao(true);
  };

  const confirmarExclusao = async () => {
    if (idParaExcluir !== null) {
      await deleteProduct(idParaExcluir);
      setIdParaExcluir(null);
      setModalConfirmacao(false);
      loadProducts();
    }
  };

  const handleSave = async () => {
    if (!form.nome || !form.descricao) {
      alert("Preencha todos os campos.");
      return;
    }

    const data = {
      nome: form.nome,
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
                nome={item.nome}
                descricao={item.descricao}
                onEdit={() => handleEdit(item)}
                onDelete={() => handleDelete(item.id)}
              />
            ))}
          </div>
        )}
      </div>
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedProduct ? "Editar Procedimento" : "Novo Procedimento"}</h2>

            <input
              placeholder="Nome"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />

            <textarea
              placeholder="Descrição"
              value={form.descricao}
              onChange={(e) => setForm({ ...form, descricao: e.target.value })}
            />

            <div className="modal-buttons">
              <button onClick={handleSave}>Salvar</button>
              <button onClick={() => setModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {modalConfirmacao && (
        <div className="modalConf">
          <div className="modal-content-Conf">
            <h3>Tem certeza de que deseja excluir o procedimento permanentemente?</h3>
            <div className="buttons">
              <button className="btn btn-danger" onClick={confirmarExclusao}>
                Sim, Excluir procedimento
              </button>
              <button className="btn btn-cancel" onClick={() => setModalConfirmacao(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
