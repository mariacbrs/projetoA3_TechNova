import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FloatingInput } from '../../components/FloatingInput/FloatingInput';
import { login } from '../../services/authService';
import './Login.css';


export function Login() {
 const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setLoading(true);

    try {
      const usuario = await login(email, senha);
       setUser(usuario);
      localStorage.setItem('userRole', usuario.tipo === 0 ? 'admin' : 'cliente');

      navigate('/');
    } catch (err) {
      setErro('Email ou senha inválidos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id='login-page'>
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <h2 className="login-title">Login</h2>
        <FloatingInput
          label="Email"
          type="text"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <FloatingInput
          label="Senha"
          type="password"
          name="senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
        />

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
        

         <button
        type="button"
        className="Register-button"
        onClick={() => navigate('/register')}
        >   
        Registre-se
      </button>

        {erro && <p className="login-error">{erro}</p>}
      </form>
    </div>
    </section>
  );
}
