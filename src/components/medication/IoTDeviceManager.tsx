
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Smartphone,
  Wifi,
  WifiOff,
  Activity,
  Heart,
  Pill,
  Camera,
  Clock,
  AlertTriangle,
  Settings,
  Plus
} from 'lucide-react';

interface IoTDeviceManagerProps {
  patientId: string;
}

interface IoTDevice {
  id: string;
  name: string;
  type: string;
  model: string;
  manufacturer: string;
  serialNumber: string;
  firmwareVersion: string;
  batteryLevel: number;
  signalStrength: number;
  isOnline: boolean;
  lastHeartbeat: string;
  location: string;
  settings?: Record<string, boolean>;
  compartments?: Array<{
    id: number;
    medication: string;
    pillCount: number;
    capacity: number;
    nextDispense: string | null;
  }>;
  alerts?: Array<{
    type: string;
    severity: string;
    message: string;
    timestamp: string;
  }>;
  metrics?: Array<{
    timestamp: string;
    heartRate?: number;
    bloodPressure?: { systolic: number; diastolic: number };
    oxygenSaturation?: number;
  }>;
}

export default function IoTDeviceManager({ patientId }: IoTDeviceManagerProps) {
  const [devices, setDevices] = useState<IoTDevice[]>([
    {
      id: '1',
      name: 'Smart Pill Dispenser Pro',
      type: 'pill_dispenser',
      model: 'SPD-2024-V3',
      manufacturer: 'MedTech Solutions',
      serialNumber: 'SPD-001-2024',
      firmwareVersion: '3.2.1',
      batteryLevel: 85,
      signalStrength: 92,
      isOnline: true,
      lastHeartbeat: '2024-06-08T10:30:00Z',
      location: 'Sala de estar',
      settings: {
        soundAlerts: true,
        visualAlerts: true,
        dosageReminders: true,
        lowStockWarnings: true,
        tamperAlerts: true
      },
      compartments: [
        { id: 1, medication: 'Metformina', pillCount: 45, capacity: 60, nextDispense: '2024-06-08T20:30:00Z' },
        { id: 2, medication: 'Lisinopril', pillCount: 28, capacity: 30, nextDispense: '2024-06-09T09:00:00Z' },
        { id: 3, medication: 'Vitamina D', pillCount: 15, capacity: 30, nextDispense: '2024-06-08T10:00:00Z' },
        { id: 4, medication: 'Vacío', pillCount: 0, capacity: 30, nextDispense: null }
      ],
      alerts: [
        { type: 'low_stock', severity: 'medium', message: 'Vitamina D - Stock bajo (15 píldoras)', timestamp: '2024-06-08T09:00:00Z' }
      ]
    },
    {
      id: '2',
      name: 'HealthWatch Vital Monitor',
      type: 'wearable',
      model: 'HWV-2024',
      manufacturer: 'VitalTech',
      serialNumber: 'HWV-002-2024',
      firmwareVersion: '2.1.0',
      batteryLevel: 42,
      signalStrength: 88,
      isOnline: true,
      lastHeartbeat: '2024-06-08T10:25:00Z',
      location: 'Muñeca izquierda',
      metrics: [
        { timestamp: '2024-06-08T10:00:00Z', heartRate: 72, bloodPressure: { systolic: 120, diastolic: 80 }, oxygenSaturation: 98 },
        { timestamp: '2024-06-08T10:15:00Z', heartRate: 75, bloodPressure: { systolic: 118, diastolic: 78 }, oxygenSaturation: 97 },
        { timestamp: '2024-06-08T10:30:00Z', heartRate: 73, bloodPressure: { systolic: 122, diastolic: 82 }, oxygenSaturation: 98 }
      ],
      alerts: []
    },
    {
      id: '3',
      name: 'Adherence Camera System',
      type: 'environment_sensor',
      model: 'ACS-2024',
      manufacturer: 'VisionMed',
      serialNumber: 'ACS-003-2024',
      firmwareVersion: '1.5.2',
      batteryLevel: 12,
      signalStrength: 45,
      isOnline: false,
      lastHeartbeat: '2024-06-08T08:30:00Z',
      location: 'Mesa de medicamentos',
      settings: {
        motionDetection: true,
        photoVerification: true,
        privacyMode: false,
        nightVision: true
      },
      alerts: [
        { type: 'battery_low', severity: 'high', message: 'Batería crítica - 12% restante', timestamp: '2024-06-08T10:00:00Z' },
        { type: 'device_offline', severity: 'high', message: 'Dispositivo desconectado hace 2 horas', timestamp: '2024-06-08T08:30:00Z' }
      ]
    }
  ]);

  const [vitalHistory] = useState([
    { time: '06:00', heartRate: 68, bp: 118 },
    { time: '08:00', heartRate: 72, bp: 120 },
    { time: '10:00', heartRate: 75, bp: 125 },
    { time: '12:00', heartRate: 78, bp: 122 },
    { time: '14:00', heartRate: 76, bp: 119 },
    { time: '16:00', heartRate: 74, bp: 121 }
  ]);

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'pill_dispenser': return <Pill className="h-5 w-5" />;
      case 'wearable': return <Heart className="h-5 w-5" />;
      case 'environment_sensor': return <Camera className="h-5 w-5" />;
      default: return <Smartphone className="h-5 w-5" />;
    }
  };

  const getStatusColor = (isOnline: boolean, batteryLevel: number) => {
    if (!isOnline) return 'text-red-500';
    if (batteryLevel < 20) return 'text-yellow-500';
    return 'text-green-500';
  };

  const toggleDeviceSetting = (deviceId: string, setting: string) => {
    setDevices(prev => prev.map(device => {
      if (device.id === deviceId && device.settings) {
        return {
          ...device,
          settings: {
            ...device.settings,
            [setting]: !device.settings[setting]
          }
        };
      }
      return device;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Device Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dispositivos Activos</CardTitle>
            <Smartphone className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 conectados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conectividad</CardTitle>
            <Wifi className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67%</div>
            <p className="text-xs text-muted-foreground">Señal promedio</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Batería Promedio</CardTitle>
            <Battery className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">46%</div>
            <p className="text-xs text-muted-foreground">1 crítico</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 críticas</p>
          </CardContent>
        </Card>
      </div>

      {/* Critical Alerts */}
      <Alert className="border-l-4 border-l-red-500">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Atención requerida:</strong> Adherence Camera System desconectada y con batería crítica. 
          Verificación por foto no disponible.
        </AlertDescription>
      </Alert>

      {/* Vital Signs Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Monitoreo de Signos Vitales (Tiempo Real)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={vitalHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" domain={[60, 85]} />
                <YAxis yAxisId="right" orientation="right" domain={[110, 130]} />
                <Tooltip />
                <Line yAxisId="left" type="monotone" dataKey="heartRate" stroke="#ef4444" strokeWidth={2} name="FC (bpm)" />
                <Line yAxisId="right" type="monotone" dataKey="bp" stroke="#3b82f6" strokeWidth={2} name="PA Sistólica" />
              </LineChart>
            </ResponsiveContainer>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span className="font-medium">Frecuencia Cardíaca</span>
                  </div>
                  <div className="text-2xl font-bold text-red-600">73 bpm</div>
                  <div className="text-sm text-gray-600">Normal</div>
                </div>
                
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">Presión Arterial</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">122/82</div>
                  <div className="text-sm text-gray-600">Ligeramente elevada</div>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">Saturación O²</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">98%</div>
                  <div className="text-sm text-gray-600">Excelente</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Device Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Gestión de Dispositivos IoT
            </span>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Agregar Dispositivo
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {devices.map((device) => (
              <div key={device.id} className="p-6 border rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {getDeviceIcon(device.type)}
                    </div>
                    <div>
                      <h4 className="font-semibold">{device.name}</h4>
                      <p className="text-sm text-gray-600">
                        {device.manufacturer} • {device.model}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {device.isOnline ? (
                      <Badge variant="default">En línea</Badge>
                    ) : (
                      <Badge variant="destructive">Desconectado</Badge>
                    )}
                    <Badge variant="outline">{device.firmwareVersion}</Badge>
                  </div>
                </div>

                {/* Device Status */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Battery className={`h-4 w-4 ${getStatusColor(device.isOnline, device.batteryLevel)}`} />
                    <div>
                      <div className="text-sm text-gray-500">Batería</div>
                      <div className="font-medium">{device.batteryLevel}%</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {device.isOnline ? (
                      <Wifi className="h-4 w-4 text-green-500" />
                    ) : (
                      <WifiOff className="h-4 w-4 text-red-500" />
                    )}
                    <div>
                      <div className="text-sm text-gray-500">Señal</div>
                      <div className="font-medium">{device.signalStrength}%</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <div>
                      <div className="text-sm text-gray-500">Ubicación</div>
                      <div className="font-medium">{device.location}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-500">Último sync</div>
                      <div className="font-medium">
                        {new Date(device.lastHeartbeat).toLocaleTimeString('es-MX', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Battery Progress */}
                <div className="mb-4">
                  <Progress value={device.batteryLevel} className={`h-2 ${
                    device.batteryLevel < 20 ? 'bg-red-100' : 
                    device.batteryLevel < 50 ? 'bg-yellow-100' : 'bg-green-100'
                  }`} />
                </div>

                {/* Smart Dispenser Compartments */}
                {device.type === 'pill_dispenser' && device.compartments && (
                  <div className="mb-4">
                    <h5 className="font-medium mb-3">Compartimentos</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {device.compartments.map((compartment) => (
                        <div key={compartment.id} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Compartimento {compartment.id}</span>
                            <Badge variant={compartment.medication === 'Vacío' ? 'secondary' : 'default'}>
                              {compartment.medication}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span>Stock: {compartment.pillCount}/{compartment.capacity}</span>
                            {compartment.nextDispense && (
                              <span className="text-green-600">
                                Próximo: {new Date(compartment.nextDispense).toLocaleTimeString('es-MX', { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </span>
                            )}
                          </div>
                          <Progress 
                            value={(compartment.pillCount / compartment.capacity) * 100} 
                            className="h-1 mt-2" 
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Device Settings */}
                {device.settings && (
                  <div className="mb-4">
                    <h5 className="font-medium mb-3">Configuración</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(device.settings).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {key === 'soundAlerts' && <Volume2 className="h-4 w-4" />}
                            {key === 'visualAlerts' && <Eye className="h-4 w-4" />}
                            {key === 'tamperAlerts' && <Lock className="h-4 w-4" />}
                            <span className="text-sm">
                              {key === 'soundAlerts' && 'Alertas sonoras'}
                              {key === 'visualAlerts' && 'Alertas visuales'}
                              {key === 'dosageReminders' && 'Recordatorios de dosis'}
                              {key === 'lowStockWarnings' && 'Avisos de stock bajo'}
                              {key === 'tamperAlerts' && 'Alertas de manipulación'}
                              {key === 'motionDetection' && 'Detección de movimiento'}
                              {key === 'photoVerification' && 'Verificación por foto'}
                              {key === 'privacyMode' && 'Modo privacidad'}
                              {key === 'nightVision' && 'Visión nocturna'}
                            </span>
                          </div>
                          <Switch
                            checked={value as boolean}
                            onCheckedChange={() => toggleDeviceSetting(device.id, key)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Device Alerts */}
                {device.alerts && device.alerts.length > 0 && (
                  <div className="mb-4">
                    <h5 className="font-medium mb-3">Alertas Activas</h5>
                    <div className="space-y-2">
                      {device.alerts.map((alert, index) => (
                        <Alert key={index} className={`border-l-4 ${
                          alert.severity === 'high' ? 'border-l-red-500' : 
                          alert.severity === 'medium' ? 'border-l-yellow-500' : 'border-l-blue-500'
                        }`}>
                          <AlertTriangle className="h-4 w-4" />
                          <AlertDescription>
                            <div className="flex items-center justify-between">
                              <span>{alert.message}</span>
                              <Badge variant={
                                alert.severity === 'high' ? 'destructive' : 
                                alert.severity === 'medium' ? 'secondary' : 'outline'
                              }>
                                {alert.severity}
                              </Badge>
                            </div>
                          </AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </div>
                )}

                {/* Device Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-1" />
                    Configurar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Activity className="h-4 w-4 mr-1" />
                    Diagnóstico
                  </Button>
                  {device.type === 'pill_dispenser' && (
                    <Button variant="outline" size="sm">
                      <Pill className="h-4 w-4 mr-1" />
                      Rellenar
                    </Button>
                  )}
                  {!device.isOnline && (
                    <Button variant="default" size="sm">
                      <Wifi className="h-4 w-4 mr-1" />
                      Reconectar
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
