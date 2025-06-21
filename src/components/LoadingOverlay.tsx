import React from 'react';
import { useLoadingStore } from '@/stores/useLoadingStore';
import Spinner from '@/components/ui/spinner';

const LoadingOverlay: React.FC = () => {
  const isLoading = useLoadingStore((state) => state.isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 dark:bg-black/70">
      <Spinner size="xl" />
    </div>
  );
};

export default LoadingOverlay;
