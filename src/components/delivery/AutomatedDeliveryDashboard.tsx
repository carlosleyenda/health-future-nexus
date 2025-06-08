
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Zap, 
  Truck, 
  Package, 
  AlertTriangle, 
  CheckCircle,
  MapPin,
  Thermometer,
  Wind,
  Eye,
  Shield,
  Clock,
  Battery
} from 'lucide-react';
import { 
  useDroneFleets, 
  useWeatherConditions, 
  useSmartLockers 
} from '@/hooks/useDeliveryAutomation';
import { useAuthStore } from '@/store/auth';

export default function AutomatedDeliveryDashboard() {
  const { user } = useAuthStore();
  const [selectedTab, setSelectedTab] = useState('drones');

  const { 
    data: droneFleets,
    isLoading: dronesLoading 
  } = useDroneFleets();
  
  const { 
    data: weatherData,
    isLoading: weatherLoading 
  } = useWeatherConditions(40.7128, -74.0060); // NYC coordinates as default
  
  const { 
    data: smartLockers,
    isLoading: lockersLoading 
  } = useSmartLockers();

  // Mock flight conditions data
  const flightConditions = {
    suitable: true,
    riskLevel: 'low'
  };

  if (dronesLoading || weatherLoading) {
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

  const getFlightConditionsColor = (conditions: any) => {
    if (!conditions) return 'yellow';
    if (conditions.riskLevel === 'low') return 'green';
    if (conditions.riskLevel === 'medium') return 'yellow';
    return 'red';
  };

  const getFlightConditionsText = (conditions: any) => {
    if (!conditions) return 'Evaluando';
    return conditions.suitable ? 'Óptimas' : 'Restringidas';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Sistema de Delivery Médico Automatizado</h2>
          <p className="text-gray-600">
            Gestión de drones, robots y red de distribución inteligente
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Zap className="h-4 w-4 mr-2" />
            Delivery Emergencia
          </Button>
          <Button variant="outline" size="sm">
            <Package className="h-4 w-4 mr-2" />
            Nuevo Envío
          </Button>
        </div>
      </div>

      {/* Weather and Flight Conditions Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Temperatura</p>
                <p className="text-2xl font-bold">
                  {weatherData?.current?.temp || '--'}°C
                </p>
              </div>
              <Thermometer className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Viento</p>
                <p className="text-2xl font-bold">
                  {weatherData?.current?.windSpeed || '--'} km/h
                </p>
              </div>
              <Wind className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Visibilidad</p>
                <p className="text-2xl font-bold">
                  {weatherData?.current?.visibility || '--'} km
                </p>
              </div>
              <Eye className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Condiciones de Vuelo</p>
                <Badge 
                  variant={getFlightConditionsColor(flightConditions) === 'green' ? 'default' : 'destructive'}
                >
                  {getFlightConditionsText(flightConditions)}
                </Badge>
              </div>
              {getFlightConditionsColor(flightConditions) === 'green' ? 
                <CheckCircle className="h-8 w-8 text-green-500" /> :
                <AlertTriangle className="h-8 w-8 text-red-500" />
              }
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="drones">Flota de Drones</TabsTrigger>
          <TabsTrigger value="robots">Robots de Delivery</TabsTrigger>
          <TabsTrigger value="lockers">Smart Lockers</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="drones" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {droneFleets?.map((fleet) => (
              <Card key={fleet.id} className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{fleet.fleetName}</CardTitle>
                      <Badge variant={
                        fleet.status === 'active' ? 'default' : 'secondary'
                      }>
                        {fleet.status}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">
                        {fleet.drones?.filter(d => d.status === 'active').length || 0}/{fleet.drones?.length || 0}
                      </p>
                      <p className="text-sm text-gray-500">Activos</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Ubicación:</p>
                        <p className="font-medium">{fleet.homeBase?.address}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Radio Operacional:</p>
                        <p className="font-medium">{fleet.operationalRadius} km</p>
                      </div>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ 
                          width: `${((fleet.drones?.filter(d => d.status === 'active').length || 0) / (fleet.drones?.length || 1)) * 100}%` 
                        }}
                      ></div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        <MapPin className="h-4 w-4 mr-2" />
                        Ver en Mapa
                      </Button>
                      <Button size="sm" variant="outline">
                        Gestionar Flota
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="robots" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Red de Robots de Delivery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Truck className="h-5 w-5 mr-2" />
                      Robots Urbanos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Activos</span>
                        <span className="font-medium">12/15</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">En ruta</span>
                        <span className="font-medium">8</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Cargando</span>
                        <span className="font-medium">4</span>
                      </div>
                      <Button size="sm" className="w-full">
                        Ver Detalles
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Battery className="h-5 w-5 mr-2" />
                      Estado de Batería
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Promedio</span>
                        <span className="font-medium">78%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Crítico (&lt;20%)</span>
                        <span className="font-medium text-red-600">2</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Cargando</span>
                        <span className="font-medium">3</span>
                      </div>
                      <Button size="sm" className="w-full" variant="outline">
                        Programar Carga
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Shield className="h-5 w-5 mr-2" />
                      Seguridad
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Entregas seguras</span>
                        <span className="font-medium">99.8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Incidentes</span>
                        <span className="font-medium">0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Mantenimiento</span>
                        <span className="font-medium">Al día</span>
                      </div>
                      <Button size="sm" className="w-full" variant="outline">
                        Reporte Seguridad
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lockers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {smartLockers?.map((locker) => (
              <Card key={locker.id} className="border-l-4 border-l-green-500">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{locker.name}</CardTitle>
                      <p className="text-sm text-gray-600">{locker.location.address}</p>
                    </div>
                    <Badge variant={locker.status === 'operational' ? 'default' : 'secondary'}>
                      {locker.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Compartimentos:</p>
                        <p className="font-medium">
                          {locker.compartments?.filter(c => c.status === 'available').length || 0}/{locker.compartments?.length || 0} disponibles
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Control Temperatura:</p>
                        <p className="font-medium">
                          {locker.temperatureControl ? '✓ Sí' : '✗ No'}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Nivel Seguridad:</p>
                        <p className="font-medium capitalize">{locker.security?.level || 'Estándar'}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Utilización:</p>
                        <p className="font-medium">
                          {Math.round(((locker.compartments?.length || 0) - (locker.compartments?.filter(c => c.status === 'available').length || 0)) / (locker.compartments?.length || 1) * 100)}%
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        <MapPin className="h-4 w-4 mr-2" />
                        Ver Ubicación
                      </Button>
                      <Button size="sm" variant="outline">
                        Gestionar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Entregas Hoy</p>
                    <p className="text-2xl font-bold">147</p>
                  </div>
                  <Package className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Tiempo Promedio</p>
                    <p className="text-2xl font-bold">23 min</p>
                  </div>
                  <Clock className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Tasa Éxito</p>
                    <p className="text-2xl font-bold">99.2%</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Ahorro Costos</p>
                    <p className="text-2xl font-bold">34%</p>
                  </div>
                  <Zap className="h-8 w-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
