import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Home } from './pages/Home';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { useAuth } from './hooks/useAuth'; 
import AdminSideMenu from './components/SideMenu/SideMenuAdmin';
import ClienteSideMenu from './components/SideMenu/SideMenuUser';

import { Perfil } from './pages/Perfil/Perfil';
import Agenda from './pages/Agenda/Agenda';
import Procedimentos from './pages/Procedimentos/Procedimentos';

import './App.css';

export default function App() {
  const { user } = useAuth();

  const SideMenu = () => {
    if (!user) return null;
    return user.tipo === 0 ? <AdminSideMenu /> : <ClienteSideMenu />;
  };

  return (
    <Router>
      <div className="grid-container">
        <Header />
        <SideMenu />
        <main className="main page">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/agendamentos" element={<Agenda />} />
            <Route path="/procedimentos" element={<Procedimentos />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
