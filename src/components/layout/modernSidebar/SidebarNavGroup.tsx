
import React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { SidebarNavItem } from './SidebarNavItem';
import { SidebarGroup } from './types';

interface SidebarNavGroupProps {
  group: SidebarGroup;
  isCollapsed: boolean;
  currentPath: string;
  isRTL: boolean;
}

export function SidebarNavGroup({ group, isCollapsed, currentPath, isRTL }: SidebarNavGroupProps) {
  const { t } = useTranslation();

  return (
    <div>
      {/* Group Label */}
      {!isCollapsed && (
        <h3 className={cn(
          'mb-3 px-3 text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider',
          isRTL ? 'text-right' : 'text-left'
        )}>
          {t(group.label)}
        </h3>
      )}

      {/* Separator for collapsed state */}
      {isCollapsed && (
        <div className="mx-3 mb-4 border-t border-sidebar-border opacity-30" />
      )}

      {/* Navigation Items */}
      <ul className="space-y-1" role="list">
        {group.items.map((item) => (
          <li key={item.href}>
            <SidebarNavItem
              item={item}
              isCollapsed={isCollapsed}
              isActive={currentPath === item.href || currentPath.startsWith(item.href + '/')}
              isRTL={isRTL}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
