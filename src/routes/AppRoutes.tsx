
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import MainLayout from '@/components/layout/MainLayout';
import AuthPage from '@/pages/auth/AuthPage';
import PatientDashboard from '@/components/dashboard/PatientDashboard';
import DoctorDashboard from '@/components/dashboard/DoctorDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import MedicalRecordsSystem from '@/components/medical-records/MedicalRecordsSystem';
import MedicalAIAssistant from '@/components/ai/MedicalAIAssistant';
import AIPersonalityDashboard from '@/components/ai/AIPersonalityDashboard';
import type { UserRole } from '@/types/user';

export default function AppRoutes() {
  const { user } = useAuthStore();

  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/auth" element={<AuthPage />} />
      
      {/* Protected routes */}
      <Route path="/" element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        {/* Dashboard routes */}
        <Route index element={
          user?.role === 'patient' ? <PatientDashboard /> :
          user?.role === 'doctor' ? <DoctorDashboard /> :
          user?.role === 'admin' ? <AdminDashboard /> :
          <Navigate to="/auth" replace />
        } />
        
        {/* Medical Records */}
        <Route path="medical-records" element={
          <MedicalRecordsSystem 
            patientId={user?.id || ''} 
            userRole={user?.role as UserRole}
          />
        } />
        
        {/* AI Assistant */}
        <Route path="ai-assistant" element={<MedicalAIAssistant />} />
        <Route path="ai-personality" element={<AIPersonalityDashboard />} />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
