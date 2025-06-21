// src/components/ui/AppLogo.tsx
import React from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { cn } from '@/lib/utils';

type Props = {
  /**
   * Primary displays the wordmark while secondary
   * renders the compact brand mark used in sidebars.
   */
  variant?: 'primary' | 'secondary';
  className?: string;
};

const AppLogo = ({ variant = 'primary', className = '' }: Props) => {
  const { theme } = useAppStore();

  if (variant === 'primary') {
    const src = theme === 'dark' ? '/logo-dark.png' : '/logo-day.png';
    return <img src={src} alt="Sports Hub" className={cn('h-8 w-auto', className)} />;
  }

  return <img src="/logo-patrens.png" alt="Sports Hub Mark" className={cn('h-8 w-auto', className)} />;
};

export default AppLogo;
