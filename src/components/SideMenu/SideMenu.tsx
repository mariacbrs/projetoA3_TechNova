import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sideMenuConfig } from '../../config/sideMenuConfig';
import { iconRegistry } from '../../config/iconRegistry';
import { SideMenuItem, MenuSection } from '../../config/menuTypes';
import './SideMenu.css';

export default function SideMenu() {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => setCollapsed(c => !c);

  const sections = sideMenuConfig.map((sec: MenuSection<SideMenuItem>) => ({
    items: sec.items.map(item =>
      item.key === 'toggle'
        ? {
            ...item,
            label: collapsed ? '' : '',
            icon: collapsed ? 'Open' : 'Close',
            onClick: toggle
          }
        : item
    )
  }));

  return (
    <aside className={`side-menu${collapsed ? ' collapsed' : ''}`}>
      {sections.map((section, i) => (
        <ul key={i} className="menu-section-list">
          {section.items.map((item: SideMenuItem) => {
            const Icon = iconRegistry[item.icon];
            const content = (
              <>
                {Icon && (
                  <Icon
                    size={20}
                    className="menu-item-icon"
                    color="currentColor"
                  />
                )}
                {!collapsed && (
                  <span className="menu-item-label">{item.label}</span>
                )}
              </>
            );
            return (
              <li
                key={item.key}
                className="menu-item"
                onClick={item.onClick}
                style={{ cursor: item.onClick ? 'pointer' : 'default' }}
              >
                {item.path ? (
                  <Link to={item.path} className="menu-item-link">
                    {content}
                  </Link>
                ) : (
                  content
                )}
              </li>
            );
          })}
        </ul>
      ))}
    </aside>
  );
}
