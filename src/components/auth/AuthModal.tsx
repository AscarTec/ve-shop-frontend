import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/stores/useAppStore';
import { X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import AuthForms from './AuthForms';

const AuthModal = () => {
  const { showAuthModal, setShowAuthModal } = useAppStore();
  const { isAuthenticated } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 300, damping: 30 }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: { duration: 0.2 }
    }
  };

  if (!showAuthModal || isAuthenticated) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        >
          {/* Header */}
          <div className="relative h-32 bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center text-white">
              <h1 className="text-2xl font-bold">Sports Booking</h1>
              <p className="text-white/90 mt-1">
                {mode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب'}
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            <AuthForms
              mode={mode}
              setMode={setMode}
              onClose={() => setShowAuthModal(false)}
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
