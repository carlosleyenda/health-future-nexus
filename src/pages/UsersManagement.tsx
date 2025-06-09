
import React from 'react';
import { useAuthStore } from '@/store/auth';
import { Navigate } from 'react-router-dom';
import UserManagement from '@/components/admin/UserManagement';

export default function UsersManagementPage() {
  const { user } = useAuthStore();

  if (!user || (user.role !== 'admin' && user.role !== 'coordinator')) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestión de Usuarios</h1>
      <UserManagement />
    </div>
  );
}
