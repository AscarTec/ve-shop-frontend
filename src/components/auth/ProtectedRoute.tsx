
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'manager' | 'user';
}

function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Check role-based access if requiredRole is specified
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
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
}

export default ProtectedRoute;