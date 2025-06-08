
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import MainLayout from '@/components/layout/MainLayout';
import Index from '@/pages/Index';
import { AuthPage } from '@/pages/auth/AuthPage';
import { PatientDashboard } from '@/components/dashboard/PatientDashboard';
import { DoctorDashboard } from '@/components/dashboard/DoctorDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import MedicalRecordsSystem from '@/components/medical-records/MedicalRecordsSystem';
import MedicalAIAssistant from '@/components/ai/MedicalAIAssistant';
import AIPersonalityDashboard from '@/components/ai/AIPersonalityDashboard';
import MedicalDelivery from '@/components/delivery/MedicalDelivery';
import UserProfile from '@/components/profile/UserProfile';
import type { UserRole } from '@/types/user';

export default function AppRoutes() {
  const { user, isAuthenticated } = useAuthStore();

  const getUserRole = (role: UserRole): 'patient' | 'doctor' | 'admin' => {
    if (role === 'specialist') return 'doctor';
    if (role === 'coordinator' || role === 'delivery_staff' || role === 'pharmacist') return 'admin';
    return role as 'patient' | 'doctor' | 'admin';
  };

  // Función para determinar qué dashboard mostrar
  const getDashboardComponent = () => {
    if (!user) return <Navigate to="/auth" replace />;
    
    switch (user.role) {
      case 'patient':
        return <PatientDashboard />;
      case 'doctor':
      case 'specialist':
        return <DoctorDashboard />;
      case 'admin':
      case 'coordinator':
      case 'delivery_staff':
      case 'pharmacist':
        return <AdminDashboard />;
      default:
        return <PatientDashboard />;
    }
  };

  return (
    <Routes>
      {/* Ruta pública principal */}
      <Route path="/" element={
        isAuthenticated ? (
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        ) : (
          <Index />
        )
      }>
        {/* Rutas protegidas anidadas */}
        {isAuthenticated && (
          <>
            <Route index element={getDashboardComponent()} />
            
            {/* Medical Records */}
            <Route path="medical-records" element={
              <MedicalRecordsSystem 
                patientId={user?.id || ''} 
                userRole={getUserRole(user?.role || 'patient')}
              />
            } />
            
            {/* AI Assistant */}
            <Route path="ai-assistant" element={<MedicalAIAssistant />} />
            <Route path="ai-personality" element={<AIPersonalityDashboard />} />
            
            {/* Medical Delivery */}
            <Route path="delivery" element={<MedicalDelivery />} />
            
            {/* Profile */}
            <Route path="profile" element={<UserProfile />} />
          </>
        )}
      </Route>

      {/* Auth routes */}
      <Route path="/auth" element={<AuthPage />} />
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
