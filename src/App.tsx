// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Home } from './pages/Home/Home';
import { About } from './pages/About';
import { Login } from './pages/Login/Login';
import './App.css';
import SideMenu from './components/SideMenu/SideMenu';

export default function App() {
  return (
    <Router>
      <div className="grid-container">
        <Header />
        <SideMenu />
        <main className="main page">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/register" element={<Register />} /> */}
            {/* <Route path="/perfil" element={<Perfil />} /> nova rota */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
