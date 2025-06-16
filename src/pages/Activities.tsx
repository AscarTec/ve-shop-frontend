
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Activity, Waves, MapPin, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Activities = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const activities = [
    {
      id: 'swimming',
      title: 'Swimming Pool',
      description: 'Olympic-size swimming pool with lanes',
      icon: Waves,
      color: 'from-blue-500 to-cyan-500',
      stats: {
        available: '8/12',
        capacity: '25 people',
        duration: '1 hour slots',
        price: '$25/hour'
      },
      image: 'bg-gradient-to-br from-blue-400/20 to-cyan-400/20'
    },
    {
      id: 'fields',
      title: 'Sports Fields',
      description: 'Football, basketball, and tennis courts',
      icon: MapPin,
      color: 'from-emerald-500 to-green-500',
      stats: {
        available: '4/6',
        capacity: '22 players',
        duration: '2 hour slots',
        price: '$45/hour'
      },
      image: 'bg-gradient-to-br from-emerald-400/20 to-green-400/20'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 300, damping: 30 }
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
          {t('activities')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Manage all sports activities and facilities
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
      >
        {activities.map((activity) => {
          const Icon = activity.icon;
          
          return (
            <motion.div key={activity.id} variants={itemVariants}>
              <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 group hover:scale-105 cursor-pointer h-full">
                <div className={`h-32 ${activity.image} relative overflow-hidden`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${activity.color} opacity-60`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon className="w-16 h-16 text-white drop-shadow-lg" />
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                    {activity.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    {activity.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>Available</span>
                      </div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {activity.stats.available}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>Capacity</span>
                      </div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {activity.stats.capacity}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>Duration</span>
                      </div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {activity.stats.duration}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span>$</span>
                        <span>Price</span>
                      </div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {activity.stats.price}
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => navigate(`/activities/${activity.id}`)}
                    className={`w-full bg-gradient-to-r ${activity.color} hover:scale-105 transition-all duration-300 text-white font-semibold py-3`}
                  >
                    Manage {activity.title}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Activities;
