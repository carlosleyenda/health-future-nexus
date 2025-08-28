import React from 'react';
import { useAuthStore } from '@/store/auth';
import { Navigate } from 'react-router-dom';
import EnhancedPatientManagement from '@/components/doctor/EnhancedPatientManagement';

export default function DoctorPatientsPage() {
  const { user, profile } = useAuthStore();

  if (!user || !profile || profile.role !== 'doctor') {
    return <Navigate to="/" replace />;
  }

  return <EnhancedPatientManagement doctorId={user.id} />;
}