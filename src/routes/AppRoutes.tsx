import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Index from '../pages/Index';
import Especialidades from '../pages/public/Especialidades';
import Servicios from '../pages/public/Servicios';
import Nosotros from '../pages/public/Nosotros';
import Contacto from '../pages/public/Contacto';
import NotFound from '../pages/NotFound';
import { AuthPage } from '../pages/auth/AuthPage';
import MainLayout from '@/components/layout/MainLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PatientDashboard } from '@/components/dashboard/PatientDashboard';
import { DoctorDashboard } from '@/components/dashboard/DoctorDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import UserProfile from '@/components/profile/UserProfile';
import HealthMonitoring from '@/components/health/HealthMonitoring';
import ConsultationRoom from '@/components/consultation/ConsultationRoom';
import PharmacyModule from '@/components/pharmacy/PharmacyModule';
import PaymentPortal from '@/components/payment/PaymentPortal';

// Public Route wrapper - redirects to appropriate dashboard if authenticated
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (isAuthenticated && user) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }
  
  return <>{children}</>;
};

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes with header/footer */}
      <Route path="/" element={
        <PublicRoute>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Index />
            </main>
            <Footer />
          </div>
        </PublicRoute>
      } />
      
      <Route path="/especialidades" element={
        <PublicRoute>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Especialidades />
            </main>
            <Footer />
          </div>
        </PublicRoute>
      } />
      
      <Route path="/servicios" element={
        <PublicRoute>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Servicios />
            </main>
            <Footer />
          </div>
        </PublicRoute>
      } />
      
      <Route path="/nosotros" element={
        <PublicRoute>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Nosotros />
            </main>
            <Footer />
          </div>
        </PublicRoute>
      } />
      
      <Route path="/contacto" element={
        <PublicRoute>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Contacto />
            </main>
            <Footer />
          </div>
        </PublicRoute>
      } />
      
      <Route path="/auth" element={
        <PublicRoute>
          <AuthPage />
        </PublicRoute>
      } />
      
      {/* Protected dashboard routes */}
      <Route path="/patient/dashboard" element={
        <ProtectedRoute allowedRoles={['patient']}>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route index element={<PatientDashboard />} />
      </Route>
      
      <Route path="/doctor/dashboard" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route index element={<DoctorDashboard />} />
      </Route>
      
      <Route path="/admin/dashboard" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route index element={<AdminDashboard />} />
      </Route>
      
      {/* Profile route - accessible by all authenticated users */}
      <Route path="/profile" element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route index element={<UserProfile />} />
      </Route>
      
      {/* Consultation room - full screen */}
      <Route path="/consultation/:appointmentId" element={
        <ProtectedRoute allowedRoles={['patient', 'doctor']}>
          <ConsultationRoom 
            appointmentId={window.location.pathname.split('/')[2]} 
            userId={useAuthStore.getState().user?.id || ''} 
            userRole={useAuthStore.getState().user?.role as 'patient' | 'doctor' || 'patient'} 
          />
        </ProtectedRoute>
      } />
      
      {/* Pharmacy module */}
      <Route path="/pharmacy" element={
        <ProtectedRoute allowedRoles={['patient']}>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route index element={<PharmacyModule />} />
      </Route>
      
      {/* Payments Portal */}
      <Route path="/payments" element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route index element={<PaymentPortal />} />
      </Route>
      
      {/* Additional protected routes */}
      <Route path="/appointments" element={
        <ProtectedRoute allowedRoles={['patient', 'doctor']}>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route index element={<div>Appointments Page</div>} />
        <Route path="new" element={<div>New Appointment</div>} />
      </Route>
      
      <Route path="/consultations" element={
        <ProtectedRoute allowedRoles={['patient', 'doctor']}>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route index element={<div>Consultations Page</div>} />
        <Route path="new" element={<div>New Consultation</div>} />
      </Route>
      
      <Route path="/health" element={
        <ProtectedRoute allowedRoles={['patient']}>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route index element={<HealthMonitoring />} />
      </Route>
      
      <Route path="/medical-history" element={
        <ProtectedRoute allowedRoles={['patient']}>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route index element={<div>Medical History</div>} />
      </Route>
      
      <Route path="/patients" element={
        <ProtectedRoute allowedRoles={['doctor', 'admin']}>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route index element={<div>Patients Management</div>} />
        <Route path="new" element={<div>New Patient Registration</div>} />
      </Route>
      
      <Route path="/schedule" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route index element={<div>Doctor Schedule</div>} />
      </Route>
      
      <Route path="/admin" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route index element={<div>Admin Panel</div>} />
        <Route path="users" element={<div>User Management</div>} />
        <Route path="users/new" element={<div>Create User</div>} />
        <Route path="system" element={<div>System Status</div>} />
        <Route path="logs" element={<div>System Logs</div>} />
        <Route path="analytics" element={<div>Analytics Dashboard</div>} />
      </Route>

      <Route path="/settings" element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route index element={<div>Settings Page</div>} />
      </Route>
      
      {/* Compatibility redirects for old dashboard route */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Navigate to={`/${useAuthStore.getState().user?.role}/dashboard`} replace />
        </ProtectedRoute>
      } />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
