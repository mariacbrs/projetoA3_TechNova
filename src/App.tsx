// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Home } from './pages/Home';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';  
import './App.css';

import AdminMenu from './components/SideMenu/SideMenuAdmin';
import UserMenu from './components/SideMenu/SideMenuUser';

import { Perfil } from './pages/Perfil/Perfil';
import Agenda from './pages/Agenda/Agenda';


export default function App() {

  const role = localStorage.getItem('userRole') || 'cliente';

  const SideMenu = role === '0' ? AdminMenu : UserMenu;

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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
