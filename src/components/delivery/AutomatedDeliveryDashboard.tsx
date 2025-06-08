
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plane, 
  Truck, 
  MapPin, 
  TrendingUp, 
  Shield, 
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  Thermometer
} from 'lucide-react';
import { 
  useDroneFleets, 
  useAutonomousVehicles,
  useSmartLockers,
  useWeatherConditions
} from '@/hooks/useDeliveryAutomation';

export default function AutomatedDeliveryDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const { data: droneFleets, isLoading: fleetsLoading } = useDroneFleets();
  const { data: vehicles } = useAutonomousVehicles('downtown');
  const { data: smartLockers } = useSmartLockers();
  const { data: weather } = useWeatherConditions(40.7128, -74.0060); // NYC coordinates

  if (fleetsLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2">Cargando sistema de delivery automatizado...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Sistema de Delivery Médico Automatizado</h2>
          <p className="text-gray-600">Gestión de drones, vehículos autónomos y redes de distribución</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <MapPin className="h-4 w-4 mr-2" />
            Mapa en Tiempo Real
          </Button>
          <Button variant="outline" size="sm">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Centro de Emergencias
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Drones Activos</p>
                <p className="text-2xl font-bold text-blue-600">
                  {droneFleets?.reduce((acc, fleet) => acc + fleet.activeDrones, 0) || 0}
                </p>
              </div>
              <Plane className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Vehículos Autónomos</p>
                <p className="text-2xl font-bold text-green-600">
                  {vehicles?.filter(v => v.status === 'available').length || 0}
                </p>
              </div>
              <Truck className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Smart Lockers</p>
                <p className="text-2xl font-bold text-purple-600">
                  {smartLockers?.filter(l => l.status === 'operational').length || 0}
                </p>
              </div>
              <MapPin className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Entregas Hoy</p>
                <p className="text-2xl font-bold text-orange-600">247</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="drones">Drones</TabsTrigger>
          <TabsTrigger value="vehicles">Vehículos</TabsTrigger>
          <TabsTrigger value="lockers">Smart Lockers</TabsTrigger>
          <TabsTrigger value="emergency">Emergencias</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Weather Conditions */}
          {weather && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Thermometer className="h-5 w-5 mr-2" />
                  Condiciones Meteorológicas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Temperatura:</span>
                    <span className="font-medium">{weather.temperature}°C</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Viento:</span>
                    <span className="font-medium">{weather.windSpeed} km/h</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Visibilidad:</span>
                    <span className="font-medium">{weather.visibility} km</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Estado Vuelo:</span>
                    <Badge variant={weather.flightConditions === 'safe' ? 'default' : 'destructive'}>
                      {weather.flightConditions === 'safe' ? 'Seguro' : 'Restringido'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Active Deliveries */}
          <Card>
            <CardHeader>
              <CardTitle>Entregas en Tiempo Real</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((delivery) => (
                  <div key={delivery} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <Plane className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">DR-{delivery.toString().padStart(3, '0')}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Medicamento de Emergencia</p>
                        <p className="text-xs text-gray-600">Hospital Central → Clínica Norte</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <p className="text-sm font-medium">ETA: 12 min</p>
                        <Progress value={65} className="w-20" />
                      </div>
                      <Badge variant="outline">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        En Ruta
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drones" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Flotas de Drones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {droneFleets?.map((fleet) => (
                  <div key={fleet.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{fleet.name}</h4>
                      <Badge variant={fleet.status === 'operational' ? 'default' : 'destructive'}>
                        {fleet.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Drones Activos</p>
                        <p className="font-medium">{fleet.activeDrones}/{fleet.totalDrones}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Ubicación</p>
                        <p className="font-medium">{fleet.location}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Rango de Operación</p>
                        <p className="font-medium">{fleet.operatingRadius} km</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Carga Actual</p>
                        <Progress value={(fleet.activeDrones / fleet.totalDrones) * 100} className="w-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vehicles" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vehículos Autónomos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vehicles?.map((vehicle) => (
                  <div key={vehicle.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{vehicle.vehicleId}</h4>
                      <Badge variant={vehicle.status === 'available' ? 'default' : 'secondary'}>
                        {vehicle.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Tipo</p>
                        <p className="font-medium">{vehicle.vehicleType}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Capacidad</p>
                        <p className="font-medium">{vehicle.maxCapacity} kg</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Ubicación</p>
                        <p className="font-medium">{vehicle.currentLocation}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Batería</p>
                        <Progress value={vehicle.batteryLevel} className="w-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lockers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Red de Smart Lockers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {smartLockers?.map((locker) => (
                  <div key={locker.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{locker.location}</h4>
                      <Badge variant={locker.status === 'operational' ? 'default' : 'destructive'}>
                        {locker.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Compartimentos</p>
                        <p className="font-medium">{locker.availableCompartments}/{locker.totalCompartments}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Temperatura</p>
                        <p className="font-medium">{locker.temperatureControlled ? 'Controlada' : 'Ambiente'}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Seguridad</p>
                        <p className="font-medium">{locker.securityLevel}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Ocupación</p>
                        <Progress 
                          value={((locker.totalCompartments - locker.availableCompartments) / locker.totalCompartments) * 100} 
                          className="w-full" 
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emergency" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                Sistema de Emergencias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-red-800">Protocolo de Emergencia Activo</h4>
                      <p className="text-sm text-red-600">Entrega crítica de sangre tipo O- solicitada</p>
                    </div>
                    <Badge variant="destructive">CRÍTICO</Badge>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Button size="sm" variant="destructive">
                      Activar Drone de Emergencia
                    </Button>
                    <Button size="sm" variant="outline">
                      Contactar Equipo Médico
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recursos de Emergencia</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span>Drones de Emergencia</span>
                        <Badge>5 Disponibles</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Vehículos Prioritarios</span>
                        <Badge>3 Disponibles</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Rutas Aéreas Despejadas</span>
                        <Badge variant="destructive">2 Activas</Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Tiempos de Respuesta</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span>Promedio Urbano</span>
                        <span className="font-medium">8 min</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Promedio Rural</span>
                        <span className="font-medium">15 min</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Récord de Emergencia</span>
                        <span className="font-medium">4 min</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
