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
    alert("Conta atualizada com sucesso!");
    fecharModal();
  }

  function abrirModal() {
    document.getElementById("modalConfirmacao")!.style.display = "flex";
  }
  function fecharModal() {
    document.getElementById("modalConfirmacao")!.style.display = "none";
    setForm(usuario);
    setEditando(false);
  }


  return (
    <div className="perfil-container">

      <div className="perfil-header">
        <h3>Meu Perfil</h3>
      </div>

      <div className="perfil-content">
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

            <div className="btn-align">
              <button className="btn-atualizar" onClick={handleAtualizarClick}>
                Atualizar
              </button>
            </div>

          </div>
        ) : (
          <form className="perfil-info" onSubmit={abrirModal}>
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

            <button className="btn-atualizar" type="button" onClick={abrirModal}>
              Salvar
            </button>
            <div id="modalConfirmacao" className="modal">
              <div className="modal-content">
                <h3>Tem certeza de que deseja atualizar seus dados?</h3>
                <div className="buttons">
                  <button className="btn btn-danger" type="submit" onSubmit={handleSalvar}>Sim, Atualizar dados</button>
                  <button className="btn btn-cancel" onClick={fecharModal}>Cancelar</button>
                </div>
              </div>
            </div>
          </form>

        )}

        <button className="btn-logout" onClick={handleLogout}>
          Sair
        </button>
      </div>

    </div>
  );
}
