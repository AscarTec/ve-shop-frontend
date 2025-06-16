
import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/useAppStore';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Info, TrendingUp, Users, Calendar } from 'lucide-react';

const ContextCard = () => {
  const { language, sidebarOpen } = useAppStore();
  const location = useLocation();
  const { t } = useTranslation();

  const getContextInfo = () => {
    const path = location.pathname;
    
    switch (path) {
      case '/':
        return {
          icon: TrendingUp,
          title: 'Dashboard Overview',
          description: 'Monitor your business performance and key metrics.',
          stats: [
            { label: t('totalBookings'), value: '1,234' },
            { label: t('activeUsers'), value: '856' },
            { label: t('revenue'), value: '$12,450' },
          ]
        };
      case '/bookings':
        return {
          icon: Calendar,
          title: 'Booking Management',
          description: 'Track and manage all customer bookings.',
          stats: [
            { label: t('pending'), value: '23' },
            { label: t('confirmed'), value: '145' },
            { label: t('cancelled'), value: '12' },
          ]
        };
      case '/users':
        return {
          icon: Users,
          title: 'User Management',
          description: 'Manage user accounts and permissions.',
          stats: [
            { label: 'Total Users', value: '856' },
            { label: 'Active Today', value: '234' },
            { label: 'New This Week', value: '45' },
          ]
        };
      default:
        return {
          icon: Info,
          title: 'Quick Info',
          description: 'Contextual information will appear here.',
          stats: []
        };
    }
  };

  const contextInfo = getContextInfo();
  const Icon = contextInfo.icon;

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      x: language === 'ar' ? -100 : 100,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        delay: 0.2
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className={`fixed bottom-6 ${
        language === 'ar' 
          ? `left-6 ${sidebarOpen ? 'lg:left-[calc(320px+24px)]' : 'lg:left-6'}` 
          : `right-6 ${sidebarOpen ? 'lg:right-[calc(320px+24px)]' : 'lg:right-6'}`
      } w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 z-20 transition-all duration-300`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {contextInfo.title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {contextInfo.description}
          </p>
        </div>
      </div>

      {contextInfo.stats.length > 0 && (
        <div className="space-y-3">
          {contextInfo.stats.map((stat, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ContextCard;
