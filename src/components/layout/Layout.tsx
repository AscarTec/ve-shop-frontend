
import React, { useEffect } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import SidebarRail from './SidebarRail';
import Topbar from './Topbar';
import AuthModal from '@/components/auth/AuthModal';
import { cn } from '@/lib/utils';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language, theme, sidebarOpen, setSidebarOpen } = useAppStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    document.documentElement.style.setProperty(
      '--gradient-direction',
      language === 'ar' ? 'to left' : 'to right'
    );
    document.documentElement.classList.add('antialiased');
  }, [theme, language]);

  // set initial sidebar state based on screen width
  useEffect(() => {
    const width = window.innerWidth;
    if (width >= 1536) {
      setSidebarOpen(true);
    } else {
      setSidebarOpen(false);
    }
  }, [setSidebarOpen]);

  const isRTL = language === 'ar';

  const paddingClasses = cn(
    'transition-all duration-200 ease-in-out',
    sidebarOpen
      ? isRTL
        ? 'lg:pr-72'
        : 'lg:pl-72'
      : isRTL
        ? 'lg:pr-16'
        : 'lg:pl-16'
  );

  return (
    <div
      className={cn(
        'min-h-screen flex bg-background transition-all duration-200 ease-in-out',
        isRTL ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Sidebar */}
      <SidebarRail />

      {/* Main Content Area */}
      <div
        className="flex flex-col flex-1 min-h-screen transition-all duration-200 ease-in-out"
      >
        {/* Topbar */}
        <Topbar className={paddingClasses} />
        
        {/* Page Content */}
        <main className={cn('flex-1 overflow-auto bg-gradient-to-br from-background to-muted/20', paddingClasses)}>
          <div className="container mx-auto p-6 max-w-7xl">
            {children}
          </div>
        </main>
      </div>

      {/* Auth Modal */}
      <AuthModal />
    </div>
  );
};

export default Layout;
