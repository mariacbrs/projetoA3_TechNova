import {
  User,
  Book,
  LogOut,
  Calendar,
  PanelLeftOpen,
  PanelLeftClose
} from 'lucide-react';

import React from 'react';

export const iconRegistry: Record<
  string,
  React.FC<{ size?: number; className?: string; color?: string }>
> = {
  User:     User,
  Book:        Book,
  LogOut:  LogOut,
  Calendar: Calendar,
  Open: PanelLeftOpen,
  Close: PanelLeftClose
};
