import React from 'react';
import { useAuthStore } from '@/store/auth';
import { Navigate } from 'react-router-dom';
import SmartDoctorSchedule from '@/components/doctor/SmartDoctorSchedule';

export default function DoctorSchedulePage() {
  const { user, profile } = useAuthStore();

  if (!user || !profile || profile.role !== 'doctor') {
    return <Navigate to="/" replace />;
  }

  return <SmartDoctorSchedule doctorId={user.id} />;
}