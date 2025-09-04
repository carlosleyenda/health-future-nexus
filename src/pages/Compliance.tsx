import React, { useEffect } from 'react';
import { useAuthStore } from '@/store/auth';
import { Navigate } from 'react-router-dom';
import ComplianceDashboard from '@/components/compliance/ComplianceDashboard';

export default function CompliancePage() {
  const { user } = useAuthStore();

  useEffect(() => {
    document.title = 'Cumplimiento y Seguridad | Admin';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Panel de Cumplimiento y Seguridad: auditorías, políticas y controles.');
  }, []);

  if (!user || (user.role !== 'admin' && user.role !== 'coordinator')) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Cumplimiento y Seguridad</h1>
      <ComplianceDashboard organizationId="demo-org" />
    </div>
  );
}
