import React from 'react';
import { useAuthStore } from '@/store/auth';
import { Navigate } from 'react-router-dom';
import PatientManagement from '@/components/doctor/PatientManagement';

export default function DoctorPatientsPage() {
  const { user, profile } = useAuthStore();

  if (!user || !profile || profile.role !== 'doctor') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Gestión de Pacientes</h1>
        <p className="text-muted-foreground">
          Administra tu base de pacientes y historial médico
        </p>
      </div>
      <PatientManagement doctorId={user.id} />
    </div>
  );
}