
import React from 'react';
import VideoConsultation from '@/components/consultation/VideoConsultation';

export default function ConsultationsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Consultas Virtuales</h1>
      <VideoConsultation />
    </div>
  );
}
