
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
  isRTL: boolean;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Header translations
    'header.quickBookCourt': 'Quick Book Court',
    'header.quickBookSwimming': 'Quick Book Swimming',
    'header.newClient': 'New Client',
    'header.searchPlaceholder': 'Search...',
    'header.userName': 'John Doe',
    'header.userRole': 'Administrator',
    'header.profile': 'Profile',
    'header.settings': 'Settings',
    'header.logout': 'Logout',
    
    // Sidebar translations
    'sidebar.dashboard': 'Dashboard',
    'sidebar.bookings': 'Bookings',
    'sidebar.clients': 'Clients',
    'sidebar.facilities': 'Facilities',
    'sidebar.reports': 'Reports',
    'sidebar.settings': 'Settings',
    'sidebar.help': 'Help',
    
    // Dashboard translations
    'dashboard.title': 'Booking Dashboard',
    'dashboard.subtitle': 'Comprehensive management for sports facility bookings',
    'dashboard.filter': 'Filter',
    'dashboard.newBooking': 'New Booking',
    'dashboard.totalBookings': 'Total Bookings',
    'dashboard.activeClients': 'Active Clients',
    'dashboard.monthlyRevenue': 'Monthly Revenue',
    'dashboard.occupancyRate': 'Occupancy Rate',
    'dashboard.fromLastMonth': 'from last month',
    'dashboard.overview': 'Overview',
    'dashboard.bookings': 'Bookings',
    'dashboard.facilities': 'Facilities',
    'dashboard.reports': 'Reports',
    'dashboard.recentBookings': 'Recent Bookings',
    'dashboard.recentBookingsDesc': 'Latest bookings registered in the system',
    'dashboard.sampleClient1': 'Ahmed Mohammed',
    'dashboard.sampleClient2': 'Sarah Ahmed',
    'dashboard.sampleClient3': 'Mohammed Ali',
    'dashboard.sampleFacility1': 'Tennis Court 1',
    'dashboard.sampleFacility2': 'Swimming Pool',
    'dashboard.sampleFacility3': 'Basketball Court',
    'dashboard.confirmed': 'Confirmed',
    'dashboard.pending': 'Pending',
    'dashboard.cancelled': 'Cancelled',
    'dashboard.allBookings': 'All Bookings',
    'dashboard.allBookingsDesc': 'Manage and view all bookings',
    'dashboard.searchBookings': 'Search bookings...',
    'dashboard.bookingsContent': 'Booking management content will be added here',
    'dashboard.sportsCourts': 'Sports Courts',
    'dashboard.sportsCountsDesc': 'Manage tennis, basketball and football courts',
    'dashboard.swimmingPools': 'Swimming Pools',
    'dashboard.swimmingPoolsDesc': 'Manage pools and swimming facilities',
    'dashboard.available': 'Available',
    'dashboard.occupied': 'Occupied',
    'dashboard.analyticsReports': 'Analytics & Reports',
    'dashboard.analyticsReportsDesc': 'Detailed performance and statistics reports',
    'dashboard.reportsContent': 'Reports and analytics content will be added here',
    
    // Style Panel translations
    'stylePanel.title': 'Style Control Panel',
    'stylePanel.description': 'Customize the appearance and styling of your application',
    'stylePanel.theme': 'Theme',
    'stylePanel.colors': 'Colors',
    'stylePanel.sidebar': 'Sidebar',
    'stylePanel.layout': 'Layout',
    'stylePanel.themeMode': 'Theme Mode',
    'stylePanel.themeModeDesc': 'Choose between light, dark, or system theme',
    'stylePanel.light': 'Light',
    'stylePanel.dark': 'Dark',
    'stylePanel.system': 'System',
    'stylePanel.colorScheme': 'Color Scheme',
    'stylePanel.colorSchemeDesc': 'Select a color scheme for your application',
    'stylePanel.sidebarStyle': 'Sidebar Style',
    'stylePanel.sidebarStyleDesc': 'Customize the sidebar appearance',
    'stylePanel.headerStyle': 'Header Style',
    'stylePanel.headerStyleDesc': 'Customize the header appearance',
    'stylePanel.layoutOptions': 'Layout Options',
    'stylePanel.compactMode': 'Compact Mode',
    'stylePanel.compactModeDesc': 'Reduce spacing and padding',
    'stylePanel.animations': 'Animations',
    'stylePanel.animationsDesc': 'Enable smooth animations',
    'stylePanel.blurEffects': 'Blur Effects',
    'stylePanel.blurEffectsDesc': 'Enable backdrop blur effects',
    'stylePanel.resetToDefault': 'Reset to Default'
  },
  ar: {
    // Header translations
    'header.quickBookCourt': 'حجز ملعب سريع',
    'header.quickBookSwimming': 'حجز مسبح سريع',
    'header.newClient': 'عميل جديد',
    'header.searchPlaceholder': 'البحث...',
    'header.userName': 'أحمد محمد',
    'header.userRole': 'مدير النظام',
    'header.profile': 'الملف الشخصي',
    'header.settings': 'الإعدادات',
    'header.logout': 'تسجيل الخروج',
    
    // Sidebar translations
    'sidebar.dashboard': 'لوحة التحكم',
    'sidebar.bookings': 'الحجوزات',
    'sidebar.clients': 'العملاء',
    'sidebar.facilities': 'المرافق',
    'sidebar.reports': 'التقارير',
    'sidebar.settings': 'الإعدادات',
    'sidebar.help': 'المساعدة',
    
    // Dashboard translations
    'dashboard.title': 'لوحة تحكم الحجوزات',
    'dashboard.subtitle': 'إدارة شاملة لحجوزات المرافق الرياضية',
    'dashboard.filter': 'تصفية',
    'dashboard.newBooking': 'حجز جديد',
    'dashboard.totalBookings': 'إجمالي الحجوزات',
    'dashboard.activeClients': 'العملاء النشطون',
    'dashboard.monthlyRevenue': 'الإيرادات الشهرية',
    'dashboard.occupancyRate': 'معدل الإشغال',
    'dashboard.fromLastMonth': 'من الشهر الماضي',
    'dashboard.overview': 'نظرة عامة',
    'dashboard.bookings': 'الحجوزات',
    'dashboard.facilities': 'المرافق',
    'dashboard.reports': 'التقارير',
    'dashboard.recentBookings': 'الحجوزات الأخيرة',
    'dashboard.recentBookingsDesc': 'آخر الحجوزات المسجلة في النظام',
    'dashboard.sampleClient1': 'أحمد محمد',
    'dashboard.sampleClient2': 'سارة أحمد',
    'dashboard.sampleClient3': 'محمد علي',
    'dashboard.sampleFacility1': 'ملعب تنس 1',
    'dashboard.sampleFacility2': 'مسبح',
    'dashboard.sampleFacility3': 'ملعب كرة سلة',
    'dashboard.confirmed': 'مؤكد',
    'dashboard.pending': 'في الانتظار',
    'dashboard.cancelled': 'ملغي',
    'dashboard.allBookings': 'جميع الحجوزات',
    'dashboard.allBookingsDesc': 'إدارة وعرض جميع الحجوزات',
    'dashboard.searchBookings': 'البحث في الحجوزات...',
    'dashboard.bookingsContent': 'محتوى إدارة الحجوزات سيتم إضافته هنا',
    'dashboard.sportsCourts': 'الملاعب الرياضية',
    'dashboard.sportsCountsDesc': 'إدارة ملاعب التنس وكرة السلة والقدم',
    'dashboard.swimmingPools': 'المسابح',
    'dashboard.swimmingPoolsDesc': 'إدارة المسابح ومرافق السباحة',
    'dashboard.available': 'متاح',
    'dashboard.occupied': 'مشغول',
    'dashboard.analyticsReports': 'التقارير والتحليلات',
    'dashboard.analyticsReportsDesc': 'تقارير مفصلة عن الأداء والإحصائيات',
    'dashboard.reportsContent': 'محتوى التقارير والتحليلات سيتم إضافته هنا',
    
    // Style Panel translations
    'stylePanel.title': 'لوحة تحكم الأسلوب',
    'stylePanel.description': 'تخصيص مظهر وتصميم التطبيق',
    'stylePanel.theme': 'المظهر',
    'stylePanel.colors': 'الألوان',
    'stylePanel.sidebar': 'الشريط الجانبي',
    'stylePanel.layout': 'التخطيط',
    'stylePanel.themeMode': 'وضع المظهر',
    'stylePanel.themeModeDesc': 'اختر بين المظهر الفاتح أو الداكن أو النظام',
    'stylePanel.light': 'فاتح',
    'stylePanel.dark': 'داكن',
    'stylePanel.system': 'النظام',
    'stylePanel.colorScheme': 'نظام الألوان',
    'stylePanel.colorSchemeDesc': 'اختر نظام ألوان للتطبيق',
    'stylePanel.sidebarStyle': 'نمط الشريط الجانبي',
    'stylePanel.sidebarStyleDesc': 'تخصيص مظهر الشريط الجانبي',
    'stylePanel.headerStyle': 'نمط الرأس',
    'stylePanel.headerStyleDesc': 'تخصيص مظهر الرأس',
    'stylePanel.layoutOptions': 'خيارات التخطيط',
    'stylePanel.compactMode': 'الوضع المضغوط',
    'stylePanel.compactModeDesc': 'تقليل المسافات والحشو',
    'stylePanel.animations': 'الحركات',
    'stylePanel.animationsDesc': 'تفعيل الحركات السلسة',
    'stylePanel.blurEffects': 'تأثيرات الضبابية',
    'stylePanel.blurEffectsDesc': 'تفعيل تأثيرات الضبابية الخلفية',
    'stylePanel.resetToDefault': 'إعادة تعيين للافتراضي'
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const isRTL = language === 'ar';

  const t = (key: string, fallback?: string) => {
    const translation = translations[language][key as keyof typeof translations[typeof language]];
    return translation || fallback || key;
  };

  const value = {
    language,
    setLanguage,
    isRTL,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
