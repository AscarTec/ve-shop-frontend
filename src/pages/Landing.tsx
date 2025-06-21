
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/stores/useAppStore';
import { useAuth } from '@/context/AuthContext';
import { Target, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthModal from '@/components/auth/AuthModal';

const Landing = () => {
  const { setShowAuthModal } = useAppStore();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect to dashboard if already logged in
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLoginClick = () => {
    setShowAuthModal(true);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 flex items-center justify-center relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=2000')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-purple-900/80 to-blue-900/90" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          {/* App Logo and Name */}
          <div className="flex flex-col items-center mb-12">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl mb-6">
              <Target className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              Sports Hub
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              🏆 منصة الحجز الرياضي الآلية
            </p>
            
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-12">
              نظام متطور لإدارة وحجز الأنشطة الرياضية مع إشعارات تلقائية ونظام دفع آمن
            </p>
          </div>

          {/* Single Login Button */}
          <Button
            onClick={handleLoginClick}
            size="lg"
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white text-xl px-12 py-6 shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105"
          >
            <ArrowRight className="ml-3 h-6 w-6" />
            دخول لوحة التحكم
          </Button>
        </div>
      </div>
      
      <AuthModal />
    </>
  );
};

export default Landing;
