
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Activity, Droplets, Weight } from 'lucide-react';
import { usePatientHealthMetrics } from '@/hooks/usePatient';

interface CompactHealthMetricsProps {
  patientId: string;
}

export default function CompactHealthMetrics({ patientId }: CompactHealthMetricsProps) {
  const { data: heartRateData } = usePatientHealthMetrics(patientId, 'heart_rate');
  const { data: bloodPressureData } = usePatientHealthMetrics(patientId, 'blood_pressure');
  const { data: weightData } = usePatientHealthMetrics(patientId, 'weight');

  const metrics = [
    {
      icon: Heart,
      label: 'Pulso',
      value: heartRateData?.[0]?.value || 72,
      unit: 'bpm',
      color: 'text-red-500'
    },
    {
      icon: Activity,
      label: 'Presión',
      value: bloodPressureData?.[0]?.value || 120,
      unit: 'mmHg',
      color: 'text-blue-500'
    },
    {
      icon: Weight,
      label: 'Peso',
      value: weightData?.[0]?.value || 70,
      unit: 'kg',
      color: 'text-green-500'
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Métricas de Salud</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="text-center p-2 bg-gray-50 rounded-lg">
                <Icon className={`h-5 w-5 mx-auto mb-1 ${metric.color}`} />
                <div className="text-lg font-semibold">{metric.value}</div>
                <div className="text-xs text-gray-500">{metric.unit}</div>
                <div className="text-xs text-gray-600 mt-1">{metric.label}</div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
