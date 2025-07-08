import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Language = 'en' | 'ar';

interface LanguageState {
  language: Language;
  direction: 'ltr' | 'rtl';
  setLanguage: (language: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'en',
      direction: 'ltr',
      setLanguage: (language) => {
        const direction = language === 'ar' ? 'rtl' : 'ltr';
        set({ language, direction });
        
        // Update document direction
        document.documentElement.dir = direction;
        document.documentElement.lang = language;
      },
    }),
    {
      name: 've-shop-language',
    }
  )
);