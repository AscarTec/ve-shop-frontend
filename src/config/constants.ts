
// config/constants.ts
export const DEFAULT_LANGUAGE = 'ar';

// Application constants
export const APP_NAME = 'Sports Hub';
export const APP_VERSION = '1.0.0';

// Booking constants
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
} as const;

// Payment constants
export const PAYMENT_STATUS = {
  UNPAID: 'unpaid',
  PARTIAL: 'partial',
  PAID: 'paid',
  REFUNDED: 'refunded'
} as const;

// Activity types
export const ACTIVITY_TYPES = {
  SWIMMING: 'swimming',
  FIELD: 'field'
} as const;

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user'
} as const;

// Notification types
export const NOTIFICATION_TYPES = {
  EMAIL: 'email',
  SMS: 'sms'
} as const;

// Sports categories
export const SPORTS_CATEGORIES = {
  FOOTBALL: 'football',
  BASKETBALL: 'basketball',
  TENNIS: 'tennis',
  VOLLEYBALL: 'volleyball',
  SWIMMING_PRIVATE: 'swimming_private',
  SWIMMING_FREE: 'swimming_free',
  SWIMMING_SCHOOL: 'swimming_school'
} as const;

// Time slots (in hours)
export const TIME_SLOTS = [
  '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
  '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
];

// Validation constants
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_NAME_LENGTH: 100,
  MAX_EMAIL_LENGTH: 100,
  MAX_PHONE_LENGTH: 20,
  MIN_BOOKING_HOURS: 24, // Minimum hours before booking
  MAX_ADVANCE_BOOKING_DAYS: 30 // Maximum days in advance for booking
};

// Environment variables validation
export const validateEnvironment = () => {
  const requiredVars: string[] = [];
  const missing = requiredVars.filter(varName => !import.meta.env[varName]);

  if (missing.length > 0) {
    console.warn('Missing environment variables:', missing);
  }

  return missing.length === 0;
};
