
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useAppStore } from '@/stores/useAppStore';
import { cn } from '@/lib/utils';
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
  MapPin,
  CreditCard
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
    { icon: CreditCard, label: 'Payments', href: '/payments' },
    { icon: Shield, label: t('roles'), href: '/roles' },
    { icon: BarChart3, label: t('reports'), href: '/reports' },
    { icon: Settings, label: t('settings'), href: '/settings' },
  ];

  const sidebarVariants: Variants = {
    open: {
      x: 0,
      transition: { 
        type: "spring" as const, 
        stiffness: 300, 
        damping: 30 
      }
    },
    closed: {
      x: language === 'ar' ? 320 : -320,
      transition: { 
        type: "spring" as const, 
        stiffness: 300, 
        damping: 30 
      }
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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        animate={sidebarOpen ? "open" : "closed"}
        className={cn(
          'fixed top-0 h-full w-80 bg-white dark:bg-gray-900 z-50 shadow-2xl transition-transform duration-300 ease-out lg:translate-x-0 lg:static lg:z-auto border-r border-gray-200 dark:border-gray-700',
          language === 'ar' ? 'right-0 lg:order-2' : 'left-0'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shadow-lg backdrop-blur-sm">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">
                  Sports Hub
                </h1>
                <p className="text-xs text-blue-100">
                  Booking Platform
                </p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.href}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400',
                        isActive && 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:from-blue-600 hover:to-purple-600 hover:text-white'
                      )
                    }
                  >
                    <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                  
                  {/* Sub-items */}
                  {item.subItems && (
                    <div className={cn(
                      'mt-2 space-y-1 pl-4',
                      language === 'ar' ? 'pr-4 pl-0' : 'pl-8'
                    )}>
                      {item.subItems.map((subItem) => {
                        const SubIcon = subItem.icon;
                        return (
                          <NavLink
                            key={subItem.href}
                            to={subItem.href}
                            className={({ isActive }) =>
                              cn(
                                'flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all duration-200 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200',
                                isActive && 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium'
                              )
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

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              © 2024 Sports Hub Platform
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
