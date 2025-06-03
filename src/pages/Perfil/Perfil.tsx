import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Perfil.css";

export function Perfil() {
  const navigate = useNavigate();
  

  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
  });

  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState(usuario);

  useEffect(() => {
    const dadosSalvos = localStorage.getItem("usuario");
    if (dadosSalvos) {
      const dados = JSON.parse(dadosSalvos);
      setUsuario(dados);
      setForm(dados); // preencher o formulário com os dados atuais
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("usuario");
    navigate("/login");
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleAtualizarClick() {
    setEditando(true);
  }

  function handleSalvar(e: React.FormEvent) {
    e.preventDefault();
    setUsuario(form);
    localStorage.setItem("usuario", JSON.stringify(form));
    setEditando(false);
  }

  return (
    <div className="perfil-container">
      
      <div className="perfil-header">
      <h2> Meu Perfil</h2>
        
      </div>

      <h3>Dados do cadastro</h3>

      {!editando ? (
        <div className="perfil-info">
          <label>Nome Completo</label>
          <p>{usuario.nome}</p>

          <label>Email</label>
          <p>{usuario.email}</p>

          <label>Telefone</label>
          <p>{usuario.telefone}</p>

          <label>Senha</label>
          <p>{"*".repeat(usuario.senha.length)}</p>

          <button className="btn-atualizar" onClick={handleAtualizarClick}>
            Atualizar
          </button>
        </div>
      ) : (
        <form className="perfil-info" onSubmit={handleSalvar}>
          <label>Nome Completo</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Telefone</label>
          <input
            type="tel"
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
            required
          />

          <label>Senha</label>
          <input
            type="password"
            name="senha"
            value={form.senha}
            onChange={handleChange}
            required
          />

          <button className="btn-atualizar" type="submit">
            Salvar
          </button>
        </form>
      )}

      <button className="btn-logout" onClick={handleLogout}>
        Sair
      </button>
    </div>
  );
}
