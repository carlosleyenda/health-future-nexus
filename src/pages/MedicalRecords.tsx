
import React from 'react';
import MedicalRecordsSystem from '@/components/medical-records/MedicalRecordsSystem';
import { useAuthStore } from '@/store/auth';

export default function MedicalRecordsPage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Historial Médico</h1>
      <MedicalRecordsSystem 
        patientId={user?.role === 'patient' ? user.id : 'demo-patient'}
        userRole={user?.role === 'admin' ? 'admin' : user?.role === 'doctor' ? 'doctor' : 'patient'}
      />
    </div>
  );
}
