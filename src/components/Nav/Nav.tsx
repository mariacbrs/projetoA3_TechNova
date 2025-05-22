import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navConfig } from '../../config/navConfig';
import { iconRegistry } from '../../config/iconRegistry';
import { NavEntry } from '../../config/menuTypes';
import { useAuth } from '../../hooks/useAuth'; 
import './Nav.css';

export function Nav() {
  const { pathname } = useLocation();
  const { isAuthenticated, logout } = useAuth();
  

  const items = navConfig
    .filter(item => !(item.key === 'login'  && isAuthenticated))
    .filter(item => !(item.key === 'logout' && !isAuthenticated))
    .map(item => {
      if (item.key === 'logout') {
        return { ...item, onClick: logout };
      }
      return item;
    });

  return (
    <nav className="nav">
      {items.map((item: NavEntry) => {
        const Icon = iconRegistry[item.icon];
        const content = (
          <>
            {Icon && <Icon size={25} className="nav-link-icon" color="currentColor" />}
            <span className="nav-link-label">{item.label}</span>
          </>
        );

        if (item.onClick) {
          return (
            <button
              key={item.key}
              onClick={item.onClick}
              className="nav-link"
            >
              {content}
            </button>
          );
        }

        return (
          <Link
            key={item.key}
            to={item.path!}
            className={`nav-link${pathname === item.path ? ' active' : ''}`}
          >
            {content}
          </Link>
        );
      })}
    </nav>
  );
}
