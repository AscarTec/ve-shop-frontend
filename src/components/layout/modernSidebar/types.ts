
import { LucideIcon } from 'lucide-react';

export interface SidebarItem {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: string | number;
}

export interface SidebarGroup {
  label: string;
  items: SidebarItem[];
}

export interface SidebarConfig {
  groups: SidebarGroup[];
}
