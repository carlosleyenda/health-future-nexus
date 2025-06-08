
import React, { useState } from 'react';
import { Smartphone, Watch, Activity, Wifi, WifiOff, Settings, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useConnectedDevices, useDeviceData, useConnectDevice, useDisconnectDevice, useRealtimeDeviceData } from '@/hooks/useDevices';

interface DeviceConnectionProps {
  patientId: string;
}

export default function DeviceConnection({ patientId }: DeviceConnectionProps) {
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const { data: connectedDevices } = useConnectedDevices(patientId);
  const { data: realtimeData } = useRealtimeDeviceData(patientId);
  const { data: deviceData } = useDeviceData(selectedDevice || '', '24h');
  const connectDevice = useConnectDevice();
  const disconnectDevice = useDisconnectDevice();

  const deviceTypes = [
    {
      type: 'fitness_tracker',
      name: 'Fitness Tracker',
      icon: Watch,
      description: 'Monitor de actividad física y ritmo cardíaco',
      compatible: ['Fitbit', 'Garmin', 'Apple Watch', 'Samsung Galaxy Watch']
    },
    {
      type: 'blood_pressure_monitor',
      name: 'Monitor de Presión',
      icon: Activity,
      description: 'Medición automática de presión arterial',
      compatible: ['Omron', 'Beurer', 'A&D Medical']
    },
    {
      type: 'glucose_meter',
      name: 'Glucómetro',
      icon: Smartphone,
      description: 'Monitor continuo de glucosa',
      compatible: ['FreeStyle Libre', 'Dexcom', 'Medtronic']
    },
    {
      type: 'scale',
      name: 'Báscula Inteligente',
      icon: Settings,
      description: 'Peso corporal y composición',
      compatible: ['Withings', 'Xiaomi Mi', 'Eufy']
    }
  ];

  const handleConnectDevice = async (deviceType: string) => {
    try {
      await connectDevice.mutateAsync({
        patientId,
        deviceType,
        deviceName: `${deviceType} Device`,
        serialNumber: `SN${Date.now()}`,
        manufacturer: 'Generic'
      });
    } catch (error) {
      console.error('Error connecting device:', error);
    }
  };

  const handleDisconnectDevice = async (deviceId: string) => {
    try {
      await disconnectDevice.mutateAsync(deviceId);
    } catch (error) {
      console.error('Error disconnecting device:', error);
    }
  };

  const getDeviceIcon = (type: string) => {
    const deviceType = deviceTypes.find(dt => dt.type === type);
    return deviceType?.icon || Smartphone;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Dispositivos Médicos</h2>
          <p className="text-gray-600">Conecta y monitorea tus dispositivos de salud</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Conectar Dispositivo
        </Button>
      </div>

      <Tabs defaultValue="connected" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="connected">Conectados</TabsTrigger>
          <TabsTrigger value="available">Disponibles</TabsTrigger>
          <TabsTrigger value="data">Datos en Tiempo Real</TabsTrigger>
        </TabsList>

        {/* Connected Devices */}
        <TabsContent value="connected" className="space-y-4">
          {connectedDevices?.length ? (
            connectedDevices.map((device) => {
              const DeviceIcon = getDeviceIcon(device.type);
              return (
                <Card key={device.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          device.isActive ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          <DeviceIcon className={`h-6 w-6 ${
                            device.isActive ? 'text-green-600' : 'text-gray-400'
                          }`} />
                        </div>
                        <div>
                          <h3 className="font-semibold">{device.name}</h3>
                          <p className="text-sm text-gray-600">{device.manufacturer}</p>
                          <p className="text-xs text-gray-500">
                            Última sincronización: {device.lastSync ? 
                              new Date(device.lastSync).toLocaleString('es-MX') : 
                              'Nunca'
                            }
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          {device.isActive ? (
                            <Wifi className="h-4 w-4 text-green-600" />
                          ) : (
                            <WifiOff className="h-4 w-4 text-gray-400" />
                          )}
                          <Switch 
                            checked={device.isActive}
                            onCheckedChange={(checked) => {
                              if (!checked) {
                                handleDisconnectDevice(device.id);
                              }
                            }}
                          />
                        </div>
                        
                        <div className="text-right">
                          <Badge variant={device.isActive ? "default" : "secondary"}>
                            {device.isActive ? 'Activo' : 'Inactivo'}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">
                            Batería: {device.batteryLevel}%
                          </p>
                        </div>
                      </div>
                    </div>

                    {device.isActive && device.id === selectedDevice && deviceData && (
                      <div className="mt-6 pt-4 border-t">
                        <h4 className="font-medium mb-3">Datos Recientes (24h)</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {deviceData.map((data, index) => (
                            <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                              <p className="text-2xl font-bold text-blue-600">{data.value}</p>
                              <p className="text-sm text-gray-600">{data.metric}</p>
                              <p className="text-xs text-gray-500">
                                {new Date(data.timestamp).toLocaleTimeString('es-MX')}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-4 flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedDevice(
                          selectedDevice === device.id ? null : device.id
                        )}
                      >
                        {selectedDevice === device.id ? 'Ocultar Datos' : 'Ver Datos'}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-1" />
                        Configurar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <Smartphone className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Sin dispositivos conectados</h3>
                <p className="text-gray-500 mb-4">
                  Conecta tus dispositivos médicos para monitoreo automático
                </p>
                <Button>Conectar Primer Dispositivo</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Available Devices */}
        <TabsContent value="available" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {deviceTypes.map((deviceType) => {
              const Icon = deviceType.icon;
              return (
                <Card key={deviceType.type} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Icon className="h-5 w-5 mr-2 text-blue-600" />
                      {deviceType.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{deviceType.description}</p>
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Dispositivos compatibles:</h4>
                      <div className="flex flex-wrap gap-2">
                        {deviceType.compatible.map((brand) => (
                          <Badge key={brand} variant="outline">{brand}</Badge>
                        ))}
                      </div>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => handleConnectDevice(deviceType.type)}
                    >
                      Conectar {deviceType.name}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Real-time Data */}
        <TabsContent value="data" className="space-y-4">
          {realtimeData?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {realtimeData.map((data) => (
                <Card key={data.deviceId}>
                  <CardHeader>
                    <CardTitle className="text-lg">{data.deviceName}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <p className="text-3xl font-bold text-blue-600">{data.currentValue}</p>
                        <p className="text-gray-600">{data.metric} {data.unit}</p>
                        <p className="text-sm text-gray-500">
                          Actualizado: {new Date(data.timestamp).toLocaleTimeString('es-MX')}
                        </p>
                      </div>
                      
                      {data.trend && (
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Tendencia</span>
                            <span className={
                              data.trend === 'up' ? 'text-green-600' :
                              data.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                            }>
                              {data.trend === 'up' ? '↗️' : data.trend === 'down' ? '↘️' : '➡️'}
                            </span>
                          </div>
                          <Progress value={data.normalRange || 75} className="h-2" />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <Activity className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Sin datos en tiempo real</h3>
                <p className="text-gray-500">
                  Conecta dispositivos para ver datos en tiempo real
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
