
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Palette,
  Monitor,
  Sidebar,
  Layout,
  Eye,
  Brush,
  Settings,
  Moon,
  Sun,
  Laptop
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useLanguage } from '@/context/LanguageContext';

interface StyleControlPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StyleControlPanel({ isOpen, onClose }: StyleControlPanelProps) {
  const { theme, setTheme } = useTheme();
  const { isRTL, t } = useLanguage();
  const [sidebarStyle, setSidebarStyle] = useState('modern');
  const [headerStyle, setHeaderStyle] = useState('glass');
  const [colorScheme, setColorScheme] = useState('blue');

  const colorSchemes = [
    { name: 'Blue', value: 'blue', colors: 'from-blue-500 to-purple-600' },
    { name: 'Green', value: 'green', colors: 'from-green-500 to-emerald-600' },
    { name: 'Red', value: 'red', colors: 'from-red-500 to-pink-600' },
    { name: 'Orange', value: 'orange', colors: 'from-orange-500 to-yellow-600' },
    { name: 'Purple', value: 'purple', colors: 'from-purple-500 to-indigo-600' },
    { name: 'Teal', value: 'teal', colors: 'from-teal-500 to-cyan-600' }
  ];

  const sidebarStyles = [
    { name: 'Modern', value: 'modern', preview: 'bg-gradient-to-r from-blue-600 to-purple-700' },
    { name: 'Minimal', value: 'minimal', preview: 'bg-gray-100 dark:bg-gray-800' },
    { name: 'Glass', value: 'glass', preview: 'bg-white/20 backdrop-blur-md' },
    { name: 'Dark', value: 'dark', preview: 'bg-gray-900' }
  ];

  const headerStyles = [
    { name: 'Glass', value: 'glass', preview: 'bg-white/95 backdrop-blur-md' },
    { name: 'Solid', value: 'solid', preview: 'bg-white dark:bg-gray-900' },
    { name: 'Gradient', value: 'gradient', preview: 'bg-gradient-to-r from-blue-500 to-purple-600' },
    { name: 'Minimal', value: 'minimal', preview: 'bg-transparent border-b' }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side={isRTL ? "left" : "right"} 
        className="w-62 overflow-y-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-gray-200 dark:border-gray-800"
      >
        <SheetHeader className={isRTL ? 'text-right' : 'text-left'}>
          <SheetTitle className={`flex items-center space-x-2 ${isRTL ? 'space-x-reverse' : ''}`}>
            <Palette className="h-5 w-5" />
            <span>{t('stylePanel.title')}</span>
          </SheetTitle>
          <SheetDescription>
            {t('stylePanel.description')}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <Tabs defaultValue="theme" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="theme" className="flex items-center space-x-1">
                <Monitor className="h-4 w-4" />
                <span className="hidden sm:inline">{t('stylePanel.theme')}</span>
              </TabsTrigger>
              <TabsTrigger value="colors" className="flex items-center space-x-1">
                <Palette className="h-4 w-4" />
                <span className="hidden sm:inline">{t('stylePanel.colors')}</span>
              </TabsTrigger>
              <TabsTrigger value="sidebar" className="flex items-center space-x-1">
                <Sidebar className="h-4 w-4" />
                <span className="hidden sm:inline">{t('stylePanel.sidebar')}</span>
              </TabsTrigger>
              <TabsTrigger value="layout" className="flex items-center space-x-1">
                <Layout className="h-4 w-4" />
                <span className="hidden sm:inline">{t('stylePanel.layout')}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="theme" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="h-5 w-5" />
                    <span>{t('stylePanel.themeMode')}</span>
                  </CardTitle>
                  <CardDescription>
                    {t('stylePanel.themeModeDesc')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <Button
                      variant={theme === 'light' ? 'default' : 'outline'}
                      className="flex flex-col items-center space-y-2 h-auto p-4"
                      onClick={() => setTheme('light')}
                    >
                      <Sun className="h-6 w-6" />
                      <span className="text-xs">{t('stylePanel.light')}</span>
                    </Button>
                    <Button
                      variant={theme === 'dark' ? 'default' : 'outline'}
                      className="flex flex-col items-center space-y-2 h-auto p-4"
                      onClick={() => setTheme('dark')}
                    >
                      <Moon className="h-6 w-6" />
                      <span className="text-xs">{t('stylePanel.dark')}</span>
                    </Button>
                    <Button
                      variant={theme === 'system' ? 'default' : 'outline'}
                      className="flex flex-col items-center space-y-2 h-auto p-4"
                      onClick={() => setTheme('system')}
                    >
                      <Laptop className="h-6 w-6" />
                      <span className="text-xs">{t('stylePanel.system')}</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="colors" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t('stylePanel.colorScheme')}</CardTitle>
                  <CardDescription>
                    {t('stylePanel.colorSchemeDesc')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {colorSchemes.map((scheme) => (
                      <Button
                        key={scheme.value}
                        variant={colorScheme === scheme.value ? 'default' : 'outline'}
                        className={`h-16 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r ${scheme.colors}`}
                        onClick={() => setColorScheme(scheme.value)}
                      >
                        <div className={`w-8 h-4 rounded bg-gradient-to-r ${scheme.colors}`} />
                        <span className="text-xs text-white">{scheme.name}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sidebar" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t('stylePanel.sidebarStyle')}</CardTitle>
                  <CardDescription>
                    {t('stylePanel.sidebarStyleDesc')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {sidebarStyles.map((style) => (
                      <Button
                        key={style.value}
                        variant={sidebarStyle === style.value ? 'default' : 'outline'}
                        className="h-16 flex flex-col items-center justify-center space-y-2"
                        onClick={() => setSidebarStyle(style.value)}
                      >
                        <div className={`w-12 h-8 rounded ${style.preview} border`} />
                        <span className="text-xs">{style.name}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="layout" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t('stylePanel.headerStyle')}</CardTitle>
                  <CardDescription>
                    {t('stylePanel.headerStyleDesc')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {headerStyles.map((style) => (
                      <Button
                        key={style.value}
                        variant={headerStyle === style.value ? 'default' : 'outline'}
                        className="h-16 flex flex-col items-center justify-center space-y-2"
                        onClick={() => setHeaderStyle(style.value)}
                      >
                        <div className={`w-12 h-4 rounded ${style.preview} border`} />
                        <span className="text-xs">{style.name}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('stylePanel.layoutOptions')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={isRTL ? 'text-right' : 'text-left'}>
                      <label className="text-sm font-medium">
                        {t('stylePanel.compactMode')}
                      </label>
                      <p className="text-xs text-gray-500">
                        {t('stylePanel.compactModeDesc')}
                      </p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={isRTL ? 'text-right' : 'text-left'}>
                      <label className="text-sm font-medium">
                        {t('stylePanel.animations')}
                      </label>
                      <p className="text-xs text-gray-500">
                        {t('stylePanel.animationsDesc')}
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={isRTL ? 'text-right' : 'text-left'}>
                      <label className="text-sm font-medium">
                        {t('stylePanel.blurEffects')}
                      </label>
                      <p className="text-xs text-gray-500">
                        {t('stylePanel.blurEffectsDesc')}
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card>
            <CardContent className="pt-6">
              <Button className="w-full" variant="outline">
                <Settings className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t('stylePanel.resetToDefault')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
}
