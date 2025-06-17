
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Waves, Users, School, Clock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PrivateBookings from './PrivateBookings';
import FreeTimeBookings from './FreeTimeBookings';
import SchoolsBookings from './SchoolsBookings';
import { useTranslation } from 'react-i18next';

const SwimmingTabs = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('private');

  const tabs = [
    { 
      id: 'private', 
      label: 'حجوزات خاصة', 
      icon: Users, 
      component: PrivateBookings,
      color: 'text-blue-600'
    },
    { 
      id: 'freetime', 
      label: 'الأوقات الحرة', 
      icon: Clock, 
      component: FreeTimeBookings,
      color: 'text-green-600'
    },
    { 
      id: 'schools', 
      label: 'المدارس', 
      icon: School, 
      component: SchoolsBookings,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <div className="p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl">
          <Waves className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            إدارة حمام السباحة
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
            حمام أولمبي مع تدريب مهني
          </p>
        </div>
      </motion.div>

      <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900 dark:text-white">
            أقسام الحجوزات
          </CardTitle>
          <CardDescription>
            إدارة جميع أنواع الحجوزات والأنشطة
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger 
                    key={tab.id} 
                    value={tab.id}
                    className="flex items-center gap-2 text-base"
                  >
                    <Icon className={`w-4 h-4 ${tab.color}`} />
                    {tab.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {tabs.map((tab) => {
              const Component = tab.component;
              return (
                <TabsContent key={tab.id} value={tab.id} className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Component />
                  </motion.div>
                </TabsContent>
              );
            })}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SwimmingTabs;
