// Sidebar.tsx
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useAppStore } from '@/stores/useAppStore';
import { useLoadingStore } from '@/stores/useLoadingStore';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard, Calendar, Activity, Users, Shield, BarChart3,
  Settings, X, Waves, MapPin, CreditCard
} from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';

const Sidebar = () => {
  const { t } = useTranslation();
  const { sidebarOpen, setSidebarOpen, language } = useAppStore();
  const showLoading = useLoadingStore((state) => state.showLoading);

  const menuItems = [
    { icon: LayoutDashboard, label: t('dashboard'), href: '/' },
    { icon: Calendar, label: t('bookings'), href: '/bookings' },
    {
      icon: Activity, label: t('activities'), href: '/activities',
      subItems: [
        { icon: Waves, label: t('swimming'), href: '/activities/swimming' },
        { icon: MapPin, label: t('fields'), href: '/activities/fields' }
      ]
    },
    { icon: Users, label: t('clients'), href: '/clients' },
    { icon: Users, label: t('users'), href: '/users' },
    { icon: CreditCard, label: t('payments'), href: '/payments' },
    { icon: Shield, label: t('roles'), href: '/roles' },
    { icon: BarChart3, label: t('reports'), href: '/reports' },
    { icon: Settings, label: t('settings'), href: '/settings' },
  ];

  const sidebarVariants: Variants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: {
      x: language === 'ar' ? 260 : -260,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    }
  };

  return (
    <>
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <motion.aside
        variants={sidebarVariants}
        animate={sidebarOpen ? "open" : "closed"}
        className={cn(
          'fixed inset-y-0 flex w-64 flex-col sidebar-gradient text-sidebar-foreground shadow-md transition-transform duration-300 lg:sticky lg:left-0 lg:top-0 lg:z-auto lg:translate-x-0 dark:neon-shadow',
          language === 'ar' ? 'right-0' : 'left-0'
        )}
      >
        <div className="flex flex-col h-full">
      <div className="flex items-center space-x-2">
  <AppLogo variant="primary" className="h-10" />
  <AppLogo variant="secondary" className="h-8" />
</div>

          <nav className="flex-1 p-4 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.href}>
                  <NavLink
                    to={item.href}
                    onClick={showLoading}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors',
                        'text-muted hover:bg-primary/5',
                        isActive && 'bg-primary/10 text-primary'
                      )
                    }
                  >
                    <Icon className="w-5 h-5 dark:text-fuchsia-400" />
                    <span>{item.label}</span>
                  </NavLink>
                  {item.subItems && (
                    <div className={cn('ml-6 space-y-1 mt-1', language === 'ar' ? 'mr-6 ml-0' : '')}>
                      {item.subItems.map((sub) => (
                        <NavLink
                          key={sub.href}
                          to={sub.href}
                          onClick={showLoading}
                          className={({ isActive }) =>
                            cn(
                              'flex items-center gap-2 px-3 py-1 rounded-md text-sm transition-colors',
                              'text-muted hover:bg-primary/5',
                              isActive && 'bg-primary/10 text-primary'
                            )
                          }
                        >
                          <sub.icon className="w-4 h-4 dark:text-fuchsia-400" />
                          {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
