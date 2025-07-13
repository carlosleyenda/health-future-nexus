import React from 'react';
import { useAuthStore } from '@/store/auth';
import SmartMedicationTracker from '@/components/patient/SmartMedicationTracker';
import { Navigate } from 'react-router-dom';

export default function MedicationsPage() {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Mis Medicamentos</h1>
      <SmartMedicationTracker />
    </div>
  );
}