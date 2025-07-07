
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import MainLayout from '@/components/layout/MainLayout';

// Pages
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import { AuthPage } from '@/pages/auth/AuthPage';
import Settings from '@/pages/Settings';

// Dashboard pages
import { PatientDashboard } from '@/components/dashboard/PatientDashboard';
import { DoctorDashboard } from '@/components/dashboard/DoctorDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';

// New pages
import ChatPage from '@/pages/Chat';
import NotificationsPage from '@/pages/Notifications';
import ProfilePage from '@/pages/Profile';
import AdminPage from '@/pages/AdminPage';
import UsersManagementPage from '@/pages/UsersManagement';
import AnalyticsPage from '@/pages/Analytics';
import AppointmentsPage from '@/pages/Appointments';
import ConsultationsPage from '@/pages/Consultations';
import HealthPage from '@/pages/Health';
import PharmacyPage from '@/pages/Pharmacy';
import MedicalRecordsPage from '@/pages/MedicalRecords';
import AIAssistantPage from '@/pages/AIAssistant';
import DeliveryPage from '@/pages/Delivery';
import PaymentsPage from '@/pages/Payments';

// Public pages
import Nosotros from '@/pages/public/Nosotros';
import Servicios from '@/pages/public/Servicios';
import Especialidades from '@/pages/public/Especialidades';
import Contacto from '@/pages/public/Contacto';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/servicios" element={<Servicios />} />
      <Route path="/especialidades" element={<Especialidades />} />
      <Route path="/contacto" element={<Contacto />} />

      {/* Protected routes with layout */}
      <Route path="/" element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        {/* Dashboard routes */}
        <Route path="/patient/dashboard" element={<PatientDashboard />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Common routes */}
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/consultations" element={<ConsultationsPage />} />
        <Route path="/medical-records" element={<MedicalRecordsPage />} />
        <Route path="/ai-assistant" element={<AIAssistantPage />} />
        <Route path="/delivery" element={<DeliveryPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/pharmacy" element={<PharmacyPage />} />

        {/* Patient-specific routes */}
        <Route path="/health" element={
          <ProtectedRoute allowedRoles={['patient']}>
            <HealthPage />
          </ProtectedRoute>
        } />

        {/* Doctor-specific routes */}
        <Route path="/patients" element={
          <ProtectedRoute allowedRoles={['doctor', 'specialist']}>
            <div>Gestión de Pacientes - En desarrollo</div>
          </ProtectedRoute>
        } />
        <Route path="/schedule" element={
          <ProtectedRoute allowedRoles={['doctor', 'specialist']}>
            <div>Agenda Médica - En desarrollo</div>
          </ProtectedRoute>
        } />

        {/* Admin-specific routes */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin', 'coordinator']}>
            <AdminPage />
          </ProtectedRoute>
        } />
        <Route path="/users" element={
          <ProtectedRoute allowedRoles={['admin', 'coordinator']}>
            <UsersManagementPage />
          </ProtectedRoute>
        } />
        <Route path="/analytics" element={
          <ProtectedRoute allowedRoles={['admin', 'coordinator']}>
            <AnalyticsPage />
          </ProtectedRoute>
        } />

        {/* Settings */}
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* 404 page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
