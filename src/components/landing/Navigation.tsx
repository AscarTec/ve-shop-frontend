
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, ArrowRight, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  onLoginClick: () => void;
}

const Navigation = ({ onLoginClick }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Sports Hub
                </h1>
                <p className="text-sm text-gray-600">منصة الحجز الرياضي الآلية</p>
              </div>
            </motion.div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">الميزات</a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">من نحن</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">تواصل معنا</a>
          </div>
          
          <div className="flex items-center space-x-4 space-x-reverse">
            <Button
              onClick={onLoginClick}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3"
            >
              <ArrowRight className="ml-2 h-4 w-4" />
              دخول لوحة التحكم
            </Button>
            
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-white/20"
          >
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">الميزات</a>
              <a href="#about" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">من نحن</a>
              <a href="#contact" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">تواصل معنا</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
