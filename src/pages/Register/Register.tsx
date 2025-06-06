import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { useAuth } from '../../hooks/useAuth';
import { FloatingInput } from '../../components/FloatingInput/FloatingInput';


export function Register() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: ""
  });
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // ← usa o contexto de autenticação
  const navigate = useNavigate(); // ← redireciona após login

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    setLoading(true);
    try {
      await login(form.email, form.senha);  // ← usa o login do contexto
      navigate('/perfil');                        // ← redireciona para perfil
    } catch (err) {
      setErro('Email ou senha inválidos.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id='register-page'>
      <div className="register-container">
        <form className="register-box" onSubmit={handleSubmit}>
          <h2 className="register-title">Cadastro</h2>

        <FloatingInput
          label="Nome Completo"
          type="text"
          name="nome"
          value={form.nome}
          onChange={handleChange}
        />
        <FloatingInput
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <FloatingInput
          label="Telefone"
          type="tel"
          name="telefone"
          value={form.telefone}
          onChange={handleChange}
        />
        <FloatingInput
          label="Senha"
          type="password"
          name="senha"
          value={form.senha}
          onChange={handleChange}
        />

        <button type="submit" className="Register-button" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar'}
        </button>
        

         <button
        type="button"
        className="login-button"
        onClick={() => navigate('/login')}
        >   
        Login
      </button>

        {erro && <p className="register-error">{erro}</p>}
      </form>
    </div>
    </section>
  );
}
