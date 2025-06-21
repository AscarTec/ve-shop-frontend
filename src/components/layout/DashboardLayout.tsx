
import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/useAppStore';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  topbar: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  sidebar,
  topbar
}) => {
  const { sidebarOpen, language } = useAppStore();

  return (
    <div className="content-wrapper">
      {sidebar}
      
      <motion.div
 className={cn(
  "min-h-screen flex transition-all duration-300",
  language === 'ar' ? "flex-row-reverse" : "flex-row"
)}
        layout
      >
        {topbar}
        
        <main className="min-h-[calc(100vh-4rem)] p-6">
          {children}
        </main>
      </motion.div>
    </div>
  );
};

export default DashboardLayout;
