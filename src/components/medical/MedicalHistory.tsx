
import React from 'react';
import MedicalHistoryTabs from './MedicalHistoryTabs';

interface MedicalHistoryProps {
  patientId: string;
}

export default function MedicalHistory({ patientId }: MedicalHistoryProps) {
  return (
    <div className="space-y-6">
      <MedicalHistoryTabs patientId={patientId} />
    </div>
  );
}
