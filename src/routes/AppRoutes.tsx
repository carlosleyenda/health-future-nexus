
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import MainLayout from '@/components/layout/MainLayout';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import Settings from '@/pages/Settings';
import { AuthPage } from '@/pages/auth/AuthPage';
import { PatientDashboard } from '@/components/dashboard/PatientDashboard';
import { DoctorDashboard } from '@/components/dashboard/DoctorDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import MedicalRecordsSystem from '@/components/medical-records/MedicalRecordsSystem';
import MedicalAIAssistant from '@/components/ai/MedicalAIAssistant';
import AIPersonalityDashboard from '@/components/ai/AIPersonalityDashboard';
import MedicalDelivery from '@/components/delivery/MedicalDelivery';
import UserProfile from '@/components/profile/UserProfile';
import AppointmentBooking from '@/components/appointments/AppointmentBooking';
import ConsultationRoom from '@/components/consultation/ConsultationRoom';
import HealthDashboard from '@/components/health/HealthDashboard';
import PharmacyModule from '@/components/pharmacy/PharmacyModule';
import PaymentPortal from '@/components/payments/PaymentPortal';
import CompletePatientPortal from '@/components/patient/CompletePatientPortal';
import DoctorSchedule from '@/components/doctor/DoctorSchedule';
import type { UserRole } from '@/types/user';

export default function AppRoutes() {
  const { user, isAuthenticated } = useAuthStore();

  const getUserRole = (role: UserRole): 'patient' | 'doctor' => {
    if (role === 'specialist') return 'doctor';
    if (role === 'coordinator' || role === 'delivery_staff' || role === 'pharmacist' || role === 'admin') return 'doctor'; // Treating admin roles as doctor for consultation purposes
    return role as 'patient' | 'doctor';
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
            {/* Dashboard principal */}
            <Route index element={getDashboardComponent()} />
            
            {/* Rutas específicas para pacientes */}
            <Route path="appointments" element={<AppointmentBooking />} />
            <Route path="consultations" element={
              <ConsultationRoom 
                appointmentId={user?.id || ''} 
                userId={user?.id || ''} 
                userRole={getUserRole(user?.role || 'patient')} 
              />
            } />
            <Route path="health" element={<HealthDashboard patientId={user?.id || ''} />} />
            <Route path="pharmacy" element={<PharmacyModule />} />
            <Route path="payments" element={<PaymentPortal />} />
            
            {/* Rutas específicas para doctores */}
            <Route path="patients" element={<CompletePatientPortal patientId={user?.id || ''} />} />
            <Route path="schedule" element={<DoctorSchedule doctorId={user?.id || ''} />} />
            
            {/* Rutas compartidas */}
            <Route path="medical-records" element={
              <MedicalRecordsSystem 
                patientId={user?.id || ''} 
                userRole={getUserRole(user?.role || 'patient')}
              />
            } />
            <Route path="ai-assistant" element={<MedicalAIAssistant />} />
            <Route path="ai-personality" element={<AIPersonalityDashboard />} />
            <Route path="delivery" element={<MedicalDelivery />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="settings" element={<Settings />} />
          </>
        )}
      </Route>

      {/* Ruta específica para admin que funciona independientemente */}
      <Route path="/admin/*" element={
        isAuthenticated ? (
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        ) : (
          <Navigate to="/auth" replace />
        )
      }>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>

      {/* Auth routes */}
      <Route path="/auth" element={<AuthPage />} />
      
      {/* 404 route - debe ir al final */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
