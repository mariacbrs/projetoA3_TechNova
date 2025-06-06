export interface BaseMenuItem {
    key:    string;
    label:  string;
    icon:   string;
    path?:  string;
    onClick?: () => void;
  }
  
  export type NavEntry = BaseMenuItem;
  
  export type SideMenuItem = BaseMenuItem;
  
  export interface MenuSection<Item = BaseMenuItem> {
    items: Item[];
  }
  