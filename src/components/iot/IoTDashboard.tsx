
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Heart, 
  Scale, 
  Droplets, 
  Thermometer,
  Watch,
  Smartphone,
  Wifi,
  WifiOff,
  Battery,
  Settings
} from 'lucide-react';
import type { MonitoringDevice, IoTDeviceReading } from '@/types/iot-devices';

interface IoTDashboardProps {
  patientId: string;
}

export default function IoTDashboard({ patientId }: IoTDashboardProps) {
  const [devices, setDevices] = useState<MonitoringDevice[]>([]);
  const [readings, setReadings] = useState<IoTDeviceReading[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDevices();
    loadRecentReadings();
  }, [patientId]);

  const loadDevices = async () => {
    try {
      // Mock data - replace with actual API call
      const mockDevices: MonitoringDevice[] = [
        {
          id: 'fitbit-001',
          patientId,
          deviceType: 'smartwatch',
          brand: 'Fitbit',
          model: 'Charge 5',
          serialNumber: 'FB123456789',
          lastSync: '2024-06-08T10:30:00Z',
          batteryLevel: 75,
          firmwareVersion: '1.2.3',
          isActive: true,
          aiAnalyticsEnabled: true
        },
        {
          id: 'omron-001',
          patientId,
          deviceType: 'blood_pressure_monitor',
          brand: 'Omron',
          model: 'HEM-7120',
          serialNumber: 'OM987654321',
          lastSync: '2024-06-08T09:15:00Z',
          batteryLevel: 60,
          isActive: true
        },
        {
          id: 'accu-001',
          patientId,
          deviceType: 'glucose_meter',
          brand: 'Accu-Chek',
          model: 'Guide',
          serialNumber: 'AC456789123',
          lastSync: '2024-06-08T11:00:00Z',
          batteryLevel: 40,
          isActive: true
        }
      ];
      setDevices(mockDevices);
    } catch (error) {
      console.error('Error loading devices:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadRecentReadings = async () => {
    try {
      // Mock readings data
      const mockReadings: IoTDeviceReading[] = [
        {
          deviceId: 'fitbit-001',
          timestamp: '2024-06-08T10:30:00Z',
          readings: {
            heart_rate: { value: 72, unit: 'bpm', confidence: 0.95 },
            steps: { value: 8543, unit: 'steps' },
            calories: { value: 420, unit: 'kcal' }
          },
          processed: true
        },
        {
          deviceId: 'omron-001',
          timestamp: '2024-06-08T09:15:00Z',
          readings: {
            systolic: { value: 120, unit: 'mmHg', confidence: 0.98 },
            diastolic: { value: 80, unit: 'mmHg', confidence: 0.98 }
          },
          processed: true
        }
      ];
      setReadings(mockReadings);
    } catch (error) {
      console.error('Error loading readings:', error);
    }
  };

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'smartwatch': return <Watch className="h-5 w-5" />;
      case 'blood_pressure_monitor': return <Heart className="h-5 w-5" />;
      case 'glucose_meter': return <Droplets className="h-5 w-5" />;
      case 'scale': return <Scale className="h-5 w-5" />;
      case 'thermometer': return <Thermometer className="h-5 w-5" />;
      default: return <Smartphone className="h-5 w-5" />;
    }
  };

  const getStatusColor = (isActive: boolean, batteryLevel?: number) => {
    if (!isActive) return 'destructive';
    if (batteryLevel && batteryLevel < 20) return 'secondary';
    return 'default';
  };

  const connectFitbit = () => {
    window.location.href = '/api/iot/fitbit/auth';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dispositivos IoT</h2>
        <Button onClick={connectFitbit}>
          <Watch className="h-4 w-4 mr-2" />
          Conectar Fitbit
        </Button>
      </div>

      <Tabs defaultValue="devices" className="space-y-4">
        <TabsList>
          <TabsTrigger value="devices">Dispositivos</TabsTrigger>
          <TabsTrigger value="readings">Lecturas Recientes</TabsTrigger>
          <TabsTrigger value="analytics">Análisis IA</TabsTrigger>
        </TabsList>

        <TabsContent value="devices" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {devices.map((device) => (
              <Card key={device.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getDeviceIcon(device.deviceType)}
                      <CardTitle className="text-lg">{device.brand} {device.model}</CardTitle>
                    </div>
                    {device.isActive ? (
                      <Wifi className="h-4 w-4 text-green-500" />
                    ) : (
                      <WifiOff className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Estado</span>
                    <Badge variant={getStatusColor(device.isActive, device.batteryLevel)}>
                      {device.isActive ? 'Conectado' : 'Desconectado'}
                    </Badge>
                  </div>
                  
                  {device.batteryLevel && (
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Batería</span>
                        <div className="flex items-center space-x-1">
                          <Battery className="h-3 w-3" />
                          <span className="text-sm">{device.batteryLevel}%</span>
                        </div>
                      </div>
                      <Progress value={device.batteryLevel} className="h-2" />
                    </div>
                  )}

                  <div className="text-xs text-gray-500">
                    Última sincronización: {new Date(device.lastSync).toLocaleString()}
                  </div>

                  {device.aiAnalyticsEnabled && (
                    <Badge variant="outline" className="text-xs">
                      <Activity className="h-3 w-3 mr-1" />
                      IA Activada
                    </Badge>
                  )}

                  <Button variant="outline" size="sm" className="w-full">
                    <Settings className="h-3 w-3 mr-1" />
                    Configurar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="readings" className="space-y-4">
          <div className="space-y-4">
            {readings.map((reading, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">
                      {devices.find(d => d.id === reading.deviceId)?.brand} - Lectura
                    </CardTitle>
                    <span className="text-sm text-gray-500">
                      {new Date(reading.timestamp).toLocaleString()}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(reading.readings).map(([key, value]) => (
                      <div key={key} className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="font-semibold text-lg">{value.value}</div>
                        <div className="text-sm text-gray-600">{value.unit}</div>
                        <div className="text-xs text-gray-500 capitalize">{key.replace('_', ' ')}</div>
                        {value.confidence && (
                          <div className="text-xs text-green-600">
                            Confianza: {(value.confidence * 100).toFixed(0)}%
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análisis de IA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Activity className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Análisis de IA en desarrollo</p>
                <p className="text-sm text-gray-500 mt-2">
                  Pronto tendrás insights inteligentes sobre tus datos de salud
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
