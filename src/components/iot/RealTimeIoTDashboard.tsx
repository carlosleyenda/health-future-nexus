import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Heart, Activity, Thermometer, Droplets, Zap, Wifi, 
  Smartphone, Watch, Scale, Stethoscope, AlertTriangle,
  TrendingUp, Battery, Signal, CheckCircle, XCircle
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface IoTDevice {
  id: string;
  name: string;
  type: 'smartwatch' | 'glucometer' | 'blood_pressure' | 'scale' | 'oximeter' | 'fitbit';
  status: 'online' | 'offline' | 'syncing' | 'error';
  battery: number;
  lastReading: string;
  data: {
    heartRate?: number;
    bloodPressure?: { systolic: number; diastolic: number };
    glucose?: number;
    weight?: number;
    oxygenSaturation?: number;
    steps?: number;
    calories?: number;
    temperature?: number;
  };
  alerts?: string[];
}

interface RealTimeIoTDashboardProps {
  patientId: string;
}

export default function RealTimeIoTDashboard({ patientId }: RealTimeIoTDashboardProps) {
  const [devices, setDevices] = useState<IoTDevice[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [healthAlerts, setHealthAlerts] = useState<string[]>([]);

  useEffect(() => {
    // Simular datos IoT en tiempo real
    const mockDevices: IoTDevice[] = [
      {
        id: 'fitbit-1',
        name: 'Fitbit Sense 2',
        type: 'fitbit',
        status: 'online',
        battery: 85,
        lastReading: new Date().toISOString(),
        data: {
          heartRate: 72,
          steps: 8543,
          calories: 2150,
          temperature: 36.5
        },
        alerts: []
      },
      {
        id: 'glucometer-1',
        name: 'OneTouch Verio',
        type: 'glucometer',
        status: 'online',
        battery: 67,
        lastReading: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        data: {
          glucose: 95
        },
        alerts: []
      },
      {
        id: 'bp-monitor-1',
        name: 'Omron HeartGuide',
        type: 'blood_pressure',
        status: 'online',
        battery: 45,
        lastReading: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        data: {
          bloodPressure: { systolic: 120, diastolic: 80 }
        },
        alerts: []
      },
      {
        id: 'scale-1',
        name: 'Withings Body+',
        type: 'scale',
        status: 'syncing',
        battery: 92,
        lastReading: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        data: {
          weight: 72.5
        },
        alerts: []
      }
    ];

    setDevices(mockDevices);
    
    // Simular actualizaciones en tiempo real
    const interval = setInterval(() => {
      setDevices(prevDevices => 
        prevDevices.map(device => ({
          ...device,
          data: {
            ...device.data,
            heartRate: device.type === 'fitbit' ? 
              Math.floor(Math.random() * (85 - 65) + 65) : device.data.heartRate,
            steps: device.type === 'fitbit' ? 
              device.data.steps! + Math.floor(Math.random() * 10) : device.data.steps,
          },
          lastReading: device.status === 'online' ? new Date().toISOString() : device.lastReading
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [patientId]);

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'fitbit':
      case 'smartwatch':
        return Watch;
      case 'glucometer':
        return Droplets;
      case 'blood_pressure':
        return Heart;
      case 'scale':
        return Scale;
      case 'oximeter':
        return Activity;
      default:
        return Smartphone;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800';
      case 'offline': return 'bg-red-100 text-red-800';
      case 'syncing': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const connectNewDevice = async (deviceType: string) => {
    setIsConnecting(true);
    
    // Simular proceso de conexión
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (deviceType === 'fitbit') {
      // Redireccionar a autenticación de Fitbit
      window.open('https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=YOUR_CLIENT_ID&scope=activity+heartrate+profile', '_blank');
    }
    
    setIsConnecting(false);
    toast.success(`Dispositivo ${deviceType} conectado exitosamente`);
  };

  const analyzeHealthTrends = (device: IoTDevice) => {
    const analysis = [];
    
    if (device.data.heartRate && device.data.heartRate > 100) {
      analysis.push("Frecuencia cardíaca elevada detectada");
    }
    
    if (device.data.glucose && device.data.glucose > 140) {
      analysis.push("Nivel de glucosa alto - consulte a su médico");
    }
    
    if (device.data.bloodPressure) {
      const { systolic, diastolic } = device.data.bloodPressure;
      if (systolic > 140 || diastolic > 90) {
        analysis.push("Presión arterial elevada");
      }
    }
    
    return analysis;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dashboard IoT Médico</h2>
        <Button onClick={() => connectNewDevice('fitbit')} disabled={isConnecting}>
          {isConnecting ? 'Conectando...' : 'Conectar Dispositivo'}
        </Button>
      </div>

      {/* Alertas de salud */}
      {healthAlerts.length > 0 && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Alertas de salud activas:</strong>
            <ul className="mt-2 list-disc list-inside">
              {healthAlerts.map((alert, index) => (
                <li key={index}>{alert}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="devices" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="devices">Dispositivos</TabsTrigger>
          <TabsTrigger value="metrics">Métricas</TabsTrigger>
          <TabsTrigger value="trends">Tendencias</TabsTrigger>
          <TabsTrigger value="ai-analysis">Análisis IA</TabsTrigger>
        </TabsList>

        <TabsContent value="devices" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {devices.map((device) => {
              const DeviceIcon = getDeviceIcon(device.type);
              const analysis = analyzeHealthTrends(device);
              
              return (
                <Card 
                  key={device.id} 
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedDevice === device.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedDevice(device.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <DeviceIcon className="h-5 w-5 text-primary" />
                        <CardTitle className="text-base">{device.name}</CardTitle>
                      </div>
                      <Badge className={getStatusColor(device.status)}>
                        {device.status.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {/* Batería */}
                      <div className="flex items-center gap-2">
                        <Battery className="h-4 w-4 text-gray-400" />
                        <Progress value={device.battery} className="flex-1" />
                        <span className="text-sm text-gray-500">{device.battery}%</span>
                      </div>

                      {/* Datos principales */}
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {device.data.heartRate && (
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3 text-red-500" />
                            <span>{device.data.heartRate} bpm</span>
                          </div>
                        )}
                        {device.data.glucose && (
                          <div className="flex items-center gap-1">
                            <Droplets className="h-3 w-3 text-blue-500" />
                            <span>{device.data.glucose} mg/dL</span>
                          </div>
                        )}
                        {device.data.bloodPressure && (
                          <div className="flex items-center gap-1">
                            <Activity className="h-3 w-3 text-purple-500" />
                            <span>{device.data.bloodPressure.systolic}/{device.data.bloodPressure.diastolic}</span>
                          </div>
                        )}
                        {device.data.weight && (
                          <div className="flex items-center gap-1">
                            <Scale className="h-3 w-3 text-green-500" />
                            <span>{device.data.weight} kg</span>
                          </div>
                        )}
                        {device.data.steps && (
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 text-indigo-500" />
                            <span>{device.data.steps.toLocaleString()} pasos</span>
                          </div>
                        )}
                        {device.data.temperature && (
                          <div className="flex items-center gap-1">
                            <Thermometer className="h-3 w-3 text-orange-500" />
                            <span>{device.data.temperature}°C</span>
                          </div>
                        )}
                      </div>

                      {/* Análisis y alertas */}
                      {analysis.length > 0 && (
                        <div className="space-y-1">
                          {analysis.map((alert, index) => (
                            <div key={index} className="flex items-center gap-1 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                              <AlertTriangle className="h-3 w-3" />
                              <span>{alert}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="text-xs text-gray-400">
                        Última lectura: {new Date(device.lastReading).toLocaleTimeString('es-MX')}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {devices.map((device) => (
              <Card key={device.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">{device.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {Object.entries(device.data).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="font-medium">
                          {typeof value === 'object' 
                            ? `${value.systolic}/${value.diastolic}` 
                            : `${value} ${getUnit(key)}`
                          }
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tendencias de Salud (Últimos 7 días)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Gráfico de tendencias - Implementación con Chart.js o Recharts</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">↗ 5%</div>
                    <div className="text-sm text-gray-500">Actividad física</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">→ 0%</div>
                    <div className="text-sm text-gray-500">Presión arterial</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">↘ 3%</div>
                    <div className="text-sm text-gray-500">Nivel de glucosa</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análisis Inteligente de Datos IoT</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert className="border-blue-200 bg-blue-50">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>Patrón saludable detectado:</strong> Sus métricas cardiovasculares están dentro del rango normal y muestran una tendencia estable.
                  </AlertDescription>
                </Alert>
                
                <Alert className="border-yellow-200 bg-yellow-50">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800">
                    <strong>Recomendación:</strong> Se detectó una ligera disminución en la actividad física. Considere aumentar los pasos diarios en 1000 para mantener un nivel óptimo.
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <h4 className="font-medium">Predicciones IA:</h4>
                  <ul className="list-disc list-inside text-sm space-y-1 text-gray-600">
                    <li>Riesgo cardiovascular: Bajo (95% confianza)</li>
                    <li>Probabilidad de eventos adversos: 2% en próximos 30 días</li>
                    <li>Adherencia a rutina de ejercicio: 85%</li>
                    <li>Calidad del sueño estimada: Buena</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function getUnit(metric: string): string {
  switch (metric) {
    case 'heartRate': return 'bpm';
    case 'glucose': return 'mg/dL';
    case 'weight': return 'kg';
    case 'oxygenSaturation': return '%';
    case 'steps': return '';
    case 'calories': return 'kcal';
    case 'temperature': return '°C';
    default: return '';
  }
}