
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Waves, Clock, Users, Calendar, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Swimming = () => {
  const [selectedDate, setSelectedDate] = useState('2024-01-20');

  const timeSlots = [
    { time: '06:00 - 07:00', status: 'available', capacity: '12/25', instructor: 'Ahmed Ali' },
    { time: '07:00 - 08:00', status: 'booked', capacity: '25/25', instructor: 'Sarah Ahmed' },
    { time: '08:00 - 09:00', status: 'available', capacity: '8/25', instructor: 'Omar Hassan' },
    { time: '09:00 - 10:00', status: 'maintenance', capacity: '0/25', instructor: '-' },
    { time: '10:00 - 11:00', status: 'available', capacity: '15/25', instructor: 'Layla Mohammed' },
    { time: '11:00 - 12:00', status: 'booked', capacity: '25/25', instructor: 'Ahmed Ali' },
    { time: '14:00 - 15:00', status: 'available', capacity: '3/25', instructor: 'Sarah Ahmed' },
    { time: '15:00 - 16:00', status: 'available', capacity: '18/25', instructor: 'Omar Hassan' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400';
      case 'booked':
        return 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400';
      case 'maintenance':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-600 dark:text-gray-400';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl">
            <Waves className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Swimming Pool Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
              Olympic-size pool with professional instruction
            </p>
          </div>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Session
        </Button>
      </motion.div>

      {/* Pool Stats */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        {[
          { label: 'Pool Capacity', value: '25 people', icon: Users, color: 'text-blue-600' },
          { label: 'Sessions Today', value: '8 sessions', icon: Clock, color: 'text-emerald-600' },
          { label: 'Current Occupancy', value: '15/25', icon: Users, color: 'text-purple-600' },
          { label: 'Water Temperature', value: '28°C', icon: Waves, color: 'text-cyan-600' },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div key={index} variants={itemVariants}>
              <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-0 shadow-xl">
                <CardContent className="flex items-center gap-4 p-6">
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Date Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Schedule for {selectedDate}
            </CardTitle>
            <CardDescription>
              Manage swimming sessions and instructor assignments
            </CardDescription>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Time Slots */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {timeSlots.map((slot, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    {slot.time}
                  </div>
                  <Badge className={getStatusColor(slot.status)}>
                    {slot.status.charAt(0).toUpperCase() + slot.status.slice(1)}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Capacity</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{slot.capacity}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Instructor</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{slot.instructor}</span>
                  </div>
                  
                  {slot.status === 'available' && (
                    <div className="pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
                      <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                        Book Session
                      </Button>
                    </div>
                  )}
                  
                  {slot.status === 'maintenance' && (
                    <div className="pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
                      <Button size="sm" variant="outline" className="w-full">
                        Schedule Maintenance
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Swimming;
