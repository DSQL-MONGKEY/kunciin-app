import { Icons } from '@/components/icons';

export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  shortcut?: [string, string];
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

export type RouteParams = {
  params: {
    id: string
  };
}

export interface UserCredentials {
  id: number;
  fingerprint_id: number;
  rfid_uid: string;
  created_at: string;
}
export interface DoorLogs {
  id: number;
  fingerprint_id: number;
  rfid_uid: string;
  created_at: string;
  access_granted: boolean
}
