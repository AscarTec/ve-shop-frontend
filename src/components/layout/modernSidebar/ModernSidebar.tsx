
import React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppStore } from '@/stores/useAppStore';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { SidebarHeader } from './SidebarHeader';
import { SidebarNavGroup } from './SidebarNavGroup';
import { sidebarConfig } from './sidebarConfig';
import { Button } from '@/components/ui/button';

export function ModernSidebar() {
  const { t } = useTranslation();
  const { sidebarOpen, setSidebarOpen, language } = useAppStore();
  const location = useLocation();
  const isRTL = language === 'ar';

  // Animation variants for sidebar
  const sidebarVariants: Variants = {
    open: {
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        duration: 0.3
      }
    },
    closed: {
      x: isRTL ? 280 : -280,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        duration: 0.3
      }
    }
  };

  const overlayVariants: Variants = {
    open: { opacity: 1 },
    closed: { opacity: 0 }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial="closed"
        animate={sidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className={cn(
          'fixed top-0 z-50 h-screen bg-sidebar border-sidebar-border shadow-xl lg:static lg:shadow-none',
          'flex flex-col transition-all duration-300 ease-out',
          isRTL ? 'right-0 border-l' : 'left-0 border-r',
          sidebarOpen ? 'w-72 lg:w-64' : 'w-72 lg:w-16'
        )}
        role="navigation"
        aria-label={t('navigation.mainNavigation')}
      >
        {/* Header */}
        <SidebarHeader />

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin scrollbar-thumb-sidebar-accent/30">
          <nav className="space-y-6">
            {sidebarConfig.groups.map((group, index) => (
              <SidebarNavGroup
                key={group.label}
                group={group}
                isCollapsed={!sidebarOpen}
                currentPath={location.pathname}
                isRTL={isRTL}
              />
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className={cn(
          'p-4 border-t border-sidebar-border bg-sidebar-accent/5',
          !sidebarOpen && 'lg:p-2'
        )}>
          {sidebarOpen ? (
            <div className="text-xs text-sidebar-foreground/60 text-center">
              <p className="font-medium">{t('app.name')}</p>
              <p>{t('app.version')} 2.0</p>
            </div>
          ) : (
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg mx-auto opacity-60" />
          )}
        </div>

        {/* Mobile Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(false)}
          className={cn(
            'absolute top-4 z-10 lg:hidden',
            isRTL ? 'left-4' : 'right-4'
          )}
          aria-label={t('navigation.closeSidebar')}
        >
          <X className="h-5 w-5" />
        </Button>
      </motion.aside>
    </>
  );
}
