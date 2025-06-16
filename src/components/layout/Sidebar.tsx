
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
  X,
  Waves,
  MapPin
} from 'lucide-react';

const Sidebar = () => {
  const { t } = useTranslation();
  const { sidebarOpen, setSidebarOpen, language } = useAppStore();
  
  const menuItems = [
    { icon: LayoutDashboard, label: t('dashboard'), href: '/' },
    { icon: Calendar, label: t('bookings'), href: '/bookings' },
    { 
      icon: Activity, 
      label: t('activities'), 
      href: '/activities',
      subItems: [
        { icon: Waves, label: 'Swimming', href: '/activities/swimming' },
        { icon: MapPin, label: 'Fields', href: '/activities/fields' }
      ]
    },
    { icon: Users, label: 'Clients', href: '/clients' },
    { icon: BarChart3, label: 'Payments', href: '/payments' },
    { icon: Shield, label: t('roles'), href: '/roles' },
    { icon: BarChart3, label: t('reports'), href: '/reports' },
    { icon: Settings, label: t('settings'), href: '/settings' },
  ];

  const sidebarVariants = {
    open: {
      x: 0,
      transition: { type: "spring" as const, stiffness: 300, damping: 30 }
    },
    closed: {
      x: language === 'ar' ? 320 : -320,
      transition: { type: "spring" as const, stiffness: 300, damping: 30 }
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
        className={`fixed top-0 ${language === 'ar' ? 'right-0' : 'left-0'} h-full w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-${language === 'ar' ? 'l' : 'r'} border-gray-200/50 dark:border-gray-700/50 z-50 lg:translate-x-0 lg:static lg:z-auto shadow-2xl`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                Sports Hub
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Booking Platform
              </p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.href}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400 shadow-lg shadow-blue-500/20'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-800/70 hover:scale-105'
                    }`
                  }
                >
                  <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
                
                {/* Sub-items for Activities */}
                {item.subItems && (
                  <div className="ml-6 mt-2 space-y-1">
                    {item.subItems.map((subItem) => {
                      const SubIcon = subItem.icon;
                      return (
                        <NavLink
                          key={subItem.href}
                          to={subItem.href}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all duration-200 ${
                              isActive
                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                            }`
                          }
                        >
                          <SubIcon className="w-4 h-4" />
                          <span>{subItem.label}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </motion.aside>
    </>
  );
};

export default Sidebar;
