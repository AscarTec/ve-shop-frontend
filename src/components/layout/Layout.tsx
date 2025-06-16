
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/useAppStore';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import AuthModal from '@/components/auth/AuthModal';
import ContextCard from './ContextCard';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { sidebarOpen, language, theme } = useAppStore();

  useEffect(() => {
    // Set initial theme
    document.documentElement.classList.toggle('dark', theme === 'dark');
    
    // Set initial direction and language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [theme, language]);

  const contentVariants = {
    open: {
      marginLeft: language === 'ar' ? 0 : sidebarOpen ? 320 : 0,
      marginRight: language === 'ar' ? sidebarOpen ? 320 : 0 : 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    },
    closed: {
      marginLeft: 0,
      marginRight: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <Sidebar />
      
      <motion.div
        variants={contentVariants}
        animate={sidebarOpen ? "open" : "closed"}
        className="lg:ml-0"
      >
        <Topbar />
        
        <main className="relative">
          <div className="p-6">
            {children}
          </div>
          
          {/* Context Card - positioned opposite to sidebar */}
          <ContextCard />
        </main>
      </motion.div>

      <AuthModal />
    </div>
  );
};

export default Layout;
