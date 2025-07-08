import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation files
import enCommon from '../locales/en/common.json';
import enProduct from '../locales/en/product.json';
import enCart from '../locales/en/cart.json';
import enAuth from '../locales/en/auth.json';
import enUi from '../locales/en/ui.json';

import arCommon from '../locales/ar/common.json';
import arProduct from '../locales/ar/product.json';
import arCart from '../locales/ar/cart.json';
import arAuth from '../locales/ar/auth.json';
import arUi from '../locales/ar/ui.json';

const resources = {
  en: {
    common: enCommon,
    product: enProduct,
    cart: enCart,
    auth: enAuth,
    ui: enUi,
  },
  ar: {
    common: arCommon,
    product: arProduct,
    cart: arCart,
    auth: arAuth,
    ui: arUi,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    
    // Load multiple namespaces
    defaultNS: 'common',
    ns: ['common', 'product', 'cart', 'auth', 'ui'],
    
    // React-specific options
    react: {
      useSuspense: false,
    },
    
    // Debug in development
    debug: process.env.NODE_ENV === 'development',
  });

// Handle direction change
i18n.on('languageChanged', (lng) => {
  const dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = lng;
});

export default i18n;