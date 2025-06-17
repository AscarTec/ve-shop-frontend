
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import AuthCard from '@/components/auth/AuthCard';
import { Button } from '@/components/ui/button';

const Landing = () => {
  const { t } = useTranslation();
  const [showLoginCard, setShowLoginCard] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Logo/Brand */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Sports Booking
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              احجز أنشطتك الرياضية المفضلة بسهولة - السباحة، الملاعب، والمزيد
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm"
            >
              <div className="text-primary-500 text-3xl mb-3">🏊‍♂️</div>
              <h3 className="font-semibold text-gray-900 mb-2">السباحة</h3>
              <p className="text-gray-600 text-sm">حجز أوقات السباحة الخاصة والمدارس</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm"
            >
              <div className="text-secondary-500 text-3xl mb-3">⚽</div>
              <h3 className="font-semibold text-gray-900 mb-2">الملاعب</h3>
              <p className="text-gray-600 text-sm">احجز ملاعب كرة القدم والتنس</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm"
            >
              <div className="text-accent-500 text-3xl mb-3">📅</div>
              <h3 className="font-semibold text-gray-900 mb-2">إدارة سهلة</h3>
              <p className="text-gray-600 text-sm">نظام حجز متطور وسهل الاستخدام</p>
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              onClick={() => setShowLoginCard(true)}
              className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              تسجيل الدخول
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Login Card Modal */}
      <AnimatePresence>
        {showLoginCard && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setShowLoginCard(false)}
            />
            
            {/* Login Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
            >
              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={() => setShowLoginCard(false)}
                  className="absolute -top-2 -right-2 z-10 bg-white hover:bg-gray-100 rounded-full p-2 shadow-lg"
                >
                  <X className="w-4 h-4" />
                </Button>
                
                <AuthCard onClose={() => setShowLoginCard(false)} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Landing;
