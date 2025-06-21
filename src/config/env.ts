
// Environment configuration
export const env = {
  
  // Database configuration
  DATABASE_URL: import.meta.env.VITE_DATABASE_URL || '',
  
  // JWT configuration
  JWT_SECRET: import.meta.env.VITE_JWT_SECRET || 'default_secret_key',
  
  // App configuration
  APP_NAME: 'Sports Hub',
  APP_VERSION: '1.0.0',
  
  // API configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
};

// Validation function
export const validateEnv = () => {
  const warnings: string[] = [];
  
  
  if (!env.DATABASE_URL) {
    warnings.push('DATABASE_URL is not set');
  }
  
  if (warnings.length > 0) {
    console.warn('Environment warnings:', warnings);
  }
  
  return warnings.length === 0;
};

// Initialize environment validation
validateEnv();
