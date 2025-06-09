
import React from 'react';
import MedicalRecordsSystem from '@/components/medical-records/MedicalRecordsSystem';

export default function MedicalRecordsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Historial Médico</h1>
      <MedicalRecordsSystem />
    </div>
  );
}
