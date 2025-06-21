
import {
  LayoutDashboard,
  Calendar,
  Activity,
  Users,
  Shield,
  Settings,
  MapPin,
  Waves,
  UserCheck,
  CreditCard,
  BarChart3,
  Building,
  ClipboardList
} from 'lucide-react';
import { SidebarConfig } from './types';

export const sidebarConfig: SidebarConfig = {
  groups: [
    {
      label: 'navigation.main',
      items: [
        {
          href: '/dashboard',
          label: 'navigation.dashboard',
          icon: LayoutDashboard,
        },
        {
          href: '/admin/dashboard',
          label: 'لوحة التحكم الرئيسية',
          icon: LayoutDashboard,
        }
      ]
    },
    {
      label: 'إدارة المرافق',
      items: [
        {
          href: '/admin/facilities',
          label: 'إدارة المرافق',
          icon: Building,
        },
        {
          href: '/activities/swimming',
          label: 'أنشطة السباحة',
          icon: Waves,
        },
        {
          href: '/activities/fields',
          label: 'أنشطة الملاعب',
          icon: MapPin,
        }
      ]
    },
    {
      label: 'إدارة الحجوزات',
      items: [
        {
          href: '/admin/bookings',
          label: 'إدارة الحجوزات',
          icon: ClipboardList,
        },
        {
          href: '/bookings',
          label: 'navigation.bookings',
          icon: Calendar,
        }
      ]
    },
    {
      label: 'navigation.management',
      items: [
        {
          href: '/clients',
          label: 'navigation.clients',
          icon: Users,
        },
        {
          href: '/payments',
          label: 'navigation.payments',
          icon: CreditCard,
        }
      ]
    },
    {
      label: 'navigation.system',
      items: [
        {
          href: '/users',
          label: 'navigation.users',
          icon: UserCheck,
        },
        {
          href: '/roles',
          label: 'navigation.roles',
          icon: Shield,
        },
        {
          href: '/reports',
          label: 'التقارير',
          icon: BarChart3,
        },
        {
          href: '/settings',
          label: 'navigation.settings',
          icon: Settings,
        }
      ]
    }
  ]
};
