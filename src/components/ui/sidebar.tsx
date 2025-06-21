
// Sidebar.tsx
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useAppStore } from '@/stores/useAppStore';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard, Calendar, Activity, Users, Shield, BarChart3,
  Settings, X, Waves, MapPin, CreditCard
} from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';

const Sidebar = () => {
  const { t } = useTranslation();
  const { sidebarOpen, setSidebarOpen, language } = useAppStore();

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
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: {
      x: language === 'ar' ? 320 : -320,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };

  return (
    <>
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <motion.aside
        variants={sidebarVariants}
        animate={sidebarOpen ? "open" : "closed"}
        className={cn(
          'fixed top-0 h-full w-72 z-50 shadow-xl transition-transform duration-300 ease-out bg-white dark:bg-gray-900',
          language === 'ar' ? 'right-0' : 'left-0'
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-purple-600">
            <AppLogo />
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 rounded-md hover:bg-white/10">
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <nav className="flex-1 p-4 overflow-y-auto bg-white dark:bg-gray-900">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.href}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors',
                        'text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-800',
                        isActive && 'bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-blue-300'
                      )
                    }
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </NavLink>
                  {item.subItems && (
                    <div className={cn('ml-6 space-y-1 mt-1', language === 'ar' ? 'mr-6 ml-0' : '')}>
                      {item.subItems.map((sub) => (
                        <NavLink
                          key={sub.href}
                          to={sub.href}
                          className={({ isActive }) =>
                            cn(
                              'flex items-center gap-2 px-3 py-1 rounded-md text-sm transition-colors',
                              'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
                              isActive && 'bg-blue-50 dark:bg-gray-700 text-blue-700 dark:text-blue-300'
                            )
                          }
                        >
                          <sub.icon className="w-4 h-4" />
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
