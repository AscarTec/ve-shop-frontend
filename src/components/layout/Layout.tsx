
import React, { useEffect } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import AuthModal from '@/components/auth/AuthModal';
import ContextCard from './ContextCard';
import DashboardLayout from './DashboardLayout';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { language, theme } = useAppStore();

  useEffect(() => {
    // Set theme
    document.documentElement.classList.toggle('dark', theme === 'dark');
    
    // Set direction and language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Add font loading class
    document.documentElement.classList.add('antialiased');
  }, [theme, language]);

  return (
    <div className="min-h-screen gradient-surface transition-all duration-300">
      <DashboardLayout
        sidebar={<Sidebar />}
        topbar={<Topbar />}
      >
        {children}
        <ContextCard />
      </DashboardLayout>
      <AuthModal />
    </div>
  );
};

export default Layout;
