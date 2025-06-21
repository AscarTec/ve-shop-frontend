import React from 'react';

interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'muted' | 'white';
  className?: string;
}

const sizeMap: Record<NonNullable<SpinnerProps['size']>, string> = {
  xs: 'h-3 w-3',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12'
};

export const Spinner: React.FC<SpinnerProps> = ({ size = 'sm', color = 'primary', className = '' }) => {
  const circle = `${sizeMap[size]} animate-bounce`;
  const colorClass = color === 'white' ? 'bg-white' : color === 'muted' ? 'bg-muted-foreground' : 'bg-primary';

  return (
    <div className={`flex items-center justify-center space-x-1 ${className}`} role="status" aria-label="Loading">
      <div className={`${colorClass} rounded-full ${circle}`}></div>
      <div className={`${colorClass} rounded-full ${circle} [animation-delay:-.2s]`}></div>
      <div className={`${colorClass} rounded-full ${circle} [animation-delay:-.4s]`}></div>
    </div>
  );
};

export default Spinner;
