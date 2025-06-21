
import {
  LayoutDashboard,
  Calendar,
  Users,
  Waves,
  Target,
  CreditCard,
  BarChart3,
  Settings,
  Shield,
  UserCheck
} from 'lucide-react';
import { SidebarConfig } from './types';

export const sidebarConfig: SidebarConfig = {
  groups: [
    {
      label: 'main',
      items: [
        {
          href: '/',
          label: 'dashboard',
          icon: LayoutDashboard
        },
        {
          href: '/bookings',
          label: 'bookings',
          icon: Calendar,
          badge: '12'
        }
      ]
    },
    {
      label: 'activities',
      items: [
        {
          href: '/activities/swimming',
          label: 'swimming',
          icon: Waves
        },
        {
          href: '/activities/fields',
          label: 'fields',
          icon: Target
        }
      ]
    },
    {
      label: 'management',
      items: [
        {
          href: '/clients',
          label: 'clients',
          icon: Users
        },
        {
          href: '/payments',
          label: 'payments',
          icon: CreditCard
        },
        {
          href: '/reports',
          label: 'reports',
          icon: BarChart3
        }
      ]
    },
    {
      label: 'system',
      items: [
        {
          href: '/users',
          label: 'users',
          icon: UserCheck
        },
        {
          href: '/roles',
          label: 'roles',
          icon: Shield
        },
        {
          href: '/settings',
          label: 'settings',
          icon: Settings
        }
      ]
    }
  ]
};
