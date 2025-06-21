
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Play, ArrowRight, Waves, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onLoginClick: () => void;
}

const Hero = ({ onLoginClick }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=2000')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-purple-900/80 to-blue-900/90" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20"
            >
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-medium">منصة الحجز الرياضي الرائدة</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              🏆 منصة الحجز الرياضي
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                الآلية
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              نظام متطور لإدارة وحجز الأنشطة الرياضية مع إشعارات تلقائية ونظام دفع آمن. 
              احجز الآن واستمتع بتجربة رياضية لا تُنسى
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              onClick={onLoginClick}
              size="lg"
              variant="gradient"
              className="text-lg px-8 py-6 shadow-2xl hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105"
            >
              <ArrowRight className="ml-2 h-6 w-6" />
              ابدأ الآن - مجاناً
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 border-2 border-white/50 text-white hover:bg-white/10 backdrop-blur-md transition-all duration-300"
            >
              <Play className="w-5 h-5 mr-2" />
              شاهد العرض التوضيحي
            </Button>
          </div>

          {/* Floating Elements */}
          <div className="hidden lg:block">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-1/4 left-10 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20"
            >
              <Waves className="w-8 h-8 text-blue-400 mb-2" />
              <p className="text-white text-sm font-medium">سباحة</p>
            </motion.div>
            
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute top-1/3 right-10 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20"
            >
              <Target className="w-8 h-8 text-green-400 mb-2" />
              <p className="text-white text-sm font-medium">ملاعب</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
