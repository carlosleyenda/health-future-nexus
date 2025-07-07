
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user, profile, fetchProfile } = useAuthStore();
  
  // Fetch profile if user exists but profile doesn't
  useEffect(() => {
    if (user && !profile) {
      fetchProfile(user.id);
    }
  }, [user, profile, fetchProfile]);
  
  // Si no está autenticado, redirigir a auth
  if (!isAuthenticated || !user) {
    return <Navigate to="/auth" replace />;
  }
  
  // Si hay roles específicos permitidos, verificar que el usuario tenga uno
  if (allowedRoles && profile && !allowedRoles.includes(profile.role)) {
    // Redirigir al dashboard apropiado según su rol
    const dashboardPath = `/${profile.role}/dashboard`;
    return <Navigate to={dashboardPath} replace />;
  }
  
  return <>{children}</>;
};
