/**
 * Campos compartilhados por todos os itens de menu
 */
export interface BaseMenuItem {
    key:    string;
    label:  string;
    icon:   string;
    path?:  string;
    onClick?: () => void;
  }
  
  /** NavEntry herda BaseMenuItem (rota ou ação) */
  export type NavEntry = BaseMenuItem;
  
  /** SideMenuItem herda BaseMenuItem (rota ou ação) */
  export type SideMenuItem = BaseMenuItem;
  
  /** Seção genérica de itens de menu */
  export interface MenuSection<Item = BaseMenuItem> {
    items: Item[];
  }
  