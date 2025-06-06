import { SideMenuItem, MenuSection } from './menuTypes';

/**
 * Configuração do SideMenu, se path => navegação, senão => onClick
 */
export const menuAdminConfig: MenuSection<SideMenuItem>[] = [
  {
    items: [
       {
        key: 'toggle',
        label: '',
        icon: 'Open'
      },
      {
        key: 'perfil',
        path: '/perfil',
        label: 'Meu Perfil',
        icon: 'User'
      },
      {
        key: 'agendamentos',
        path: '/agendamentos',
        label: 'Agenda',
        icon: 'Calendar'
      },
      {
        key: 'Procedimentos',
        path: '/procedimentos',
        label: 'Procedimentos',
        icon: 'Book'
      }
    ]
  }
];
