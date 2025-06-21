
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Star } from 'lucide-react';

const About = () => {
  const highlights = [
    { icon: Shield, text: "أمان وموثوقية في جميع المعاملات" },
    { icon: Clock, text: "خدمة عملاء على مدار الساعة" },
    { icon: Star, text: "تقييم 5 نجوم من عملائنا" }
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">من نحن</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Sports Hub هي منصة رائدة في مجال الحجز الرياضي، نقدم خدمات متطورة لحجز الملاعب وأحواض السباحة 
              مع نظام إدارة شامل للعملاء والمدفوعات.
            </p>
            <div className="space-y-6">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-lg text-gray-700 font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=800"
                alt="Sports facilities"
                className="rounded-3xl shadow-2xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-3xl"></div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -top-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              <div className="text-3xl font-bold text-blue-600">500+</div>
              <div className="text-gray-600 font-medium">عميل سعيد</div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              <div className="text-3xl font-bold text-purple-600">95%</div>
              <div className="text-gray-600 font-medium">معدل الرضا</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
