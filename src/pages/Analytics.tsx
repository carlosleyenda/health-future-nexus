
import React from 'react';
import { useAuthStore } from '@/store/auth';
import { Navigate } from 'react-router-dom';
import AdminAnalytics from '@/components/admin/AdminAnalytics';

export default function AnalyticsPage() {
  const { user } = useAuthStore();

  if (!user || (user.role !== 'admin' && user.role !== 'coordinator')) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Analytics y Reportes</h1>
      <AdminAnalytics />
    </div>
  );
}
