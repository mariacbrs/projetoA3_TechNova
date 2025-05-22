// src/components/Menu/Menu.tsx
import React from 'react';
import './Menu.css';

interface MenuItem {
  label: string;
  path?: string;    // Rota ou link, se necessário
  icon?: string;    // URL ou caminho para o ícone/imagem
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

// Exemplo de dados com ícones (certifique-se de ter as imagens nos caminhos indicados)
const menuSections: MenuSection[] = [
  {
    title: 'Estatísticas',
    items: [
      { label: 'Geral', path: '/geral', icon: '/icons/geral.svg' },
      { label: 'Instituição', path: '/instituicao', icon: '/icons/instituicao.svg' },
      { label: 'Docente', path: '/docente', icon: '/icons/docente.svg' },
      { label: 'Curso', path: '/curso', icon: '/icons/curso.svg' },
      { label: 'Ingresso', path: '/ingresso', icon: '/icons/ingresso.svg' },
      { label: 'Matrícula', path: '/matricula', icon: '/icons/matricula.svg' },
      { label: 'Concluinte', path: '/concluinte', icon: '/icons/concluinte.svg' },
    ],
  },
  {
    title: 'Indicadores',
    items: [
      { label: 'Tripletia', path: '/tripletia', icon: '/icons/tripletia.svg' },
      { label: 'Pós-Graduação', path: '/pos-graduacao', icon: '/icons/posgraduacao.svg' },
    ],
  },
];

const Menu: React.FC = () => {
  return (
    <div className="menu-container">
      {menuSections.map((section) => (
        <div className="menu-section" key={section.title}>
          <h2 className="menu-section-title">{section.title}</h2>
          <div className="menu-items-grid">
            {section.items.map((item) => (
              <div className="menu-item-hex" key={item.label}>
                {item.icon && (
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="menu-item-icon"
                  />
                )}
                <span className="menu-item-label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
