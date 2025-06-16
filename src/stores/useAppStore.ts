
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  
  // Language
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
  
  // Sidebar
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  
  // Auth
  isAuthenticated: boolean;
  user: any | null;
  setAuth: (user: any) => void;
  logout: () => void;
  
  // Modal
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Theme
      theme: 'light',
      toggleTheme: () => {
        const newTheme = get().theme === 'light' ? 'dark' : 'light';
        set({ theme: newTheme });
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
      },
      
      // Language
      language: 'en',
      setLanguage: (lang) => {
        set({ language: lang });
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
      },
      
      // Sidebar
      sidebarOpen: false,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      
      // Auth
      isAuthenticated: false,
      user: null,
      setAuth: (user) => set({ isAuthenticated: true, user }),
      logout: () => set({ isAuthenticated: false, user: null }),
      
      // Modal
      showAuthModal: false,
      setShowAuthModal: (show) => set({ showAuthModal: show }),
    }),
    {
      name: 'sports-booking-store',
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);
