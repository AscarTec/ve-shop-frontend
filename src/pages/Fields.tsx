import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Clock, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Fields = () => {
  const [selectedField, setSelectedField] = useState('football');

  const fields = {
    football: {
      name: 'Football Fields',
      total: 3,
      available: 2,
      sessions: [
        { time: '08:00 - 10:00', field: 'Field A', status: 'booked', team: 'Al-Ahli Youth', players: '22/22' },
        { time: '10:00 - 12:00', field: 'Field A', status: 'available', team: '-', players: '0/22' },
        { time: '14:00 - 16:00', field: 'Field B', status: 'booked', team: 'City FC', players: '18/22' },
        { time: '16:00 - 18:00', field: 'Field B', status: 'available', team: '-', players: '0/22' },
        { time: '18:00 - 20:00', field: 'Field C', status: 'maintenance', team: '-', players: '0/22' },
      ]
    },
    basketball: {
      name: 'Basketball Courts',
      total: 2,
      available: 1,
      sessions: [
        { time: '09:00 - 10:30', field: 'Court A', status: 'booked', team: 'Eagles Basketball', players: '10/10' },
        { time: '10:30 - 12:00', field: 'Court A', status: 'available', team: '-', players: '0/10' },
        { time: '15:00 - 16:30', field: 'Court B', status: 'available', team: '-', players: '0/10' },
        { time: '17:00 - 18:30', field: 'Court B', status: 'booked', team: 'Thunder Squad', players: '8/10' },
      ]
    },
    tennis: {
      name: 'Tennis Courts',
      total: 4,
      available: 3,
      sessions: [
        { time: '07:00 - 08:30', field: 'Court 1', status: 'booked', team: 'Private Lesson', players: '2/4' },
        { time: '08:30 - 10:00', field: 'Court 1', status: 'available', team: '-', players: '0/4' },
        { time: '10:00 - 11:30', field: 'Court 2', status: 'available', team: '-', players: '0/4' },
        { time: '16:00 - 17:30', field: 'Court 3', status: 'booked', team: 'Doubles Match', players: '4/4' },
        { time: '18:00 - 19:30', field: 'Court 4', status: 'available', team: '-', players: '0/4' },
      ]
    }
  };

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

  const currentField = fields[selectedField as keyof typeof fields];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-xl">
            <MapPin className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
              Sports Fields Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
              Football, basketball, and tennis facilities
            </p>
          </div>
        </div>
        <Button className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700">
          <Plus className="w-4 h-4 mr-2" />
          Book Field
        </Button>
      </motion.div>

      {/* Field Type Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs value={selectedField} onValueChange={setSelectedField} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-0 shadow-lg">
            <TabsTrigger value="football">Football</TabsTrigger>
            <TabsTrigger value="basketball">Basketball</TabsTrigger>
            <TabsTrigger value="tennis">Tennis</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedField} className="mt-8 space-y-8">
            {/* Field Stats */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                { label: 'Total Fields', value: currentField.total, icon: MapPin, color: 'text-emerald-600' },
                { label: 'Available Now', value: currentField.available, icon: Calendar, color: 'text-blue-600' },
                { label: 'Sessions Today', value: currentField.sessions.length, icon: Clock, color: 'text-purple-600' },
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

            {/* Sessions Schedule */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Today's Schedule - {currentField.name}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentField.sessions.map((session, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:scale-105">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-xl font-bold text-gray-900 dark:text-white">
                            {session.time}
                          </div>
                          <Badge className={getStatusColor(session.status)}>
                            {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                          </Badge>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Field</span>
                            <span className="font-semibold text-gray-900 dark:text-white">{session.field}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Team/Event</span>
                            <span className="font-semibold text-gray-900 dark:text-white">{session.team}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Players</span>
                            <span className="font-semibold text-gray-900 dark:text-white">{session.players}</span>
                          </div>
                          
                          {session.status === 'available' && (
                            <div className="pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
                              <Button size="sm" className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700">
                                Book Field
                              </Button>
                            </div>
                          )}
                          
                          {session.status === 'maintenance' && (
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
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Fields;
