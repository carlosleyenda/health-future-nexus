
import React from 'react';
import { useAuthStore } from '@/store/auth';
import { Navigate } from 'react-router-dom';
import ModernHealthOverview from '@/components/patient/ModernHealthOverview';

export default function HealthPage() {
  const { user, profile } = useAuthStore();

  if (!user || !profile || profile.role !== 'patient') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Mi Salud</h1>
      <ModernHealthOverview />
    </div>
  );
}
