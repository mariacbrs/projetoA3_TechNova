import { SideMenuItem, MenuSection } from './menuTypes';

/**
 * Configuração do SideMenu, se path => navegação, senão => onClick
 */
export const sideMenuConfig: MenuSection<SideMenuItem>[] = [
  {
    items: [
       {
        key: 'toggle',
        label: '',
        icon: 'Open'
      },
      {
        key: 'panel',
        path: '/panel',
        label: 'Painel',
        icon: 'FaChartPie'
      },
      {
        key: 'uni',
        path: '/uni',
        label: 'Universidade',
        icon: 'FaUniversity'
      },
      {
        key: 'view',
        label: 'Visualizar',
        icon: 'FaBook',
        onClick: undefined
      }
    ]
  }
];
