
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { 
  Activity, 
  Heart, 
  Wifi,
  WifiOff,
  Smartphone,
  AlertTriangle,
  TrendingUp,
  Settings,
  Plus,
  Camera,
  Thermometer
} from 'lucide-react';
import { useConnectedDevices, useRealtimeDeviceData } from '@/hooks/useDevices';

interface IoTDeviceEcosystemProps {
  patientId: string;
}

export default function IoTDeviceEcosystem({ patientId }: IoTDeviceEcosystemProps) {
  const { data: connectedDevices, isLoading } = useConnectedDevices(patientId);
  const { data: realtimeData } = useRealtimeDeviceData(patientId);
  
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [analyticsTimeRange, setAnalyticsTimeRange] = useState('24h');

  // Mock data for comprehensive IoT ecosystem
  const [deviceCategories] = useState([
    { category: 'Wearables', count: 8, active: 7, color: '#3b82f6' },
    { category: 'Monitoring', count: 12, active: 11, color: '#10b981' },
    { category: 'Diagnostic', count: 6, active: 5, color: '#f59e0b' },
    { category: 'Therapeutic', count: 4, active: 4, color: '#8b5cf6' },
    { category: 'Environmental', count: 9, active: 8, color: '#06b6d4' },
    { category: 'Emergency', count: 3, active: 3, color: '#ef4444' }
  ]);

  const [healthMetrics] = useState([
    { time: '00:00', heartRate: 68, bloodPressure: 118, glucose: 95, oxygenSat: 98, temp: 36.5 },
    { time: '04:00', heartRate: 62, bloodPressure: 115, glucose: 92, oxygenSat: 97, temp: 36.3 },
    { time: '08:00', heartRate: 72, bloodPressure: 122, glucose: 105, oxygenSat: 98, temp: 36.7 },
    { time: '12:00', heartRate: 78, bloodPressure: 125, glucose: 135, oxygenSat: 97, temp: 36.8 },
    { time: '16:00', heartRate: 75, bloodPressure: 120, glucose: 110, oxygenSat: 98, temp: 36.6 },
    { time: '20:00', heartRate: 70, bloodPressure: 118, glucose: 98, oxygenSat: 98, temp: 36.4 }
  ]);

  const [predictiveAlerts] = useState([
    {
      id: '1',
      type: 'prediction',
      severity: 'medium',
      title: 'Posible Episodio de Hipertensión',
      message: 'El análisis predictivo indica 75% probabilidad de episodio hipertensivo en las próximas 6 horas',
      confidence: 75,
      timeframe: '6 horas',
      recommendations: ['Reducir consumo de sodio', 'Evitar ejercicio intenso', 'Tomar medicación']
    },
    {
      id: '2',
      type: 'anomaly',
      severity: 'low',
      title: 'Patrón de Sueño Irregular',
      message: 'Detectada variabilidad inusual en calidad de sueño REM durante 3 noches',
      confidence: 68,
      timeframe: '3 días',
      recommendations: ['Mantener horario regular', 'Evitar cafeína tarde', 'Revisar ambiente de sueño']
    }
  ]);

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'smartwatch':
      case 'fitness_tracker': return <Heart className="h-5 w-5" />;
      case 'blood_pressure_monitor': return <Activity className="h-5 w-5" />;
      case 'thermometer': return <Thermometer className="h-5 w-5" />;
      case 'camera': return <Camera className="h-5 w-5" />;
      default: return <Smartphone className="h-5 w-5" />;
    }
  };

  const getConnectivityIcon = (isOnline: boolean) => {
    return isOnline ? <Wifi className="h-4 w-4 text-green-500" /> : <WifiOff className="h-4 w-4 text-red-500" />;
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Cargando ecosistema IoT...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Ecosystem Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dispositivos Conectados</CardTitle>
            <Smartphone className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">38 activos, 4 offline</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conectividad Promedio</CardTitle>
            <Wifi className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">Excelente estabilidad</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Datos Procesados</CardTitle>
            <Activity className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3M</div>
            <p className="text-xs text-muted-foreground">puntos de datos/día</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas Activas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">2 críticas, 5 preventivas</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visión General</TabsTrigger>
          <TabsTrigger value="devices">Dispositivos</TabsTrigger>
          <TabsTrigger value="analytics">Analytics Avanzado</TabsTrigger>
          <TabsTrigger value="predictions">Predicciones IA</TabsTrigger>
          <TabsTrigger value="clinical">Integración Clínica</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Device Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Categorías de Dispositivos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {deviceCategories.map((category) => (
                  <div key={category.category} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{category.category}</h4>
                      <Badge style={{ backgroundColor: category.color, color: 'white' }}>
                        {category.active}/{category.count}
                      </Badge>
                    </div>
                    <Progress 
                      value={(category.active / category.count) * 100} 
                      className="h-2"
                    />
                    <p className="text-sm text-gray-600 mt-1">
                      {category.active} dispositivos activos
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Real-time Health Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Métricas de Salud en Tiempo Real</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={healthMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis yAxisId="left" domain={[60, 140]} />
                  <YAxis yAxisId="right" orientation="right" domain={[35, 37]} />
                  <Tooltip />
                  <Line yAxisId="left" type="monotone" dataKey="heartRate" stroke="#ef4444" name="FC (bpm)" />
                  <Line yAxisId="left" type="monotone" dataKey="bloodPressure" stroke="#3b82f6" name="PA Sistólica" />
                  <Line yAxisId="left" type="monotone" dataKey="glucose" stroke="#10b981" name="Glucosa" />
                  <Line yAxisId="right" type="monotone" dataKey="temp" stroke="#f59e0b" name="Temperatura °C" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-6">
          {/* Connected Devices List */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Dispositivos Conectados</CardTitle>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Agregar Dispositivo
              </Button>
            </CardHeader>
            <CardContent>
              {connectedDevices && connectedDevices.length > 0 ? (
                <div className="space-y-4">
                  {connectedDevices.map((device) => (
                    <div key={device.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            {getDeviceIcon(device.type)}
                          </div>
                          <div>
                            <h4 className="font-semibold">{device.name}</h4>
                            <p className="text-sm text-gray-600">{device.manufacturer}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getConnectivityIcon(device.isActive)}
                          <Badge variant={device.isActive ? "default" : "destructive"}>
                            {device.isActive ? "Conectado" : "Desconectado"}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <div className="text-sm text-gray-500">Batería</div>
                          <div className="font-medium">{device.batteryLevel}%</div>
                          <Progress value={device.batteryLevel} className="h-2 mt-1" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Última sincronización</div>
                          <div className="font-medium">
                            {new Date(device.lastSync).toLocaleTimeString('es-MX')}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Tipo de conexión</div>
                          <div className="font-medium">{device.connectionType}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Smartphone className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No hay dispositivos conectados</h3>
                  <p className="text-gray-600">Conecta tu primer dispositivo IoT para comenzar</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Advanced Analytics Dashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Análisis de Tendencias</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={healthMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="heartRate" fill="#ef4444" name="Frecuencia Cardíaca" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribución de Métricas</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Normales', value: 85, fill: '#10b981' },
                        { name: 'Atención', value: 12, fill: '#f59e0b' },
                        { name: 'Críticas', value: 3, fill: '#ef4444' }
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Real-time Data Stream */}
          <Card>
            <CardHeader>
              <CardTitle>Stream de Datos en Tiempo Real</CardTitle>
            </CardHeader>
            <CardContent>
              {realtimeData && realtimeData.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {realtimeData.map((data, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{data.deviceName}</h4>
                        <Badge variant="outline">{data.trend}</Badge>
                      </div>
                      <div className="text-2xl font-bold text-blue-600">
                        {data.currentValue} {data.unit}
                      </div>
                      <div className="text-sm text-gray-600">
                        {data.metric} • {data.normalRange}% normal
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(data.timestamp).toLocaleTimeString('es-MX')}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Activity className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">No hay datos en tiempo real disponibles</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-6">
          {/* AI Predictions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Predicciones y Alertas Inteligentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictiveAlerts.map((alert) => (
                  <Alert key={alert.id} className="border-l-4 border-l-orange-500">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{alert.title}</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{alert.confidence}% confianza</Badge>
                            <Badge variant="secondary">{alert.timeframe}</Badge>
                          </div>
                        </div>
                        <p className="text-gray-700">{alert.message}</p>
                        <div>
                          <h5 className="font-medium mb-2">Recomendaciones:</h5>
                          <ul className="space-y-1">
                            {alert.recommendations.map((rec, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <span className="text-blue-500">•</span>
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clinical" className="space-y-6">
          {/* Clinical Integration */}
          <Card>
            <CardHeader>
              <CardTitle>Integración con Sistemas Clínicos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Integración EHR</h4>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium">Epic Systems</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      HL7 FHIR • Sincronización cada 15 min
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-medium">Cerner PowerChart</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      API REST • Tiempo real
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Monitoreo Remoto (RPM)</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Códigos de facturación</span>
                      <Badge variant="outline">99453, 99454, 99457</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Tiempo de monitoreo</span>
                      <span className="font-medium">16 días/mes</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Reembolso estimado</span>
                      <span className="font-medium">$247/mes</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Population Health */}
          <Card>
            <CardHeader>
              <CardTitle>Análisis de Salud Poblacional</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium mb-2">Cohorte Similar</h4>
                  <div className="text-2xl font-bold text-blue-600">1,247</div>
                  <div className="text-sm text-gray-600">pacientes con perfil similar</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium mb-2">Outcomes Promedio</h4>
                  <div className="text-2xl font-bold text-green-600">87%</div>
                  <div className="text-sm text-gray-600">mejoría en 6 meses</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium mb-2">Costo-Efectividad</h4>
                  <div className="text-2xl font-bold text-purple-600">$0.23</div>
                  <div className="text-sm text-gray-600">por QALY ganado</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
