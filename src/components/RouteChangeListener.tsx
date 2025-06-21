import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLoadingStore } from '@/stores/useLoadingStore';

const RouteChangeListener = () => {
  const location = useLocation();
  const hideLoading = useLoadingStore((state) => state.hideLoading);

  useEffect(() => {
    hideLoading();
  }, [location, hideLoading]);

  return null;
};

export default RouteChangeListener;
