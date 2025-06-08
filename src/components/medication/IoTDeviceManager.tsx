
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Wifi, 
  WifiOff, 
  Battery, 
  Activity, 
  AlertTriangle, 
  CheckCircle,
  Settings,
  Bluetooth,
  Smartphone,
  Pill,
  Camera,
  Plus,
  Heart,
  TrendingUp,
  Calendar,
  Clock,
  Signal,
  MapPin,
  Volume2,
  Eye,
  Lock
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import type { IoTDevice } from '@/types/iot';

interface IoTDeviceManagerProps {
  patientId: string;
}

export default function IoTDeviceManager({ patientId }: IoTDeviceManagerProps) {
  const [devices, setDevices] = useState<IoTDevice[]>([
    {
      id: '1',
      name: 'Smart Pill Dispenser Pro',
      type: 'pill_dispenser',
      status: 'active',
      isConnected: true,
      lastSeen: '2024-06-08T10:30:00Z',
      batteryLevel: 85,
      version: '3.2.1',
      location: 'Sala de estar',
      serialNumber: 'SPD-001-2024',
      manufacturer: 'MedTech Solutions',
      model: 'SPD-2024-V3',
      firmwareVersion: '3.2.1',
      connectionType: 'wifi',
      dataFrequency: 15,
      configuration: {
        samplingRate: 60,
        dataStorageLimit: 1000,
        alertThresholds: {},
        encryptionType: 'AES-256',
        accessControls: []
      },
      capabilities: [],
      alerts: [
        { 
          id: 'alert-1',
          type: 'low_stock', 
          severity: 'medium', 
          message: 'Vitamina D - Stock bajo (15 píldoras)', 
          timestamp: '2024-06-08T09:00:00Z',
          deviceId: '1',
          isResolved: false
        }
      ],
      readings: [],
      healthScore: 85,
      complianceStatus: 'compliant',
      encryptionEnabled: true,
      certifications: [],
      powerSource: 'mains',
      expectedLifespan: 60,
      costPerMonth: 25,
      isOnline: true,
      signalStrength: 92,
      lastHeartbeat: '2024-06-08T10:30:00Z',
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
      ]
    },
    {
      id: '2',
      name: 'HealthWatch Vital Monitor',
      type: 'wearable',
      status: 'active',
      isConnected: true,
      lastSeen: '2024-06-08T10:25:00Z',
      batteryLevel: 42,
      version: '2.1.0',
      location: 'Muñeca izquierda',
      serialNumber: 'HWV-002-2024',
      manufacturer: 'VitalTech',
      model: 'HWV-2024',
      firmwareVersion: '2.1.0',
      connectionType: 'bluetooth',
      dataFrequency: 5,
      configuration: {
        samplingRate: 300,
        dataStorageLimit: 5000,
        alertThresholds: {},
        encryptionType: 'AES-256',
        accessControls: []
      },
      capabilities: [],
      alerts: [],
      readings: [],
      healthScore: 92,
      complianceStatus: 'compliant',
      encryptionEnabled: true,
      certifications: [],
      powerSource: 'battery',
      expectedLifespan: 24,
      costPerMonth: 15,
      isOnline: true,
      signalStrength: 88,
      lastHeartbeat: '2024-06-08T10:25:00Z',
      metrics: [
        { timestamp: '2024-06-08T10:00:00Z', heartRate: 72, bloodPressure: { systolic: 120, diastolic: 80 }, oxygenSaturation: 98 },
        { timestamp: '2024-06-08T10:15:00Z', heartRate: 75, bloodPressure: { systolic: 118, diastolic: 78 }, oxygenSaturation: 97 },
        { timestamp: '2024-06-08T10:30:00Z', heartRate: 73, bloodPressure: { systolic: 122, diastolic: 82 }, oxygenSaturation: 98 }
      ]
    },
    {
      id: '3',
      name: 'Adherence Camera System',
      type: 'environment_sensor',
      status: 'offline',
      isConnected: false,
      lastSeen: '2024-06-08T08:30:00Z',
      batteryLevel: 12,
      version: '1.5.2',
      location: 'Mesa de medicamentos',
      serialNumber: 'ACS-003-2024',
      manufacturer: 'VisionMed',
      model: 'ACS-2024',
      firmwareVersion: '1.5.2',
      connectionType: 'wifi',
      dataFrequency: 60,
      configuration: {
        samplingRate: 3600,
        dataStorageLimit: 500,
        alertThresholds: {},
        encryptionType: 'AES-256',
        accessControls: []
      },
      capabilities: [],
      alerts: [
        { 
          id: 'alert-2',
          type: 'battery_low', 
          severity: 'high', 
          message: 'Batería crítica - 12% restante', 
          timestamp: '2024-06-08T10:00:00Z',
          deviceId: '3',
          isResolved: false
        },
        { 
          id: 'alert-3',
          type: 'device_offline', 
          severity: 'high', 
          message: 'Dispositivo desconectado hace 2 horas', 
          timestamp: '2024-06-08T08:30:00Z',
          deviceId: '3',
          isResolved: false
        }
      ],
      readings: [],
      healthScore: 45,
      complianceStatus: 'non-compliant',
      encryptionEnabled: true,
      certifications: [],
      powerSource: 'battery',
      expectedLifespan: 36,
      costPerMonth: 30,
      isOnline: false,
      signalStrength: 45,
      lastHeartbeat: '2024-06-08T08:30:00Z',
      settings: {
        motionDetection: true,
        photoVerification: true,
        privacyMode: false,
        nightVision: true
      }
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

  const [connectedDevices, setConnectedDevices] = useState<IoTDevice[]>([]);
  const [alertDevices, setAlertDevices] = useState<IoTDevice[]>([]);

  useEffect(() => {
    setConnectedDevices(devices.filter(d => d.isOnline));
    setAlertDevices(devices.filter(d => d.alerts && d.alerts.length > 0));
  }, [devices]);

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'pill_dispenser': return <Pill className="h-5 w-5" />;
      case 'wearable': return <Heart className="h-5 w-5" />;
      case 'environment_sensor': return <Camera className="h-5 w-5" />;
      default: return <Smartphone className="h-5 w-5" />;
    }
  };

  const getStatusColor = (isOnline: boolean | undefined, batteryLevel: number | undefined) => {
    if (!isOnline) return 'text-red-500';
    if (batteryLevel && batteryLevel < 20) return 'text-yellow-500';
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
            <Activity className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{connectedDevices.filter(d => d.isConnected).length}</div>
            <p className="text-xs text-muted-foreground">
              de {connectedDevices.length} conectados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Batería Promedio</CardTitle>
            <Battery className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(connectedDevices.reduce((sum, d) => sum + (d.batteryLevel || 0), 0) / connectedDevices.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Promedio de todos los dispositivos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Señal Promedio</CardTitle>
            <Signal className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(connectedDevices.reduce((sum, d) => sum + (d.signalStrength || 0), 0) / connectedDevices.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Calidad de conexión</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas Activas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alertDevices.filter(a => a.alerts.some(alert => !alert.isResolved)).length}</div>
            <p className="text-xs text-muted-foreground">Requieren atención</p>
          </CardContent>
        </Card>
      </div>

      {/* Device Management Tabs */}
      <Tabs defaultValue="devices" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="devices">Dispositivos</TabsTrigger>
          <TabsTrigger value="connectivity">Conectividad</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoreo</TabsTrigger>
          <TabsTrigger value="settings">Configuración</TabsTrigger>
        </TabsList>

        <TabsContent value="devices">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {connectedDevices.map((device) => (
              <Card key={device.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5" />
                      {device.name}
                    </div>
                    <Badge variant={device.isConnected ? "default" : "secondary"}>
                      {device.isConnected ? 'Conectado' : 'Desconectado'}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Modelo</div>
                      <div className="font-medium">{device.model}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Versión</div>
                      <div className="font-medium">{device.version}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Batería</div>
                      <div className="flex items-center gap-2">
                        <Battery className="h-4 w-4" />
                        <span className="font-medium">{device.batteryLevel}%</span>
                      </div>
                      <Progress value={device.batteryLevel} className="h-2 mt-1" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Ubicación</div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span className="font-medium">{device.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Configurar
                    </Button>
                    <Button variant="outline" size="sm">
                      Calibrar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4 mr-2" />
                      Test
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="connectivity">
          <div className="space-y-6">
            {/* Connection Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wifi className="h-5 w-5" />
                  Estado de Conectividad
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Wifi className="h-4 w-4" />
                        <span className="font-medium">WiFi</span>
                      </div>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="text-sm text-gray-600">Red principal activa</div>
                    <div className="text-xs text-gray-500 mt-1">Señal: 95%</div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Bluetooth className="h-4 w-4" />
                        <span className="font-medium">Bluetooth</span>
                      </div>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="text-sm text-gray-600">8 dispositivos pareados</div>
                    <div className="text-xs text-gray-500 mt-1">BLE activo</div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Signal className="h-4 w-4" />
                        <span className="font-medium">Celular</span>
                      </div>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="text-sm text-gray-600">5G disponible</div>
                    <div className="text-xs text-gray-500 mt-1">Backup activo</div>
                  </div>
                </div>

                {/* Security Settings */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Configuración de Seguridad</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Volume2 className="h-4 w-4" />
                        <span>Encriptación de audio habilitada</span>
                      </div>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        <span>Monitoreo de privacidad activo</span>
                      </div>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        <span>Autenticación biométrica</span>
                      </div>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monitoring">
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
        </TabsContent>

        <TabsContent value="settings">
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
                            {device.lastHeartbeat && new Date(device.lastHeartbeat).toLocaleTimeString('es-MX', { 
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
                        (device.batteryLevel || 0) < 20 ? 'bg-red-100' : 
                        (device.batteryLevel || 0) < 50 ? 'bg-yellow-100' : 'bg-green-100'
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
