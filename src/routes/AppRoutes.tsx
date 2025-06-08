import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { PatientDashboard } from '@/components/dashboard/PatientDashboard';
import { DoctorDashboard } from '@/components/dashboard/DoctorDashboard';
import AdminDashboard from '@/components/dashboard/AdminDashboard';
import UserProfile from '@/components/profile/UserProfile';
import AppointmentBooking from '@/components/appointments/AppointmentBooking';
import PharmacyModule from '@/components/pharmacy/PharmacyModule';
import MedicalDelivery from '@/components/delivery/MedicalDelivery';
import HealthMonitoring from '@/components/health/HealthMonitoring';
import CompletePatientPortal from '@/components/patient/CompletePatientPortal';
import PaymentPortal from '@/components/payments/PaymentPortal';
import VideoConsultation from '@/components/consultation/VideoConsultation';
import ConsultationRoom from '@/components/consultation/ConsultationRoom';
import MedicalChat from '@/components/chat/MedicalChat';
import MedicalRecordsSystem from '@/components/medical-records/MedicalRecordsSystem';

// Wrapper components para pasar props de URL
function VideoConsultationWrapper() {
  const { appointmentId } = useParams();
  const { user } = useAuthStore();
  
  // Cast role to expected type, defaulting to patient for consultation
  const userRole = (user?.role === 'doctor' || user?.role === 'patient') 
    ? user.role 
    : 'patient' as const;
  
  return (
    <VideoConsultation 
      appointmentId={appointmentId || ''} 
      userId={user?.id || ''} 
      userRole={userRole} 
    />
  );
}

function ConsultationRoomWrapper() {
  const { roomId } = useParams();
  const { user } = useAuthStore();
  
  // Cast role to expected type, defaulting to patient for consultation
  const userRole = (user?.role === 'doctor' || user?.role === 'patient') 
    ? user.role 
    : 'patient' as const;
  
  return (
    <ConsultationRoom 
      appointmentId={roomId || ''} 
      userId={user?.id || ''} 
      userRole={userRole} 
    />
  );
}

export default function AppRoutes() {
  const { user } = useAuthStore();

  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          {user?.role === 'patient' && <PatientDashboard />}
          {user?.role === 'doctor' && <DoctorDashboard />}
          {user?.role === 'admin' && <AdminDashboard />}
        </ProtectedRoute>
      } />
      
      <Route path="/profile" element={
        <ProtectedRoute>
          <UserProfile />
        </ProtectedRoute>
      } />
      
      <Route path="/appointments" element={
        <ProtectedRoute>
          <AppointmentBooking />
        </ProtectedRoute>
      } />
      
      <Route path="/pharmacy" element={
        <ProtectedRoute>
          <PharmacyModule />
        </ProtectedRoute>
      } />
      
      <Route path="/delivery" element={
        <ProtectedRoute>
          <MedicalDelivery />
        </ProtectedRoute>
      } />
      
      <Route path="/health" element={
        <ProtectedRoute>
          <HealthMonitoring />
        </ProtectedRoute>
      } />
      
      <Route path="/patient-portal" element={
        <ProtectedRoute>
          <CompletePatientPortal patientId={user?.id || ''} />
        </ProtectedRoute>
      } />
      
      <Route path="/payments" element={
        <ProtectedRoute>
          <PaymentPortal />
        </ProtectedRoute>
      } />
      
      <Route path="/consultation/:appointmentId" element={
        <ProtectedRoute>
          <VideoConsultationWrapper />
        </ProtectedRoute>
      } />
      
      <Route path="/consultation-room/:roomId" element={
        <ProtectedRoute>
          <ConsultationRoomWrapper />
        </ProtectedRoute>
      } />
      
      <Route path="/chat" element={
        <ProtectedRoute>
          <MedicalChat />
        </ProtectedRoute>
      } />
      
      <Route path="/chat/:conversationId" element={
        <ProtectedRoute>
          <MedicalChat />
        </ProtectedRoute>
      } />
      
      <Route path="/medical-records" element={
        <ProtectedRoute>
          <MedicalRecordsSystem 
            patientId={user?.id || ''} 
            userRole={user?.role === 'doctor' ? 'doctor' : user?.role === 'admin' ? 'admin' : 'patient'} 
          />
        </ProtectedRoute>
      } />
    </Routes>
  );
}
