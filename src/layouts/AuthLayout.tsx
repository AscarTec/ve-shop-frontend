
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface AuthLayoutProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'manager' | 'user';
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, requiredRole }) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (requiredRole && user) {
    let hasAccess = false;
    
    if (user.role === 'admin') {
      hasAccess = true; // Admin has access to everything
    } else if (user.role === 'manager') {
      hasAccess = requiredRole === 'manager' || requiredRole === 'user';
    } else if (user.role === 'user') {
      hasAccess = requiredRole === 'user';
    }
    
    if (!hasAccess) {
      return <Navigate to="/admin/dashboard" replace />;
    }
  }

  return <>{children}</>;
};