
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity, 
  Calendar,
  Download,
  Filter,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Eye
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AdvancedAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // Mock data for charts
  const revenueData = [
    { name: 'Ene', value: 45000, patients: 120, appointments: 350 },
    { name: 'Feb', value: 52000, patients: 140, appointments: 380 },
    { name: 'Mar', value: 48000, patients: 135, appointments: 360 },
    { name: 'Abr', value: 61000, patients: 165, appointments: 420 },
    { name: 'May', value: 55000, patients: 150, appointments: 390 },
    { name: 'Jun', value: 67000, patients: 180, appointments: 450 },
  ];

  const appointmentStatusData = [
    { name: 'Completadas', value: 1250, color: '#10B981' },
    { name: 'Programadas', value: 340, color: '#3B82F6' },
    { name: 'Canceladas', value: 120, color: '#EF4444' },
    { name: 'No Asistió', value: 80, color: '#F59E0B' },
  ];

  const specialtyData = [
    { specialty: 'Medicina General', patients: 450, revenue: 25000 },
    { specialty: 'Cardiología', patients: 230, revenue: 18000 },
    { specialty: 'Dermatología', patients: 180, revenue: 12000 },
    { specialty: 'Pediatría', patients: 320, revenue: 16000 },
    { specialty: 'Ginecología', patients: 210, revenue: 14000 },
  ];

  const kpiData = [
    {
      title: 'Ingresos Totales',
      value: '$328,450',
      change: '+15.3%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Pacientes Activos',
      value: '2,847',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Citas Completadas',
      value: '1,250',
      change: '+12.1%',
      trend: 'up',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Satisfacción',
      value: '4.8/5',
      change: '+0.3%',
      trend: 'up',
      icon: Activity,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const periods = [
    { value: '7d', label: 'Últimos 7 días' },
    { value: '30d', label: 'Últimos 30 días' },
    { value: '90d', label: 'Últimos 3 meses' },
    { value: '1y', label: 'Último año' }
  ];

  const generateReport = () => {
    console.log('Generando reporte avanzado...');
    // Simulate report generation
    setTimeout(() => {
      alert('Reporte generado exitosamente');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Avanzados</h2>
          <p className="text-gray-600">Análisis detallado del rendimiento de la plataforma</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {periods.map((period) => (
                <SelectItem key={period.value} value={period.value}>
                  {period.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={generateReport} className="gap-2">
            <Download className="h-4 w-4" />
            Exportar Reporte
          </Button>
        </div>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {kpi.trend === 'up' ? (
                      <ArrowUp className="h-3 w-3 text-green-600" />
                    ) : (
                      <ArrowDown className="h-3 w-3 text-red-600" />
                    )}
                    <span className={`text-xs font-medium ${
                      kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                  <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Tendencia de Ingresos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Ingresos']} />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Appointment Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Estado de Citas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={appointmentStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {appointmentStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Specialty Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Rendimiento por Especialidad</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Especialidad</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Pacientes</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Ingresos</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Promedio por Paciente</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {specialtyData.map((specialty, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{specialty.specialty}</td>
                    <td className="py-3 px-4">{specialty.patients}</td>
                    <td className="py-3 px-4">${specialty.revenue.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      ${Math.round(specialty.revenue / specialty.patients).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Ver Detalles
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pacientes por Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="patients" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Citas por Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="appointments" stroke="#F59E0B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Resumen Ejecutivo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Crecimiento Mensual</span>
              <Badge variant="outline" className="text-green-600 border-green-200">
                +15.3%
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Retención de Pacientes</span>
              <Badge variant="outline" className="text-blue-600 border-blue-200">
                92%
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Tiempo Promedio Consulta</span>
              <Badge variant="outline" className="text-purple-600 border-purple-200">
                28 min
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Eficiencia Operativa</span>
              <Badge variant="outline" className="text-orange-600 border-orange-200">
                89%
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
