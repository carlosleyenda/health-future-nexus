
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Heart, Activity, Droplets, Weight, Thermometer, 
  TrendingUp, TrendingDown, AlertCircle, CheckCircle,
  Plus, Smartphone, Clock
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ModernHealthOverview() {
  const healthMetrics = [
    {
      title: 'Frecuencia Cardíaca',
      value: 72,
      unit: 'BPM',
      status: 'normal',
      trend: 'stable',
      icon: Heart,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      target: { min: 60, max: 100 }
    },
    {
      title: 'Presión Arterial',
      value: '120/80',
      unit: 'mmHg',
      status: 'optimal',
      trend: 'up',
      icon: Activity,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      target: { optimal: '120/80' }
    },
    {
      title: 'Peso',
      value: 70.5,
      unit: 'kg',
      status: 'normal',
      trend: 'down',
      icon: Weight,
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      target: { min: 65, max: 75 }
    },
    {
      title: 'Temperatura',
      value: 36.6,
      unit: '°C',
      status: 'normal',
      trend: 'stable',
      icon: Thermometer,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
      target: { normal: 36.5 }
    }
  ];

  const recentData = [
    { date: '01/06', heartRate: 68, bloodPressure: 118, weight: 71.2 },
    { date: '02/06', heartRate: 72, bloodPressure: 120, weight: 71.0 },
    { date: '03/06', heartRate: 70, bloodPressure: 119, weight: 70.8 },
    { date: '04/06', heartRate: 74, bloodPressure: 122, weight: 70.6 },
    { date: '05/06', heartRate: 71, bloodPressure: 121, weight: 70.5 },
    { date: '06/06', heartRate: 72, bloodPressure: 120, weight: 70.5 }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'optimal':
      case 'normal':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'critical':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <div className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header con resumen */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Resumen de Salud</h2>
            <p className="text-blue-100">Estado general excelente - Todos los valores en rango normal</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">85%</div>
            <div className="text-blue-100 text-sm">Índice de Salud</div>
          </div>
        </div>
        
        <div className="mt-4 flex items-center space-x-4">
          <Progress value={85} className="flex-1 h-3" />
          <Button variant="secondary" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Registrar Datos
          </Button>
        </div>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {healthMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                  <metric.icon className={`h-5 w-5 ${metric.color}`} />
                </div>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(metric.status)}
                  {getTrendIcon(metric.trend)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h3 className="font-medium text-sm text-gray-600">{metric.title}</h3>
                <div className="flex items-baseline space-x-1">
                  <span className="text-2xl font-bold">{metric.value}</span>
                  <span className="text-sm text-gray-500">{metric.unit}</span>
                </div>
                <Badge 
                  variant={metric.status === 'optimal' || metric.status === 'normal' ? 'default' : 'destructive'}
                  className="text-xs"
                >
                  {metric.status === 'optimal' ? 'Óptimo' : 
                   metric.status === 'normal' ? 'Normal' : 
                   metric.status === 'warning' ? 'Atención' : 'Crítico'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráfico de tendencias */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Tendencias de los Últimos 7 Días</span>
            <div className="flex items-center space-x-2">
              <Smartphone className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-500">Sincronizado con dispositivos</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={recentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="heartRate" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="Frecuencia Cardíaca"
                />
                <Line 
                  type="monotone" 
                  dataKey="bloodPressure" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Presión Arterial (sistólica)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recordatorios y acciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-blue-500" />
              Próximas Mediciones
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium">Presión Arterial</p>
                <p className="text-sm text-gray-600">Mañana a las 8:00 AM</p>
              </div>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium">Peso Corporal</p>
                <p className="text-sm text-gray-600">Cada lunes a las 7:00 AM</p>
              </div>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recomendaciones IA</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
              <p className="font-medium text-purple-700">Excelente progreso cardiovascular</p>
              <p className="text-sm text-purple-600">Tu frecuencia cardíaca ha mejorado 8% este mes</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
              <p className="font-medium text-green-700">Mantén la hidratación</p>
              <p className="text-sm text-green-600">Bebe 2 vasos más de agua para optimizar tu rendimiento</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
