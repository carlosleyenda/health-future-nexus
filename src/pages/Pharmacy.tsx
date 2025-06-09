
import React from 'react';
import { useAuthStore } from '@/store/auth';
import PharmacyModule from '@/components/pharmacy/PharmacyModule';
import SmartMedicationTracker from '@/components/patient/SmartMedicationTracker';

export default function PharmacyPage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        {user?.role === 'patient' ? 'Mis Medicamentos' : 'Farmacia'}
      </h1>
      {user?.role === 'patient' ? (
        <SmartMedicationTracker />
      ) : (
        <PharmacyModule />
      )}
    </div>
  );
}
