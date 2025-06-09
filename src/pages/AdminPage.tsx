
import React from 'react';
import { useAuthStore } from '@/store/auth';
import { Navigate } from 'react-router-dom';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default function AdminPage() {
  const { user } = useAuthStore();

  if (!user || (user.role !== 'admin' && user.role !== 'coordinator')) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Panel de Administración</h1>
      <AdminDashboard />
    </div>
  );
}
