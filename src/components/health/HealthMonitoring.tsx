
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Heart, Activity, Weight, Thermometer, Smartphone, Wifi, WifiOff, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';

const healthMetricSchema = z.object({
  type: z.string().min(1, 'Selecciona un tipo de métrica'),
  value: z.number().min(0, 'El valor debe ser positivo'),
  unit: z.string().min(1, 'La unidad es requerida'),
});

type HealthMetricForm = z.infer<typeof healthMetricSchema>;

// Datos simulados
const heartRateData = [
  { date: '2024-06-01', value: 72 },
  { date: '2024-06-02', value: 75 },
  { date: '2024-06-03', value: 68 },
  { date: '2024-06-04', value: 71 },
  { date: '2024-06-05', value: 74 },
  { date: '2024-06-06', value: 69 },
  { date: '2024-06-07', value: 73 },
];

const bloodPressureData = [
  { date: '2024-06-01', systolic: 120, diastolic: 80 },
  { date: '2024-06-02', systolic: 118, diastolic: 78 },
  { date: '2024-06-03', systolic: 122, diastolic: 82 },
  { date: '2024-06-04', systolic: 119, diastolic: 79 },
  { date: '2024-06-05', systolic: 121, diastolic: 81 },
  { date: '2024-06-06', systolic: 117, diastolic: 77 },
  { date: '2024-06-07', systolic: 120, diastolic: 80 },
];

const weightData = [
  { date: '2024-06-01', value: 70.2 },
  { date: '2024-06-02', value: 70.1 },
  { date: '2024-06-03', value: 69.9 },
  { date: '2024-06-04', value: 70.0 },
  { date: '2024-06-05', value: 69.8 },
  { date: '2024-06-06', value: 69.7 },
  { date: '2024-06-07', value: 69.6 },
];

const connectedDevices = [
  { id: 1, name: 'Apple Watch Series 9', type: 'Smartwatch', status: 'connected', batteryLevel: 85 },
  { id: 2, name: 'Omron Blood Pressure Monitor', type: 'Monitor de Presión', status: 'connected', batteryLevel: 92 },
  { id: 3, name: 'Xiaomi Mi Scale', type: 'Báscula Inteligente', status: 'disconnected', batteryLevel: 0 },
];

export default function HealthMonitoring() {
  const [healthScore] = useState(87);
  const [selectedMetric, setSelectedMetric] = useState('heart_rate');

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<HealthMetricForm>({
    resolver: zodResolver(healthMetricSchema)
  });

  const watchedType = watch('type');

  const onSubmit = (data: HealthMetricForm) => {
    console.log('Nueva métrica de salud:', data);
    toast.success('Métrica de salud registrada correctamente');
    reset();
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthScoreLabel = (score: number) => {
    if (score >= 80) return 'Excelente';
    if (score >= 60) return 'Bueno';
    return 'Necesita Atención';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Monitoreo de Salud</h1>
          <p className="text-muted-foreground">Seguimiento de tus métricas de salud en tiempo real</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Puntuación de Salud</div>
          <div className={`text-3xl font-bold ${getHealthScoreColor(healthScore)}`}>
            {healthScore}/100
          </div>
          <div className={`text-sm font-medium ${getHealthScoreColor(healthScore)}`}>
            {getHealthScoreLabel(healthScore)}
          </div>
        </div>
      </div>

      {/* Dispositivos Conectados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Dispositivos Conectados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {connectedDevices.map((device) => (
              <div key={device.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {device.status === 'connected' ? (
                    <Wifi className="h-4 w-4 text-green-600" />
                  ) : (
                    <WifiOff className="h-4 w-4 text-red-600" />
                  )}
                  <div>
                    <div className="font-medium text-sm">{device.name}</div>
                    <div className="text-xs text-muted-foreground">{device.type}</div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={device.status === 'connected' ? 'default' : 'secondary'}>
                    {device.status === 'connected' ? 'Conectado' : 'Desconectado'}
                  </Badge>
                  {device.status === 'connected' && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Batería: {device.batteryLevel}%
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Frecuencia Cardíaca</CardTitle>
            <Heart className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73 bpm</div>
            <p className="text-xs text-muted-foreground">Promedio últimos 7 días</p>
            <div className="mt-4">
              <ResponsiveContainer width="100%" height={60}>
                <LineChart data={heartRateData}>
                  <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Presión Arterial</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120/80</div>
            <p className="text-xs text-muted-foreground">mmHg - Última medición</p>
            <div className="mt-4">
              <ResponsiveContainer width="100%" height={60}>
                <AreaChart data={bloodPressureData}>
                  <Area type="monotone" dataKey="systolic" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peso</CardTitle>
            <Weight className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">69.6 kg</div>
            <p className="text-xs text-muted-foreground">-0.6 kg esta semana</p>
            <div className="mt-4">
              <ResponsiveContainer width="100%" height={60}>
                <LineChart data={weightData}>
                  <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos detallados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tendencia de Frecuencia Cardíaca</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={heartRateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString('es-MX', { month: 'short', day: 'numeric' })} />
                <YAxis />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString('es-MX')}
                  formatter={(value) => [`${value} bpm`, 'Frecuencia Cardíaca']}
                />
                <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Presión Arterial</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={bloodPressureData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString('es-MX', { month: 'short', day: 'numeric' })} />
                <YAxis />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString('es-MX')}
                  formatter={(value, name) => [`${value} mmHg`, name === 'systolic' ? 'Sistólica' : 'Diastólica']}
                />
                <Line type="monotone" dataKey="systolic" stroke="#3b82f6" strokeWidth={2} name="systolic" />
                <Line type="monotone" dataKey="diastolic" stroke="#8b5cf6" strokeWidth={2} name="diastolic" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Formulario para agregar nueva lectura */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Agregar Nueva Lectura
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Métrica</Label>
                <Select onValueChange={(value) => {
                  setValue('type', value);
                  // Auto-set unit based on type
                  if (value === 'heart_rate') setValue('unit', 'bpm');
                  else if (value === 'weight') setValue('unit', 'kg');
                  else if (value === 'temperature') setValue('unit', '°C');
                  else if (value === 'blood_pressure') setValue('unit', 'mmHg');
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="heart_rate">Frecuencia Cardíaca</SelectItem>
                    <SelectItem value="blood_pressure">Presión Arterial</SelectItem>
                    <SelectItem value="weight">Peso</SelectItem>
                    <SelectItem value="temperature">Temperatura</SelectItem>
                  </SelectContent>
                </Select>
                {errors.type && <p className="text-sm text-red-600">{errors.type.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="value">Valor</Label>
                <Input
                  id="value"
                  type="number"
                  step="0.1"
                  placeholder="Ingresa el valor"
                  {...register('value', { valueAsNumber: true })}
                />
                {errors.value && <p className="text-sm text-red-600">{errors.value.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit">Unidad</Label>
                <Input
                  id="unit"
                  placeholder="Unidad de medida"
                  {...register('unit')}
                  readOnly
                />
                {errors.unit && <p className="text-sm text-red-600">{errors.unit.message}</p>}
              </div>
            </div>

            <Button type="submit" className="w-full">
              Registrar Lectura
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
