
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { SidebarItem } from './types';
import { useLoadingStore } from '@/stores/useLoadingStore';
import { useAppStore } from '@/stores/useAppStore';

interface SidebarNavItemProps {
  item: SidebarItem;
  isCollapsed: boolean;
  isActive: boolean;
  isRTL: boolean;
}

export function SidebarNavItem({ item, isCollapsed, isActive, isRTL }: SidebarNavItemProps) {
  const { t } = useTranslation();
  const showLoading = useLoadingStore((state) => state.showLoading);
  const { setSidebarOpen } = useAppStore();

  const NavItemContent = (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-all duration-200 relative group',
        'hover:bg-sidebar-accent/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-primary',
        isActive 
          ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-sidebar-primary/20' 
          : 'text-sidebar-foreground hover:text-sidebar-primary',
        isCollapsed && 'lg:justify-center lg:px-2'
      )}
    >
      {/* Icon */}
      <div className={cn(
        'flex-shrink-0 transition-colors duration-200',
        isActive && 'text-sidebar-primary-foreground'
      )}>
        <item.icon 
          className={cn(
            'transition-all duration-200',
            isCollapsed ? 'h-5 w-5' : 'h-5 w-5'
          )} 
        />
      </div>

      {/* Label */}
      {!isCollapsed && (
        <span className={cn(
          'truncate transition-all duration-200',
          isRTL ? 'text-right' : 'text-left'
        )}>
          {t(item.label)}
        </span>
      )}

      {/* Badge */}
      {!isCollapsed && item.badge && (
        <div className={cn(
          'ml-auto flex-shrink-0',
          isRTL && 'mr-auto ml-0'
        )}>
          <div className={cn(
            'px-2 py-0.5 text-xs font-medium rounded-full',
            isActive 
              ? 'bg-sidebar-primary-foreground/20 text-sidebar-primary-foreground'
              : 'bg-sidebar-accent text-sidebar-accent-foreground'
          )}>
            {item.badge}
          </div>
        </div>
      )}

      {/* Active Indicator */}
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className={cn(
            'absolute inset-0 bg-gradient-to-r from-sidebar-primary to-sidebar-primary/80 rounded-xl -z-10',
            'shadow-lg shadow-sidebar-primary/20'
          )}
          initial={false}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </motion.div>
  );

  const navLink = (
    <NavLink
      to={item.href}
      onClick={() => {
        showLoading();
        setSidebarOpen(false);
      }}
      className="block"
      aria-label={t(item.label)}
    >
      {NavItemContent}
    </NavLink>
  );

  // Wrap with tooltip for collapsed state
  if (isCollapsed) {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            {navLink}
          </TooltipTrigger>
          <TooltipContent 
            side={isRTL ? "left" : "right"} 
            className="font-medium"
          >
            {t(item.label)}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return navLink;
}
