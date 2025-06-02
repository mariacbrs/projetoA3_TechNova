import { SideMenuItem, MenuSection } from './menuTypes';

export const sideMenuConfig: MenuSection<SideMenuItem>[] = [
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
        key: 'produtos',
        path: '/produtos',
        label: 'Produtos',
        icon: 'Book',
        
      }
    ]
  }
];
