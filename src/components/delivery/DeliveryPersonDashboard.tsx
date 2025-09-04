import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Package, 
  MapPin, 
  Star, 
  Clock, 
  TrendingUp, 
  Navigation,
  Phone,
  MessageCircle,
  CheckCircle,
  XCircle,
  Bike,
  Car,
  Truck,
  Plane,
  DollarSign,
  Award,
  Target,
  Calendar,
  Route,
  Battery,
  Fuel,
  AlertTriangle,
  ThumbsUp,
  Trophy,
  Gift,
  Bell,
  Settings,
  BarChart3,
  PieChart,
  Zap
} from 'lucide-react';
import { useDeliveryPerson } from '@/hooks/useDeliveryPerson';
import DeliveryEarnings from './DeliveryEarnings';
import DeliveryRatings from './DeliveryRatings';

interface DeliveryPersonDashboardProps {
  deliveryPersonId: string;
}

export default function DeliveryPersonDashboard({ deliveryPersonId }: DeliveryPersonDashboardProps) {
  const [isOnline, setIsOnline] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const { 
    data: profile, 
    pendingDeliveries, 
    activeDeliveries, 
    completedDeliveries,
    earnings,
    ratings,
    weeklyStats,
    monthlyGoals,
    vehicleStatus,
    recentReviews
  } = useDeliveryPerson(deliveryPersonId);

  const getVehicleIcon = (vehicleType: string) => {
    switch (vehicleType) {
      case 'motorcycle': return <Bike className="h-5 w-5" />;
      case 'bicycle': return <Bike className="h-5 w-5" />;
      case 'car': return <Car className="h-5 w-5" />;
      case 'drone': return <Plane className="h-5 w-5" />;
      default: return <Truck className="h-5 w-5" />;
    }
  };

  const handleAcceptDelivery = (deliveryId: string) => {
    console.log('Accepting delivery:', deliveryId);
  };

  const handleCompleteDelivery = (deliveryId: string) => {
    console.log('Completing delivery:', deliveryId);
  };

  if (!profile) return <div>Cargando...</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={profile.profilePhoto} />
            <AvatarFallback>{profile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <div className="flex items-center gap-2">
              {getVehicleIcon(profile.vehicleType)}
              <span className="text-muted-foreground capitalize">{profile.vehicleType}</span>
              <Badge variant={isOnline ? 'default' : 'secondary'}>
                {isOnline ? 'En línea' : 'Desconectado'}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span>Estado:</span>
          <Switch checked={isOnline} onCheckedChange={setIsOnline} />
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="pending">Pendientes</TabsTrigger>
          <TabsTrigger value="active">En Progreso</TabsTrigger>
          <TabsTrigger value="earnings">Ganancias</TabsTrigger>
          <TabsTrigger value="ratings">Calificaciones</TabsTrigger>
          <TabsTrigger value="profile">Perfil</TabsTrigger>
        </TabsList>

        {/* Dashboard Overview */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Package className="h-6 w-6" />
                  <div>
                    <p className="text-blue-100 text-sm">Entregas Hoy</p>
                    <p className="text-2xl font-bold">{activeDeliveries?.length || 0}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-6 w-6" />
                  <div>
                    <p className="text-green-100 text-sm">Ganancia Hoy</p>
                    <p className="text-2xl font-bold">S/{earnings?.today?.toFixed(2) || '0.00'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Star className="h-6 w-6" />
                  <div>
                    <p className="text-yellow-100 text-sm">Calificación</p>
                    <p className="text-2xl font-bold">{profile.rating.toFixed(1)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6" />
                  <div>
                    <p className="text-purple-100 text-sm">Eficiencia</p>
                    <p className="text-2xl font-bold">{profile.completionRate}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Goals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Meta Entregas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progreso Semanal</span>
                    <span>{monthlyGoals?.deliveries?.current || 0} / {monthlyGoals?.deliveries?.target || 120}</span>
                  </div>
                  <Progress value={monthlyGoals?.deliveries?.progress || 0} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Meta Ingresos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>S/{earnings?.thisMonth?.toFixed(2) || '0.00'}</span>
                    <span>S/{monthlyGoals?.earnings?.target?.toFixed(2) || '1800.00'}</span>
                  </div>
                  <Progress value={monthlyGoals?.earnings?.progress || 0} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Battery className="h-5 w-5" />
                  Estado Vehículo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Combustible</span>
                    <Badge variant="default">{vehicleStatus?.fuelLevel || 75}%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Próximo Mantenimiento</span>
                    <span className="text-sm text-muted-foreground">
                      {vehicleStatus?.maintenanceNext || '15 Feb'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="h-20 flex-col gap-2">
                  <Navigation className="h-6 w-6" />
                  <span>Ver Rutas</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Bell className="h-6 w-6" />
                  <span>Notificaciones</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Settings className="h-6 w-6" />
                  <span>Configuración</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <Phone className="h-6 w-6" />
                  <span>Soporte</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pending Deliveries */}
        <TabsContent value="pending" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Entregas Pendientes ({pendingDeliveries?.length || 0})</h3>
            <Badge variant="outline">Nuevas asignaciones</Badge>
          </div>
          
          {pendingDeliveries?.map((delivery) => (
            <Card key={delivery.id} className="border-l-4 border-l-orange-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{delivery.serviceType}</Badge>
                      <Badge variant={delivery.priority === 'emergency' ? 'destructive' : 
                                    delivery.priority === 'high' ? 'default' : 'secondary'}>
                        {delivery.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{delivery.address.street}, {delivery.address.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Estimado: {delivery.estimatedArrival}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleAcceptDelivery(delivery.id)}>
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Aceptar
                    </Button>
                    <Button size="sm" variant="outline">
                      <Navigation className="h-4 w-4 mr-1" />
                      Ruta
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Active Deliveries */}
        <TabsContent value="active" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Entregas en Progreso ({activeDeliveries?.length || 0})</h3>
            <Badge variant="default">En curso</Badge>
          </div>
          
          {activeDeliveries?.map((delivery) => (
            <Card key={delivery.id} className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="default">{delivery.serviceType}</Badge>
                      <Badge variant="outline" className="bg-blue-50">
                        {delivery.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{delivery.address.street}, {delivery.address.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Llegada estimada: {delivery.estimatedArrival}</span>
                    </div>
                    {delivery.currentLocation && (
                      <div className="flex items-center gap-2">
                        <Navigation className="h-4 w-4" />
                        <span className="text-sm text-blue-600">{delivery.currentLocation}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleCompleteDelivery(delivery.id)}>
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Completar
                    </Button>
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4 mr-1" />
                      Llamar
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Chat
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Earnings Tab */}
        <TabsContent value="earnings">
          {earnings && (
            <DeliveryEarnings earnings={earnings} currency="S/" />
          )}
        </TabsContent>

        {/* Ratings Tab */}
        <TabsContent value="ratings">
          {ratings && (
            <DeliveryRatings ratings={ratings} />
          )}
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profile.profilePhoto} />
                  <AvatarFallback>{profile.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">{profile.name}</h3>
                  <p className="text-muted-foreground">{profile.email}</p>
                  <p className="text-muted-foreground">{profile.phone}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Tipo de Vehículo</p>
                  <div className="flex items-center gap-2">
                    {getVehicleIcon(profile.vehicleType)}
                    <span className="capitalize">{profile.vehicleType}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Licencia</p>
                  <p className="font-medium">{profile.licenseNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Horario de Trabajo</p>
                  <p className="font-medium">{profile.workingHours.start} - {profile.workingHours.end}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Entregas Totales</p>
                  <p className="font-medium">{profile.totalDeliveries}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}