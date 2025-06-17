
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
      clients: "Clients",
      
      // Actions
      login: "Login",
      register: "Register",
      logout: "Logout",
      save: "Save",
      saving: "Saving...",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      search: "Search",
      filter: "Filter",
      add: "Add",
      create: "Create",
      update: "Update",
      confirm: "Confirm",
      actions: "Actions",
      
      // Common
      welcome: "Welcome",
      loading: "Loading...",
      error: "Error occurred",
      success: "Success",
      name: "Name",
      email: "Email",
      phone: "Phone",
      address: "Address",
      notes: "Notes",
      status: "Status",
      created_at: "Created At",
      updated_at: "Updated At",
      
      // Dashboard
      totalBookings: "Total Bookings",
      activeUsers: "Active Users",
      revenue: "Revenue",
      
      // Bookings
      newBooking: "New Booking",
      bookingStatus: "Status",
      pending: "Pending",
      confirmed: "Confirmed",
      cancelled: "Cancelled",
      bookingDate: "Booking Date",
      activityType: "Activity Type",
      booking_time: "Booking Time",
      duration_hours: "Duration (Hours)",
      duration_minutes: "Duration (Minutes)",
      client_name: "Client Name",
      date_time: "Date & Time",
      duration: "Duration",
      search_bookings: "Search bookings...",
      edit_booking: "Edit Booking",
      booking_deleted_successfully: "Booking deleted successfully",
      are_you_sure_delete_booking: "Are you sure you want to delete this booking?",
      enter_client_name: "Enter client name",
      select_activity: "Select activity",
      select_status: "Select status",
      enter_notes: "Enter notes (optional)",
      
      // Activities
      swimming: "Swimming",
      football: "Football",
      basketball: "Basketball",
      tennis: "Tennis",
      field_sports: "Field Sports",
      activity_name: "Activity Name",
      activity_type: "Activity Type",
      category: "Category",
      capacity: "Capacity",
      price: "Price",
      description: "Description",
      requirements: "Requirements",
      add_activity: "Add Activity",
      edit_activity: "Edit Activity",
      enter_activity_name: "Enter activity name",
      select_type: "Select type",
      enter_category: "Enter category",
      enter_description: "Enter description",
      enter_requirements: "Enter requirements (optional)",
      
      // Clients
      add_client: "Add Client",
      edit_client: "Edit Client",
      search_clients: "Search clients...",
      full_name: "Full Name",
      date_of_birth: "Date of Birth",
      gender: "Gender",
      male: "Male",
      female: "Female",
      emergency_contact: "Emergency Contact",
      client_deleted_successfully: "Client deleted successfully",
      are_you_sure_delete_client: "Are you sure you want to delete this client?",
      enter_full_name: "Enter full name",
      enter_email: "Enter email",
      enter_phone: "Enter phone number",
      select_gender: "Select gender",
      enter_address: "Enter address",
      enter_emergency_contact: "Enter emergency contact",
      
      // Delete Confirmation
      confirm_delete: "Confirm Delete",
      delete_confirmation_message: "This action cannot be undone. Are you sure you want to proceed?",
      
      // Auth
      loginTitle: "Sign in to your account",
      registerTitle: "Create new account",
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
      clients: "العملاء",
      
      // Actions
      login: "تسجيل الدخول",
      register: "إنشاء حساب",
      logout: "تسجيل الخروج",
      save: "حفظ",
      saving: "جاري الحفظ...",
      cancel: "إلغاء",
      edit: "تعديل",
      delete: "حذف",
      search: "بحث",
      filter: "تصفية",
      add: "إضافة",
      create: "إنشاء",
      update: "تحديث",
      confirm: "تأكيد",
      actions: "الإجراءات",
      
      // Common
      welcome: "مرحباً",
      loading: "جاري التحميل...",
      error: "حدث خطأ",
      success: "نجح",
      name: "الاسم",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      address: "العنوان",
      notes: "ملاحظات",
      status: "الحالة",
      created_at: "تاريخ الإنشاء",
      updated_at: "تاريخ التحديث",
      
      // Dashboard
      totalBookings: "إجمالي الحجوزات",
      activeUsers: "المستخدمين النشطين",
      revenue: "الإيرادات",
      
      // Bookings
      newBooking: "حجز جديد",
      bookingStatus: "الحالة",
      pending: "في الانتظار",
      confirmed: "مؤكد",
      cancelled: "ملغي",
      bookingDate: "تاريخ الحجز",
      activityType: "نوع النشاط",
      booking_time: "وقت الحجز",
      duration_hours: "المدة (ساعات)",
      duration_minutes: "المدة (دقائق)",
      client_name: "اسم العميل",
      date_time: "التاريخ والوقت",
      duration: "المدة",
      search_bookings: "البحث في الحجوزات...",
      edit_booking: "تعديل الحجز",
      booking_deleted_successfully: "تم حذف الحجز بنجاح",
      are_you_sure_delete_booking: "هل أنت متأكد من حذف هذا الحجز؟",
      enter_client_name: "أدخل اسم العميل",
      select_activity: "اختر النشاط",
      select_status: "اختر الحالة",
      enter_notes: "أدخل الملاحظات (اختياري)",
      
      // Activities
      swimming: "السباحة",
      football: "كرة القدم",
      basketball: "كرة السلة",
      tennis: "التنس",
      field_sports: "الرياضات الميدانية",
      activity_name: "اسم النشاط",
      activity_type: "نوع النشاط",
      category: "الفئة",
      capacity: "السعة",
      price: "السعر",
      description: "الوصف",
      requirements: "المتطلبات",
      add_activity: "إضافة نشاط",
      edit_activity: "تعديل النشاط",
      enter_activity_name: "أدخل اسم النشاط",
      select_type: "اختر النوع",
      enter_category: "أدخل الفئة",
      enter_description: "أدخل الوصف",
      enter_requirements: "أدخل المتطلبات (اختياري)",
      
      // Clients
      add_client: "إضافة عميل",
      edit_client: "تعديل العميل",
      search_clients: "البحث في العملاء...",
      full_name: "الاسم الكامل",
      date_of_birth: "تاريخ الميلاد",
      gender: "الجنس",
      male: "ذكر",
      female: "أنثى",
      emergency_contact: "جهة الاتصال في الطوارئ",
      client_deleted_successfully: "تم حذف العميل بنجاح",
      are_you_sure_delete_client: "هل أنت متأكد من حذف هذا العميل؟",
      enter_full_name: "أدخل الاسم الكامل",
      enter_email: "أدخل البريد الإلكتروني",
      enter_phone: "أدخل رقم الهاتف",
      select_gender: "اختر الجنس",
      enter_address: "أدخل العنوان",
      enter_emergency_contact: "أدخل جهة الاتصال في الطوارئ",
      
      // Delete Confirmation
      confirm_delete: "تأكيد الحذف",
      delete_confirmation_message: "لا يمكن التراجع عن هذا الإجراء. هل أنت متأكد من المتابعة؟",
      
      // Auth
      loginTitle: "تسجيل الدخول إلى حسابك",
      registerTitle: "إنشاء حساب جديد",
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
