
import React from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import AppLogo from '@/components/ui/AppLogo';

export function SidebarHeader() {
  const { sidebarOpen, language } = useAppStore();
  const { t } = useTranslation();
  const isRTL = language === 'ar';

  return (
    <div
      className={cn(
        'flex items-center gap-3 p-4 border-b border-sidebar-border bg-gradient-primary dark:bg-gradient-primary-dark',
        !sidebarOpen && 'lg:p-2 lg:justify-center'
      )}
    >
      {sidebarOpen ? (
        <div className="flex items-center gap-2">
          <AppLogo variant="secondary" className="h-16" />
          <AppLogo className="h-14" />
        </div>
      ) : (
        <AppLogo variant="secondary" className="h-12" />
      )}

 
    </div>
  );
}
