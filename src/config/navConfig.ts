import { NavEntry } from './menuTypes';

export const navConfig: NavEntry[] = [
  {
    key: 'home',
    path: '/',
    label: 'Sobre nós',
    icon: ''
  },
  {
    key: 'home',
    path: '/',
    label: 'Nossos Produtos',
    icon: ''
  },
  {
    key: 'login',
    path: '/login',
    label: '',
    icon: 'User',
    onClick: undefined
  },
  {
    key: 'logout',
    label: 'Sair',
    icon: 'LogOut',
    onClick: undefined
  },
];
