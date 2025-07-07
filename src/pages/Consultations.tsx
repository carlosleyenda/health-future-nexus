
import React from 'react';
import VideoConsultation from '@/components/consultation/VideoConsultation';
import { useAuthStore } from '@/store/auth';

export default function ConsultationsPage() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Consultas Virtuales</h1>
      <VideoConsultation 
        appointmentId="demo-appointment"
        userId={user?.id || ''}
        userRole={user?.role === 'doctor' ? 'doctor' : 'patient'}
      />
    </div>
  );
}
