
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuthStore();
  
  // Si no está autenticado, redirigir a auth
  if (!isAuthenticated || !user) {
    return <Navigate to="/auth" replace />;
  }
  
  // Si hay roles específicos permitidos, verificar que el usuario tenga uno
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirigir al dashboard apropiado según su rol
    const dashboardPath = `/${user.role}/dashboard`;
    return <Navigate to={dashboardPath} replace />;
  }
  
  return <>{children}</>;
};
