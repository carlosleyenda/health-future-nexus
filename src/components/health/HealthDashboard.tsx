
import React from 'react';
import { Heart, Activity, Droplets, Weight, Thermometer } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { usePatientHealthMetrics, useAddHealthMetric } from '@/hooks/usePatient';
import { Button } from '@/components/ui/button';

interface HealthDashboardProps {
  patientId: string;
}

export default function HealthDashboard({ patientId }: HealthDashboardProps) {
  const { data: heartRateData } = usePatientHealthMetrics(patientId, 'heart_rate');
  const { data: bloodPressureData } = usePatientHealthMetrics(patientId, 'blood_pressure');
  const { data: weightData } = usePatientHealthMetrics(patientId, 'weight');
  const { data: temperatureData } = usePatientHealthMetrics(patientId, 'temperature');
  
  const addHealthMetric = useAddHealthMetric();

  const healthMetrics = [
    {
      title: 'Frecuencia Cardíaca',
      value: heartRateData?.[0]?.value || 0,
      unit: 'bpm',
      icon: Heart,
      color: 'text-red-500',
      data: heartRateData?.slice(0, 7).reverse() || []
    },
    {
      title: 'Presión Arterial',
      value: bloodPressureData?.[0]?.value || 0,
      unit: 'mmHg',
      icon: Activity,
      color: 'text-blue-500',
      data: bloodPressureData?.slice(0, 7).reverse() || []
    },
    {
      title: 'Peso',
      value: weightData?.[0]?.value || 0,
      unit: 'kg',
      icon: Weight,
      color: 'text-green-500',
      data: weightData?.slice(0, 7).reverse() || []
    },
    {
      title: 'Temperatura',
      value: temperatureData?.[0]?.value || 0,
      unit: '°C',
      icon: Thermometer,
      color: 'text-yellow-500',
      data: temperatureData?.slice(0, 7).reverse() || []
    }
  ];

  const handleAddMetric = async (type: string, value: number, unit: string) => {
    try {
      await addHealthMetric.mutateAsync({
        patientId,
        type: type as any,
        value,
        unit,
        recordedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error adding health metric:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {healthMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <Icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {metric.value} <span className="text-sm font-normal text-gray-500">{metric.unit}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Última medición: {metric.data[0]?.recordedAt ? 
                    new Date(metric.data[0].recordedAt).toLocaleDateString('es-MX') : 
                    'Sin datos'
                  }
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Gráficos de tendencias */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {healthMetrics.map((metric) => (
          <Card key={`chart-${metric.title}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
                Tendencia de {metric.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={metric.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="recordedAt" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString('es-MX', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString('es-MX')}
                    formatter={(value) => [`${value} ${metric.unit}`, metric.title]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={metric.color.replace('text-', '#')} 
                    strokeWidth={2}
                    dot={{ fill: metric.color.replace('text-', '#') }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Botones de acción rápida */}
      <Card>
        <CardHeader>
          <CardTitle>Registro Rápido</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              onClick={() => handleAddMetric('heart_rate', 72, 'bpm')}
              className="flex items-center gap-2"
            >
              <Heart className="h-4 w-4" />
              Registrar Pulso
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleAddMetric('blood_pressure', 120, 'mmHg')}
              className="flex items-center gap-2"
            >
              <Activity className="h-4 w-4" />
              Presión Arterial
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleAddMetric('weight', 70, 'kg')}
              className="flex items-center gap-2"
            >
              <Weight className="h-4 w-4" />
              Peso
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleAddMetric('temperature', 36.5, '°C')}
              className="flex items-center gap-2"
            >
              <Thermometer className="h-4 w-4" />
              Temperatura
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
