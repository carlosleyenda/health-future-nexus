
import React from 'react';
import { TrendingUp, Users, Calendar, DollarSign, Activity, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAdminAnalytics, useSystemHealth } from '@/hooks/useAdmin';

export default function AdminAnalytics() {
  const { data: analytics } = useAdminAnalytics('30d');
  const { data: systemHealth } = useSystemHealth();

  const kpiData = [
    { title: 'Total Usuarios', value: analytics?.totalUsers || 0, change: '+12%', icon: Users, color: 'text-blue-600' },
    { title: 'Citas del Mes', value: analytics?.appointmentsThisMonth || 0, change: '+8%', icon: Calendar, color: 'text-green-600' },
    { title: 'Ingresos', value: `$${analytics?.revenue || 0}`, change: '+15%', icon: DollarSign, color: 'text-purple-600' },
    { title: 'Satisfacción', value: `${analytics?.satisfaction || 0}%`, change: '+3%', icon: TrendingUp, color: 'text-orange-600' }
  ];

  const revenueData = analytics?.revenueChart || [];
  const appointmentsData = analytics?.appointmentsChart || [];
  const specialtyData = analytics?.specialtyDistribution || [];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
        <p className="text-gray-600">Vista general del sistema y analíticas</p>
      </div>

      {/* System Health Alerts */}
      {systemHealth?.alerts?.length > 0 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {systemHealth.alerts.length} alertas del sistema requieren atención
          </AlertDescription>
        </Alert>
      )}

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                <Icon className={`h-4 w-4 ${kpi.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <p className="text-xs text-green-600 flex items-center">
                  {kpi.change} desde el mes pasado
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Ingresos Mensuales</CardTitle>
            <CardDescription>Últimos 12 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Ingresos']} />
                <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Appointments Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Citas por Mes</CardTitle>
            <CardDescription>Tendencia de citas médicas</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={appointmentsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="appointments" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Specialty Distribution and System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Specialty Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribución por Especialidad</CardTitle>
            <CardDescription>Citas por especialidad médica</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={specialtyData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {specialtyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>Estado del Sistema</CardTitle>
            <CardDescription>Métricas de rendimiento en tiempo real</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">CPU Usage</span>
              <Badge variant={systemHealth?.cpu < 70 ? "default" : "destructive"}>
                {systemHealth?.cpu || 0}%
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Memory Usage</span>
              <Badge variant={systemHealth?.memory < 80 ? "default" : "destructive"}>
                {systemHealth?.memory || 0}%
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Active Users</span>
              <Badge variant="default">{systemHealth?.activeUsers || 0}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Response Time</span>
              <Badge variant={systemHealth?.responseTime < 500 ? "default" : "destructive"}>
                {systemHealth?.responseTime || 0}ms
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
