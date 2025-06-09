import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import "./Perfil.css";

export function Perfil() {
  const { user, setUser } = useAuth();
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', senha: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setForm({
        nome: user.nome,
        email: user.email,
        telefone: user.telefone,
        senha: ''
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (!user) return;

    try {
      await axios.put(`http://localhost:3001/api/auth/${user.id}`, form);
      setUser({
        ...user,
        nome: form.nome,
        telefone: form.telefone,
      });
      setEditando(false);
      fecharModal();
      alert('Perfil atualizado com sucesso.');
    } catch (err) {
      alert('Erro ao atualizar perfil.');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    navigate('/login');
  };

  const handleAtualizarClick = () => {
    setEditando(true);
  };

  function abrirModal() {
    document.getElementById("modalConfirmacao")!.style.display = "flex";
  }

  function fecharModal() {
    if (!user) return;
    document.getElementById("modalConfirmacao")!.style.display = "none";
    setForm({
      nome: user.nome,
      email: user.email,
      telefone: user.telefone,
      senha: ''
    });
    setEditando(false);
  }

  if (!user) {
    return <p>Carregando usuário...</p>;
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
            <p>{form.nome}</p>

            <label>Email</label>
            <p>{form.email}</p>

            <label>Telefone</label>
            <p>{form.telefone}</p>

            <label>Senha</label>
            <p>{"*".repeat(8)}</p>

            <div className="btn-align">
              <button className="btn-atualizar" onClick={handleAtualizarClick}>
                Atualizar
              </button>
            </div>
          </div>
        ) : (
          <div className="perfil-info">
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
              disabled
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
                  <button className="btn btn-danger" onClick={handleUpdate}>Sim, Atualizar dados</button>
                  <button className="btn btn-cancel" onClick={fecharModal}>Cancelar</button>
                </div>
              </div>
            </div>
          </div>
        )}

        <button className="btn-logout" onClick={handleLogout}>
          Sair
        </button>
      </div>
    </div>
  );
}
