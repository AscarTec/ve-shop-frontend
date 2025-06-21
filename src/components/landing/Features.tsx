
import React from 'react';
import { motion } from 'framer-motion';
import { Waves, Target, Calendar, Users, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Features = () => {
  const features = [
    {
      icon: Waves,
      title: 'حجز السباحة',
      description: 'احجز حصص السباحة الخاصة والمدارس مع أفضل المدربين',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Target,
      title: 'الملاعب الرياضية',
      description: 'ملاعب كرة القدم والسلة والتنس بأعلى المعايير',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Calendar,
      title: 'حجز سهل وسريع',
      description: 'نظام حجز متطور مع تأكيد فوري وإشعارات تلقائية',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Users,
      title: 'إدارة العملاء',
      description: 'نظام شامل لإدارة العملاء والحجوزات والمدفوعات',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              لماذا تختار 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Sports Hub</span>؟
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              نقدم أفضل الخدمات الرياضية مع تقنيات حديثة لضمان تجربة مميزة لك ولعائلتك
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  <ChevronRight className="w-5 h-5 text-blue-600 mx-auto mt-4 group-hover:translate-x-1 transition-transform duration-300" />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
