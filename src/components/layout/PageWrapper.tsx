
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import ResponsiveContainer from './ResponsiveContainer';

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  animate?: boolean;
}

const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  className,
  title,
  description,
  actions,
  animate = true
}) => {
  const content = (
    <div className={cn('space-section', className)}>
      {(title || description || actions) && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            {title && (
              <h1 className="text-heading text-3xl lg:text-4xl font-bold">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-muted text-lg">
                {description}
              </p>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-3">
              {actions}
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );

  if (!animate) {
    return (
      <ResponsiveContainer>
        {content}
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {content}
      </motion.div>
    </ResponsiveContainer>
  );
};

export default PageWrapper;
