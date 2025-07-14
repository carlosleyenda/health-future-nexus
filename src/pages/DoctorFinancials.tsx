import React from 'react';
import { useAuthStore } from '@/store/auth';
import { Navigate } from 'react-router-dom';
import DoctorFinancialDashboard from '@/components/doctor/DoctorFinancialDashboard';

export default function DoctorFinancialsPage() {
  const { user, profile } = useAuthStore();

  if (!user || !profile || profile.role !== 'doctor') {
    return <Navigate to="/" replace />;
  }

  return <DoctorFinancialDashboard />;
}