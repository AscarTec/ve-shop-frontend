
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useAppStore } from '@/stores/useAppStore';
import { 
  LayoutDashboard, 
  Calendar, 
  Activity, 
  Users, 
  Shield, 
  BarChart3, 
  Settings, 
  X 
} from 'lucide-react';

const Sidebar = () => {
  const { t } = useTranslation();
  const { sidebarOpen, setSidebarOpen, language } = useAppStore();
  
  const menuItems = [
    { icon: LayoutDashboard, label: t('dashboard'), href: '/' },
    { icon: Calendar, label: t('bookings'), href: '/bookings' },
    { icon: Activity, label: t('activities'), href: '/activities' },
    { icon: Users, label: t('users'), href: '/users' },
    { icon: Shield, label: t('roles'), href: '/roles' },
    { icon: BarChart3, label: t('reports'), href: '/reports' },
    { icon: Settings, label: t('settings'), href: '/settings' },
  ];

  const sidebarVariants = {
    open: {
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    closed: {
      x: language === 'ar' ? 320 : -320,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };

  return (
    <>
      {/* Backdrop */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        animate={sidebarOpen ? "open" : "closed"}
        className={`fixed top-0 ${language === 'ar' ? 'right-0' : 'left-0'} h-full w-80 bg-white dark:bg-gray-900 border-${language === 'ar' ? 'l' : 'r'} border-gray-200 dark:border-gray-700 z-50 lg:translate-x-0 lg:static lg:z-auto`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            Sports Booking
          </h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </motion.aside>
    </>
  );
};

export default Sidebar;
