import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FloatingInput } from '../../components/FloatingInput/FloatingInput';
import { register } from '../../services/authService';
import "./Register.css";


export function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    telefone: '',
  });
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setLoading(true);

    try {
      await register(form); // já cadastra com tipo: 1 (cliente)
      navigate('/login');
    } catch (err) {
      setErro('Erro ao registrar. Verifique os dados.');
    } finally {
      setLoading(false);
    }
  };

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
            label="Senha"
            type="password"
            name="senha"
            value={form.senha}
            onChange={handleChange}
          />
          <FloatingInput
            label="Telefone"
            type="tel"
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
          />

          <button type="submit" className="Register-button" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Registrar'}
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
