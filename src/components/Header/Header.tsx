import './Header.css';
import { Nav } from '../Nav/Nav';
import logo05 from './logo05.png'
export function Header() {
  return (
    <header className="header">
      <figure>
        <img src={logo05} alt="logo da empresa technova, robô roxo" />
      </figure>
      <Nav />
    </header>
  );
}
