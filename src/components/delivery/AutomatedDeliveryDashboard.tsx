
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  Drone, 
  Truck, 
  MapPin, 
  Clock, 
  Battery, 
  Thermometer,
  AlertTriangle,
  CheckCircle,
  Package,
  Navigation,
  Zap,
  Shield,
  Cloud,
  Radio,
  TrendingUp,
  Settings
} from 'lucide-react';
import { 
  useDroneFleets, 
  useEmergencyDeliveries, 
  useSmartLockers, 
  useSupplyChainHubs,
  useOptimizeFleetRoutes,
  useScheduleDelivery,
  useRequestEmergencyAirspace
} from '@/hooks/useDeliveryAutomation';

export default function AutomatedDeliveryDashboard() {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedFleet, setSelectedFleet] = useState<string | null>(null);

  const { data: fleets, isLoading: fleetsLoading } = useDroneFleets();
  const { data: emergencyDeliveries } = useEmergencyDeliveries();
  const { data: smartLockers } = useSmartLockers();
  const { data: supplyHubs } = useSupplyChainHubs();

  const optimizeRoutes = useOptimizeFleetRoutes();
  const scheduleDelivery = useScheduleDelivery();
  const requestEmergencyAirspace = useRequestEmergencyAirspace();

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      available: 'bg-blue-100 text-blue-800',
      in_flight: 'bg-purple-100 text-purple-800',
      in_transit: 'bg-orange-100 text-orange-800',
      maintenance: 'bg-yellow-100 text-yellow-800',
      emergency: 'bg-red-100 text-red-800',
      charging: 'bg-cyan-100 text-cyan-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      routine: 'bg-gray-100 text-gray-800',
      urgent: 'bg-yellow-100 text-yellow-800',
      emergency: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800',
      life_threatening: 'bg-red-200 text-red-900'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (fleetsLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2">Cargando datos de flota...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sistema de Delivery Automatizado</h1>
          <p className="text-gray-600">
            Gestión de drones, vehículos autónomos y red de distribución médica
          </p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline"
            onClick={() => optimizeRoutes.mutate(selectedFleet || 'fleet-001')}
            disabled={optimizeRoutes.isPending}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Optimizar Rutas
          </Button>
          <Button
            onClick={() => requestEmergencyAirspace.mutate({ 
              reason: 'Medical Emergency',
              duration: 30,
              area: 'downtown'
            })}
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            Emergencia
          </Button>
        </div>
      </div>

      {/* Emergency Alerts */}
      {emergencyDeliveries && emergencyDeliveries.length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription>
            <strong>{emergencyDeliveries.length} delivery(s) de emergencia activos</strong>
            <div className="mt-2 space-y-1">
              {emergencyDeliveries.slice(0, 2).map((emergency, index) => (
                <div key={index} className="text-sm">
                  • {emergency.cargo.type} para {emergency.patient.name} - ETA: {emergency.route.estimatedTime} min
                </div>
              ))}
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Fleet Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Drones Activos</p>
                <p className="text-2xl font-bold text-blue-600">
                  {fleets?.reduce((acc, fleet) => acc + fleet.drones.filter(d => d.status === 'available' || d.status === 'in_flight').length, 0) || 0}
                </p>
              </div>
              <Drone className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Deliveries Hoy</p>
                <p className="text-2xl font-bold text-green-600">
                  {fleets?.reduce((acc, fleet) => acc + fleet.currentDeliveries, 0) || 0}
                </p>
              </div>
              <Package className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Eficiencia Flota</p>
                <p className="text-2xl font-bold text-purple-600">94%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tiempo Promedio</p>
                <p className="text-2xl font-bold text-orange-600">23min</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="drones">Flota Drones</TabsTrigger>
          <TabsTrigger value="vehicles">Vehículos</TabsTrigger>
          <TabsTrigger value="lockers">Smart Lockers</TabsTrigger>
          <TabsTrigger value="supply">Supply Chain</TabsTrigger>
          <TabsTrigger value="emergency">Emergencias</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Fleet Status */}
          {fleets?.map((fleet) => (
            <Card key={fleet.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Drone className="h-5 w-5" />
                    {fleet.fleetName}
                  </CardTitle>
                  <Badge className={getStatusColor(fleet.status)}>
                    {fleet.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Drones Operativos</p>
                    <p className="text-lg font-semibold">
                      {fleet.drones.filter(d => d.status !== 'maintenance').length}/{fleet.drones.length}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Radio Operacional</p>
                    <p className="text-lg font-semibold">{fleet.operationalRadius} km</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Deliveries Actuales</p>
                    <p className="text-lg font-semibold">
                      {fleet.currentDeliveries}/{fleet.maxDailyDeliveries}
                    </p>
                    <Progress value={(fleet.currentDeliveries / fleet.maxDailyDeliveries) * 100} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Condiciones Meteorológicas</p>
                    <div className="flex items-center space-x-2">
                      {fleet.weatherConditions.flightConditions.suitable ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                      )}
                      <span className="text-sm">
                        {fleet.weatherConditions.flightConditions.suitable ? 'Óptimas' : 'Restringidas'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedFleet(fleet.id)}
                  >
                    Ver Detalles de Flota
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Weather and Flight Conditions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5" />
                Condiciones de Vuelo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Temperatura</p>
                  <div className="flex items-center space-x-2">
                    <Thermometer className="h-4 w-4" />
                    <span className="font-semibold">
                      {fleets?.[0]?.weatherConditions.current.temperature}°C
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Viento</p>
                  <div className="flex items-center space-x-2">
                    <Navigation className="h-4 w-4" />
                    <span className="font-semibold">
                      {fleets?.[0]?.weatherConditions.current.windSpeed} km/h
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Visibilidad</p>
                  <span className="font-semibold">
                    {fleets?.[0]?.weatherConditions.current.visibility} km
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drones" className="space-y-6">
          {fleets?.map((fleet) => (
            <div key={fleet.id} className="space-y-4">
              <h3 className="text-lg font-semibold">{fleet.fleetName}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {fleet.drones.map((drone) => (
                  <Card key={drone.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{drone.model}</h4>
                        <Badge className={getStatusColor(drone.status)}>
                          {drone.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{drone.serialNumber}</p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Battery className="h-4 w-4" />
                          <span className="text-sm">Batería</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">{drone.batteryLevel}%</span>
                          <Progress value={drone.batteryLevel} className="w-16" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Thermometer className="h-4 w-4" />
                          <span className="text-sm">Temp. Carga</span>
                        </div>
                        <span className="text-sm font-medium">
                          {drone.cargo.currentTemperature}°C
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Package className="h-4 w-4" />
                          <span className="text-sm">Carga Max</span>
                        </div>
                        <span className="text-sm font-medium">{drone.maxPayload} kg</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">Alcance</span>
                        </div>
                        <span className="text-sm font-medium">{drone.maxRange} km</span>
                      </div>

                      <div className="pt-2 flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          Rastrear
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Settings className="h-3 w-3 mr-1" />
                          Config
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="vehicles" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Vehículos Autónomos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Truck className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">Flota de vehículos autónomos en desarrollo</p>
                <p className="text-sm text-gray-500 mt-2">
                  Próximamente: Robots de delivery urbano y vehículos autónomos
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lockers" className="space-y-6">
          {smartLockers?.map((locker) => (
            <Card key={locker.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Smart Locker - {locker.location.facilityType}
                </CardTitle>
                <p className="text-sm text-gray-600">{locker.location.address}</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-600">Estado</p>
                    <Badge className={getStatusColor(locker.status)}>
                      {locker.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Conectividad</p>
                    <div className="flex items-center space-x-2">
                      <Radio className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{locker.connectivity}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Fuente de Energía</p>
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm">{locker.powerSource}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Compartimentos</h4>
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                    {locker.lockers.map((compartment, index) => (
                      <div
                        key={compartment.id}
                        className={`p-2 border rounded text-center text-xs ${
                          compartment.isOccupied 
                            ? 'bg-red-100 border-red-300' 
                            : 'bg-green-100 border-green-300'
                        }`}
                      >
                        <div className="font-medium">#{index + 1}</div>
                        <div className="text-xs text-gray-600">{compartment.size}</div>
                        {compartment.currentTemperature && (
                          <div className="text-xs text-blue-600">
                            {compartment.currentTemperature}°C
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Utilización Diaria</p>
                    <p className="font-semibold">{locker.utilizationStats.daily}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Horas Pico</p>
                    <p className="font-semibold">{locker.utilizationStats.peak_hours.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Seguridad</p>
                    <div className="flex items-center space-x-1">
                      <Shield className="h-3 w-3 text-green-600" />
                      <span className="text-xs">
                        {locker.securityFeatures.cameras} cámaras, biométrico
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="supply" className="space-y-6">
          {supplyHubs?.map((hub) => (
            <Card key={hub.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  {hub.name}
                </CardTitle>
                <p className="text-sm text-gray-600">{hub.location.address}</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-600">Tipo</p>
                    <p className="font-semibold capitalize">{hub.type.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Capacidad</p>
                    <p className="font-semibold">{hub.capacity.volume.toLocaleString()} m³</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Automatización</p>
                    <p className="font-semibold">{hub.capacity.automationLevel}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Uptime</p>
                    <p className="font-semibold text-green-600">{hub.performanceMetrics.uptime}%</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Drones</p>
                    <p className="font-semibold">{hub.equipment.drones}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Vehículos</p>
                    <p className="font-semibold">{hub.equipment.vehicles}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Robots</p>
                    <p className="font-semibold">{hub.equipment.robots}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Cargadores</p>
                    <p className="font-semibold">{hub.equipment.chargers}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Personal</p>
                    <p className="font-semibold">{hub.staff.total}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <h4 className="font-medium">Métricas de Rendimiento</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Throughput</p>
                      <p className="font-semibold">{hub.performanceMetrics.throughput}/día</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Precisión</p>
                      <p className="font-semibold">{hub.performanceMetrics.accuracy}%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Satisfacción</p>
                      <p className="font-semibold">★ {hub.performanceMetrics.customerSatisfaction}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Certificaciones</p>
                      <p className="font-semibold">{hub.certifications.length}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="emergency" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Deliveries de Emergencia Activos
              </CardTitle>
            </CardHeader>
            <CardContent>
              {emergencyDeliveries && emergencyDeliveries.length > 0 ? (
                <div className="space-y-4">
                  {emergencyDeliveries.map((emergency) => (
                    <div key={emergency.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Badge className={getPriorityColor(emergency.priority)}>
                            {emergency.priority}
                          </Badge>
                          <span className="font-medium">{emergency.cargo.type}</span>
                        </div>
                        <Badge className={getStatusColor(emergency.status)}>
                          {emergency.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Paciente</p>
                          <p className="font-medium">{emergency.patient.name}</p>
                          <p className="text-xs text-gray-500">{emergency.patient.condition}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Tiempo Máximo</p>
                          <p className="font-medium text-red-600">
                            {emergency.cargo.timeConstraints.maxDeliveryTime} min
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">ETA</p>
                          <p className="font-medium">{emergency.route.estimatedTime} min</p>
                        </div>
                      </div>

                      <div className="mt-3 flex space-x-2">
                        <Button variant="outline" size="sm">
                          <MapPin className="h-3 w-3 mr-1" />
                          Rastrear
                        </Button>
                        <Button variant="outline" size="sm">
                          <Radio className="h-3 w-3 mr-1" />
                          Comunicar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 mx-auto text-green-600 mb-4" />
                  <p className="text-gray-600">No hay deliveries de emergencia activos</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Protocolos de Emergencia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded">
                  <span>Autorización de Espacio Aéreo de Emergencia</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => requestEmergencyAirspace.mutate({
                      reason: 'Medical Emergency',
                      duration: 30
                    })}
                    disabled={requestEmergencyAirspace.isPending}
                  >
                    Solicitar
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <span>Coordinación con Servicios de Emergencia</span>
                  <Button variant="outline" size="sm">
                    Activar
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded">
                  <span>Notificación a Hospitales de Red</span>
                  <Button variant="outline" size="sm">
                    Enviar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
