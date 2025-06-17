
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
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        animate={sidebarOpen ? "open" : "closed"}
        className={cn(
          'sidebar-panel lg:translate-x-0 lg:static lg:z-auto',
          language === 'ar' ? 'sidebar-panel-rtl' : 'sidebar-panel-ltr'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-soft">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-500 rounded-xl flex items-center justify-center shadow-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-heading">
                  Sports Hub
                </h1>
                <p className="text-xs text-muted">
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

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.href}>
                  <NavLink
                    to={item.href}
                    className={({ isActive }) =>
                      cn(
                        'nav-link group',
                        isActive ? 'nav-link-active' : 'nav-link-inactive'
                      )
                    }
                  >
                    <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                  
                  {/* Sub-items */}
                  {item.subItems && (
                    <div className={cn(
                      'mt-2 space-y-1',
                      language === 'ar' ? 'mr-6' : 'ml-6'
                    )}>
                      {item.subItems.map((subItem) => {
                        const SubIcon = subItem.icon;
                        return (
                          <NavLink
                            key={subItem.href}
                            to={subItem.href}
                            className={({ isActive }) =>
                              cn(
                                'flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-all duration-200',
                                isActive
                                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                                  : 'text-muted hover:bg-gray-50 dark:hover:bg-gray-800/50'
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
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
