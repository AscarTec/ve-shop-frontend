
import {
  LayoutDashboard,
  Calendar,
  Users,
  Shield,
  BarChart3,
  Settings,
  Building,
  Waves,
  MapPin,
  CreditCard,
  User,
  UserCheck
} from 'lucide-react';

export const sidebarConfig = {
  groups: [
    {
      label: 'navigation.main',
      items: [
        {
          href: '/dashboard',
          label: 'لوحة التحكم',
          icon: LayoutDashboard,
          badge: null
        },
        {
          href: '/admin/dashboard',
          label: 'لوحة التحكم الرئيسية',
          icon: LayoutDashboard,
          badge: 'admin'
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
          badge: 'admin'
        },
        {
          href: '/activities/swimming',
          label: 'أنشطة السباحة',
          icon: Waves,
          badge: null
        },
        {
          href: '/activities/fields',
          label: 'أنشطة الملاعب',
          icon: MapPin,
          badge: null
        }
      ]
    },
    {
      label: 'إدارة الحجوزات',
      items: [
        {
          href: '/bookings',
          label: 'الحجوزات',
          icon: Calendar,
          badge: null
        },
        {
          href: '/admin/bookings',
          label: 'إدارة الحجوزات',
          icon: Calendar,
          badge: 'admin'
        },
        {
          href: '/payments',
          label: 'المدفوعات',
          icon: CreditCard,
          badge: null
        }
      ]
    },
    {
      label: 'إدارة المستخدمين',
      items: [
        {
          href: '/clients',
          label: 'العملاء',
          icon: Users,
          badge: null
        },
        {
          href: '/users',
          label: 'المستخدمين',
          icon: User,
          badge: null
        },
        {
          href: '/players',
          label: 'اللاعبين',
          icon: User,
          badge: 'new'
        },
        {
          href: '/coaches',
          label: 'المدربين',
          icon: UserCheck,
          badge: 'new'
        }
      ]
    },
    {
      label: 'الإدارة والإعدادات',
      items: [
        {
          href: '/roles',
          label: 'الأدوار والصلاحيات',
          icon: Shield,
          badge: 'admin'
        },
        {
          href: '/reports',
          label: 'التقارير',
          icon: BarChart3,
          badge: null
        },
        {
          href: '/settings',
          label: 'الإعدادات',
          icon: Settings,
          badge: null
        }
      ]
    }
  ]
};
