import React from 'react';
import { MetricCard } from '@/components/ui/metric-card';
import { useAdminAnalytics } from '@/hooks/useAdmin';

export default function AdminAnalytics() {
  const { data: analytics, isLoading, error } = useAdminAnalytics();

  if (isLoading) return <div>Cargando analíticas...</div>;
  if (error || !analytics) return <div>Error al cargar las analíticas.</div>;

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n);

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <MetricCard label="Usuarios Totales" value={analytics.totalUsers} />
      <MetricCard label="Usuarios Activos" value={analytics.activeUsers} />
      <MetricCard label="Citas este mes" value={analytics.appointmentsThisMonth} />
      <MetricCard label="Ingresos" value={formatCurrency(analytics.revenue)} />
      <MetricCard label="Satisfacción" value={`${analytics.satisfaction}%`} />
      <MetricCard label="Crecimiento ingresos" value={`${analytics.revenueGrowth}%`} />
    </div>
  );
}
