
import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/useAppStore';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Info, TrendingUp, Users, Calendar, Activity, Waves, MapPin, CreditCard } from 'lucide-react';

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
      case '/activities/swimming':
        return {
          icon: Waves,
          title: 'Swimming Pool Management',
          description: 'Manage pool schedules and bookings.',
          stats: [
            { label: 'Available Slots', value: '12' },
            { label: 'Booked Today', value: '8' },
            { label: 'Pool Capacity', value: '25' },
          ]
        };
      case '/activities/fields':
        return {
          icon: MapPin,
          title: 'Sports Fields',
          description: 'Manage field bookings and maintenance.',
          stats: [
            { label: 'Total Fields', value: '6' },
            { label: 'Available Now', value: '4' },
            { label: 'Under Maintenance', value: '1' },
          ]
        };
      case '/clients':
        return {
          icon: Users,
          title: 'Client Management',
          description: 'Manage customer accounts and memberships.',
          stats: [
            { label: 'Active Members', value: '856' },
            { label: 'New This Month', value: '45' },
            { label: 'Premium Members', value: '234' },
          ]
        };
      case '/payments':
        return {
          icon: CreditCard,
          title: 'Payment Processing',
          description: 'Track payments and financial transactions.',
          stats: [
            { label: 'Today\'s Revenue', value: '$2,340' },
            { label: 'Pending Payments', value: '12' },
            { label: 'Refunds', value: '3' },
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
        type: "spring" as const, 
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
      } w-80 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 z-20 transition-all duration-300`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl">
          <Icon className="w-6 h-6 text-primary" />
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
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50/50 dark:bg-gray-700/30 rounded-xl">
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </span>
              <span className="font-bold text-gray-900 dark:text-white text-lg">
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
