import React from 'react';
import { useAuthStore } from '@/store/auth';
import { Navigate } from 'react-router-dom';
import DoctorSchedule from '@/components/doctor/DoctorSchedule';

export default function DoctorSchedulePage() {
  const { user, profile } = useAuthStore();

  if (!user || !profile || profile.role !== 'doctor') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Mi Agenda Médica</h1>
        <p className="text-muted-foreground">
          Gestiona tu horario, consultas y disponibilidad
        </p>
      </div>
      <DoctorSchedule doctorId={user.id} />
    </div>
  );
}