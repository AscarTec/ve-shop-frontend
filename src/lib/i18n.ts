
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      dashboard: "Dashboard",
      bookings: "Bookings",
      activities: "Activities",
      users: "Users",
      roles: "Roles",
      reports: "Reports",
      settings: "Settings",
      
      // Actions
      login: "Login",
      register: "Register",
      logout: "Logout",
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      search: "Search",
      filter: "Filter",
      
      // Common
      welcome: "Welcome",
      loading: "Loading...",
      error: "Error occurred",
      success: "Success",
      confirm: "Confirm",
      
      // Dashboard
      totalBookings: "Total Bookings",
      activeUsers: "Active Users",
      revenue: "Revenue",
      activities: "Activities",
      
      // Bookings
      newBooking: "New Booking",
      bookingStatus: "Status",
      pending: "Pending",
      confirmed: "Confirmed",
      cancelled: "Cancelled",
      bookingDate: "Booking Date",
      activityType: "Activity Type",
      
      // Auth
      loginTitle: "Sign in to your account",
      registerTitle: "Create new account",
      email: "Email",
      password: "Password",
      forgotPassword: "Forgot password?",
      noAccount: "Don't have an account?",
      haveAccount: "Already have an account?",
      
      // Theme
      lightMode: "Light Mode",
      darkMode: "Dark Mode",
      language: "Language",
    }
  },
  ar: {
    translation: {
      // Navigation
      dashboard: "لوحة التحكم",
      bookings: "الحجوزات",
      activities: "الأنشطة",
      users: "المستخدمين",
      roles: "الأدوار",
      reports: "التقارير",
      settings: "الإعدادات",
      
      // Actions
      login: "تسجيل الدخول",
      register: "إنشاء حساب",
      logout: "تسجيل الخروج",
      save: "حفظ",
      cancel: "إلغاء",
      edit: "تعديل",
      delete: "حذف",
      search: "بحث",
      filter: "تصفية",
      
      // Common
      welcome: "مرحباً",
      loading: "جاري التحميل...",
      error: "حدث خطأ",
      success: "نجح",
      confirm: "تأكيد",
      
      // Dashboard
      totalBookings: "إجمالي الحجوزات",
      activeUsers: "المستخدمين النشطين",
      revenue: "الإيرادات",
      activities: "الأنشطة",
      
      // Bookings
      newBooking: "حجز جديد",
      bookingStatus: "الحالة",
      pending: "في الانتظار",
      confirmed: "مؤكد",
      cancelled: "ملغي",
      bookingDate: "تاريخ الحجز",
      activityType: "نوع النشاط",
      
      // Auth
      loginTitle: "تسجيل الدخول إلى حسابك",
      registerTitle: "إنشاء حساب جديد",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      forgotPassword: "نسيت كلمة المرور؟",
      noAccount: "لا تملك حساب؟",
      haveAccount: "تملك حساب بالفعل؟",
      
      // Theme
      lightMode: "الوضع الفاتح",
      darkMode: "الوضع المظلم",
      language: "اللغة",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
