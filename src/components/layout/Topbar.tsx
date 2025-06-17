
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/stores/useAppStore';
import { cn } from '@/lib/utils';
import { 
  Menu, 
  Sun, 
  Moon, 
  Globe,
  User,
  LogOut 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const Topbar = () => {
  const { t, i18n } = useTranslation();
  const { 
    toggleSidebar, 
    theme, 
    toggleTheme, 
    language, 
    setLanguage,
    isAuthenticated,
    user,
    logout,
    setShowAuthModal
  } = useAppStore();

  const handleLanguageToggle = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <motion.header
      className="sticky top-0 z-30 surface-glass border-b border-soft"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="flex items-center justify-between h-16 responsive-padding">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className={cn(
              "lg:hidden transition-transform",
              language === 'ar' && "rtl-auto"
            )}
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="hide-mobile">
            <h2 className="text-lg font-semibold text-heading">
              {t('welcome')}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLanguageToggle}
            className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium hide-mobile">
              {language.toUpperCase()}
            </span>
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {theme === 'light' ? (
              <Moon className="w-4 h-4" />
            ) : (
              <Sun className="w-4 h-4" />
            )}
          </Button>

          {/* User Menu */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                  <User className="w-4 h-4" />
                  <span className="hide-mobile">
                    {user?.name || 'User'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 surface-elevated">
                <DropdownMenuItem className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={logout}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {t('logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              onClick={() => setShowAuthModal(true)}
              className="btn-primary"
            >
              <span className="hide-mobile">{t('login')}</span>
              <span className="show-mobile">
                <User className="w-4 h-4" />
              </span>
            </Button>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Topbar;
