import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MetricCard } from '@/components/ui/metric-card';

interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  averageSessionDuration: number;
  revenueGenerated: number;
  conversionRate: number;
}

const mockAnalytics: AnalyticsData = {
  totalUsers: 1250,
  activeUsers: 890,
  averageSessionDuration: 180,
  revenueGenerated: 54000,
  conversionRate: 4.5,
};

export default function AdminAnalytics() {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['admin-analytics'],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockAnalytics;
    },
  });

  if (isLoading) {
    return <div>Cargando analíticas...</div>;
  }

  if (!analytics) {
    return <div>Error al cargar las analíticas.</div>;
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <MetricCard label="Usuarios Totales" value={analytics.totalUsers} />
      <MetricCard label="Usuarios Activos" value={analytics.activeUsers} />
      <MetricCard label="Duración Promedio de Sesión" value={`${analytics.averageSessionDuration} segundos`} />
      <MetricCard label="Ingresos Generados" value={`$${analytics.revenueGenerated}`} />
      <MetricCard label="Tasa de Conversión" value={`${analytics.conversionRate}%`} />
    </div>
  );
}
