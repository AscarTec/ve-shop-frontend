
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Calendar,
  DollarSign,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

// Mock data for dashboard analytics
const bookingData = [
  { month: 'Jan', bookings: 245, revenue: 12250, growth: 12 },
  { month: 'Feb', bookings: 312, revenue: 15600, growth: 27 },
  { month: 'Mar', bookings: 289, revenue: 14450, growth: 18 },
  { month: 'Apr', bookings: 378, revenue: 18900, growth: 31 },
  { month: 'May', bookings: 456, revenue: 22800, growth: 21 },
  { month: 'Jun', bookings: 523, revenue: 26150, growth: 15 },
];

const activityData = [
  { name: 'Swimming Pool', bookings: 145, percentage: 35, color: '#3B82F6' },
  { name: 'Football Field', bookings: 98, percentage: 24, color: '#10B981' },
  { name: 'Basketball Court', bookings: 87, percentage: 21, color: '#F59E0B' },
  { name: 'Tennis Court', bookings: 82, percentage: 20, color: '#EF4444' },
];

const weeklyData = [
  { day: 'Mon', morning: 45, afternoon: 67, evening: 89 },
  { day: 'Tue', morning: 52, afternoon: 73, evening: 95 },
  { day: 'Wed', morning: 48, afternoon: 69, evening: 87 },
  { day: 'Thu', morning: 61, afternoon: 81, evening: 103 },
  { day: 'Fri', morning: 55, afternoon: 78, evening: 112 },
  { day: 'Sat', morning: 73, afternoon: 95, evening: 134 },
  { day: 'Sun', morning: 68, afternoon: 89, evening: 125 },
];

const revenueData = [
  { month: 'Jan', revenue: 12250, target: 15000 },
  { month: 'Feb', revenue: 15600, target: 15000 },
  { month: 'Mar', revenue: 14450, target: 15000 },
  { month: 'Apr', revenue: 18900, target: 18000 },
  { month: 'May', revenue: 22800, target: 20000 },
  { month: 'Jun', revenue: 26150, target: 25000 },
];

export default function PremiumDashboard() {
  const { t } = useTranslation();
  const [timeRange, setTimeRange] = useState('6months');

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

  const stats = [
    {
      title: 'Total Bookings',
      value: '2,847',
      change: '+12.5%',
      trend: 'up',
      icon: Calendar,
      gradient: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20'
    },
    {
      title: 'Active Members',
      value: '1,234',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      gradient: 'from-emerald-500 to-emerald-600',
      bgGradient: 'from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20'
    },
    {
      title: 'Monthly Revenue',
      value: '$26,150',
      change: '+15.3%',
      trend: 'up',
      icon: DollarSign,
      gradient: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20'
    },
    {
      title: 'Occupancy Rate',
      value: '87.3%',
      change: '+3.1%',
      trend: 'up',
      icon: Activity,
      gradient: 'from-orange-500 to-orange-600',
      bgGradient: 'from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50 dark:from-slate-950 dark:via-blue-950/30 dark:to-indigo-950">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-900 dark:from-slate-100 dark:via-blue-200 dark:to-indigo-100 bg-clip-text text-transparent">
              Sports Analytics Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg mt-2">
              Real-time insights into your sports facility performance
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trend === 'up' ? ArrowUpRight : ArrowDownRight;
            
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="relative overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl group hover:scale-105">
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <CardContent className="relative p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge variant="secondary" className={`flex items-center gap-1 ${
                        stat.trend === 'up' ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30' : 'text-red-600 bg-red-50 dark:bg-red-900/30'
                      }`}>
                        <TrendIcon className="w-3 h-3" />
                        {stat.change}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                        {stat.value}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Bookings Chart */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Monthly Bookings Trend
                </CardTitle>
                <CardDescription>Booking volume over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{
                  bookings: { label: "Bookings", color: "hsl(217, 91%, 60%)" }
                }} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={bookingData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="bookings" fill="url(#bookingsGradient)" radius={[4, 4, 0, 0]} />
                      <defs>
                        <linearGradient id="bookingsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3B82F6" />
                          <stop offset="100%" stopColor="#1D4ED8" />
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Revenue vs Target */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  Revenue vs Target
                </CardTitle>
                <CardDescription>Monthly revenue performance against targets</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{
                  revenue: { label: "Revenue", color: "hsl(142, 76%, 36%)" },
                  target: { label: "Target", color: "hsl(142, 76%, 60%)" }
                }} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#10B981" 
                        strokeWidth={3}
                        dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="target" 
                        stroke="#6EE7B7" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ fill: '#6EE7B7', strokeWidth: 2, r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Activity Distribution */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-purple-600" />
                  Activity Distribution
                </CardTitle>
                <CardDescription>Booking distribution by sport type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center">
                  <div className="w-1/2">
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={activityData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="percentage"
                        >
                          {activityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="w-1/2 space-y-3">
                    {activityData.map((activity, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: activity.color }}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                            {activity.name}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {activity.bookings} bookings ({activity.percentage}%)
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Weekly Pattern */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-orange-600" />
                  Weekly Usage Pattern
                </CardTitle>
                <CardDescription>Hourly booking patterns throughout the week</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{
                  morning: { label: "Morning", color: "hsl(43, 96%, 56%)" },
                  afternoon: { label: "Afternoon", color: "hsl(25, 95%, 53%)" },
                  evening: { label: "Evening", color: "hsl(20, 90%, 48%)" }
                }} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area 
                        type="monotone" 
                        dataKey="morning" 
                        stackId="1"
                        stroke="#F59E0B" 
                        fill="url(#morningGradient)"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="afternoon" 
                        stackId="1"
                        stroke="#F97316" 
                        fill="url(#afternoonGradient)"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="evening" 
                        stackId="1"
                        stroke="#EA580C" 
                        fill="url(#eveningGradient)"
                      />
                      <defs>
                        <linearGradient id="morningGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.8} />
                          <stop offset="100%" stopColor="#F59E0B" stopOpacity={0.2} />
                        </linearGradient>
                        <linearGradient id="afternoonGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#F97316" stopOpacity={0.8} />
                          <stop offset="100%" stopColor="#F97316" stopOpacity={0.2} />
                        </linearGradient>
                        <linearGradient id="eveningGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#EA580C" stopOpacity={0.8} />
                          <stop offset="100%" stopColor="#EA580C" stopOpacity={0.2} />
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
