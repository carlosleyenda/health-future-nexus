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
import { toast } from 'sonner';
import { useProfessionalDelivery, useAcceptDelivery, useUpdateDeliveryStatus, useUpdateOnlineStatus } from '@/hooks/useProfessionalDelivery';
import ProfessionalEarnings from './ProfessionalEarnings';
import DeliveryRatings from './DeliveryRatings';
import RouteOptimization from './RouteOptimization';
import OfflineMode from './OfflineMode';
import DeliveryActions from './DeliveryActions';

interface DeliveryPersonDashboardProps {
  deliveryPersonId: string;
}

export default function DeliveryPersonDashboard({ deliveryPersonId }: DeliveryPersonDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { 
    staffProfile: profile, 
    isLoading,
    pendingDeliveries, 
    activeDeliveries, 
    completedDeliveries,
    earnings,
    ratings: ratingsRaw,
    stats
  } = useProfessionalDelivery(deliveryPersonId);

  const [isOnline, setIsOnline] = useState(profile?.is_online || false);
  
  const acceptDeliveryMutation = useAcceptDelivery();
  const updateStatusMutation = useUpdateDeliveryStatus();
  const updateOnlineStatusMutation = useUpdateOnlineStatus();

  // Transform ratings array to RatingsData object
  const ratings = {
    overall: ratingsRaw && ratingsRaw.length > 0 
      ? ratingsRaw.reduce((acc: number, r: any) => acc + r.overall_rating, 0) / ratingsRaw.length 
      : 0,
    totalReviews: ratingsRaw?.length || 0,
    breakdown: {
      5: ratingsRaw?.filter((r: any) => r.overall_rating === 5).length || 0,
      4: ratingsRaw?.filter((r: any) => r.overall_rating === 4).length || 0,
      3: ratingsRaw?.filter((r: any) => r.overall_rating === 3).length || 0,
      2: ratingsRaw?.filter((r: any) => r.overall_rating === 2).length || 0,
      1: ratingsRaw?.filter((r: any) => r.overall_rating === 1).length || 0,
    },
    recentReviews: ratingsRaw?.slice(0, 10).map((r: any) => ({
      id: r.id,
      customerName: 'Cliente',
      rating: r.overall_rating,
      comment: r.feedback || 'Sin comentarios',
      date: r.created_at,
      deliveryType: 'Entrega'
    })) || [],
    badges: ratingsRaw && ratingsRaw.length > 20 ? ['Experimentado', 'Confiable'] : ratingsRaw && ratingsRaw.length > 10 ? ['Confiable'] : []
  };

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
    acceptDeliveryMutation.mutate(deliveryId, {
      onSuccess: () => {
        setActiveTab('active');
      }
    });
  };

  const handleCompleteDelivery = (deliveryId: string) => {
    updateStatusMutation.mutate({
      serviceId: deliveryId,
      status: 'completed'
    });
  };

  const handleOnlineStatusChange = (online: boolean) => {
    setIsOnline(online);
    if (profile?.id) {
      updateOnlineStatusMutation.mutate({
        staffId: profile.id,
        isOnline: online
      });
    }
  };

  if (isLoading || !profile) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Cargando datos del repartidor...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 lg:bg-white">
      <div className="max-w-7xl mx-auto p-4 space-y-4 md:space-y-6">
        {/* Mobile-first Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 md:gap-4">
            <Avatar className="h-12 w-12 md:h-16 md:w-16">
              <AvatarImage src={profile.profile_photo} />
              <AvatarFallback>{`${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl md:text-2xl font-bold">{`${profile.first_name} ${profile.last_name}`}</h1>
              <div className="flex items-center gap-2">
                {getVehicleIcon(profile.vehicle_type)}
                <span className="text-sm text-muted-foreground capitalize">{profile.vehicle_type}</span>
                <Badge variant={isOnline ? 'default' : 'secondary'} className="text-xs">
                  {isOnline ? 'En línea' : 'Desconectado'}
                </Badge>
                {profile.documents_verified && (
                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                    Verificado
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground">ID: {profile.staff_id}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{profile.total_deliveries} entregas</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-sm">Estado:</span>
            <Switch 
              checked={isOnline} 
              onCheckedChange={handleOnlineStatusChange}
              disabled={updateOnlineStatusMutation.isPending}
            />
          </div>
        </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="overflow-x-auto">
          <TabsList className="grid w-full grid-cols-7 min-w-[640px] lg:min-w-0">
            <TabsTrigger value="dashboard" className="text-xs lg:text-sm">Dashboard</TabsTrigger>
            <TabsTrigger value="pending" className="text-xs lg:text-sm">Pendientes</TabsTrigger>
            <TabsTrigger value="active" className="text-xs lg:text-sm">En Progreso</TabsTrigger>
            <TabsTrigger value="earnings" className="text-xs lg:text-sm">Ganancias</TabsTrigger>
            <TabsTrigger value="ratings" className="text-xs lg:text-sm">Calificaciones</TabsTrigger>
            <TabsTrigger value="routes" className="text-xs lg:text-sm">Rutas</TabsTrigger>
            <TabsTrigger value="offline" className="text-xs lg:text-sm">Offline</TabsTrigger>
          </TabsList>
        </div>

        {/* Dashboard Overview */}
        <TabsContent value="dashboard" className="space-y-4 md:space-y-6">
          {/* Quick Stats - Responsive grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-3 md:p-4">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 md:h-6 md:w-6" />
                  <div>
                    <p className="text-blue-100 text-xs md:text-sm">Entregas Hoy</p>
                    <p className="text-xl md:text-2xl font-bold">{stats.completedToday}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-3 md:p-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 md:h-6 md:w-6" />
                  <div>
                    <p className="text-green-100 text-xs md:text-sm">Ganancia Hoy</p>
                    <p className="text-xl md:text-2xl font-bold">S/{earnings?.today?.toFixed(2) || '0.00'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
              <CardContent className="p-3 md:p-4">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 md:h-6 md:w-6" />
                  <div>
                    <p className="text-yellow-100 text-xs md:text-sm">Calificación</p>
                    <p className="text-xl md:text-2xl font-bold">{profile.rating.toFixed(1)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent className="p-3 md:p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 md:h-6 md:w-6" />
                  <div>
                    <p className="text-purple-100 text-xs md:text-sm">Eficiencia</p>
                    <p className="text-xl md:text-2xl font-bold">{stats.completionRate.toFixed(1)}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Goals - Responsive grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
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
                    <span>Progreso Mensual</span>
                    <span>{stats.totalDeliveries} / 120</span>
                  </div>
                  <Progress value={(stats.totalDeliveries / 120) * 100} className="h-2" />
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
                    <span>S/{earnings?.month?.toFixed(2) || '0.00'}</span>
                    <span>S/1800.00</span>
                  </div>
                  <Progress value={((earnings?.month || 0) / 1800) * 100} className="h-2" />
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
                    <span className="text-sm">Estado</span>
                    <Badge variant={profile.is_active ? "default" : "secondary"}>
                      {profile.is_active ? "Activo" : "Inactivo"}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Verificación</span>
                    <Badge variant={profile.documents_verified ? "default" : "destructive"}>
                      {profile.documents_verified ? "Verificado" : "Pendiente"}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Vehículo</span>
                    <span className="text-sm text-muted-foreground capitalize">
                      {profile.vehicle_brand} {profile.vehicle_model}
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
              <div className="grid grid-cols-2 gap-2 md:gap-4">
                <Button 
                  className="h-16 md:h-20 flex-col gap-1 md:gap-2 text-xs md:text-sm"
                  onClick={() => setActiveTab('routes')}
                >
                  <Navigation className="h-4 w-4 md:h-6 md:w-6" />
                  <span>Ver Rutas</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-16 md:h-20 flex-col gap-1 md:gap-2 text-xs md:text-sm"
                  onClick={() => toast.info('No tienes notificaciones pendientes')}
                >
                  <Bell className="h-4 w-4 md:h-6 md:w-6" />
                  <span>Notificaciones</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-16 md:h-20 flex-col gap-1 md:gap-2 text-xs md:text-sm"
                  onClick={() => toast.info('Configuración próximamente disponible')}
                >
                  <Settings className="h-4 w-4 md:h-6 md:w-6" />
                  <span>Configuración</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-16 md:h-20 flex-col gap-1 md:gap-2 text-xs md:text-sm"
                  onClick={() => window.open('tel:+51987654321')}
                >
                  <Phone className="h-4 w-4 md:h-6 md:w-6" />
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
                        <span className="hidden sm:inline">Aceptar</span>
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          const address = `${delivery.address.street}, ${delivery.address.city}`;
                          window.open(`https://www.google.com/maps/dir//${encodeURIComponent(address)}`, '_blank');
                        }}
                      >
                        <Navigation className="h-4 w-4 mr-1" />
                        <span className="hidden sm:inline">Ruta</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Active Deliveries - Mobile optimized */}
          <TabsContent value="active" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">En Progreso ({activeDeliveries?.length || 0})</h3>
              <Badge variant="default">En curso</Badge>
            </div>
            
            {activeDeliveries?.map((delivery) => (
              <Card key={delivery.id} className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="default">{delivery.serviceType}</Badge>
                        <Badge variant="outline" className="bg-blue-50">
                          {delivery.status}
                        </Badge>
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => setActiveTab('actions')}
                        className="md:hidden"
                      >
                        Acciones
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
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
                    
                    {/* Desktop actions */}
                    <div className="hidden md:flex gap-2">
                      <Button size="sm" onClick={() => handleCompleteDelivery(delivery.id)}>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Completar
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => window.open('tel:+51987654321')}
                      >
                        <Phone className="h-4 w-4 mr-1" />
                        Llamar
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => toast.info('Iniciando chat con cliente...')}
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Chat
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Mobile delivery actions */}
            {activeDeliveries && activeDeliveries.length > 0 && (
              <div className="md:hidden">
                <DeliveryActions 
                  deliveryId={activeDeliveries[0].id}
                  customerInfo={{
                    name: "Cliente Demo",
                    phone: "+51 987 654 321",
                    address: activeDeliveries[0].address.street
                  }}
                  onComplete={() => handleCompleteDelivery(activeDeliveries[0].id)}
                />
              </div>
            )}

          </TabsContent>

        {/* Earnings Tab */}
        <TabsContent value="earnings">
          {earnings && (
            <ProfessionalEarnings earnings={earnings} currency="S/" />
          )}
        </TabsContent>

        {/* Ratings Tab */}
        <TabsContent value="ratings">
          <DeliveryRatings ratings={ratings} />
        </TabsContent>

        {/* Routes Optimization Tab */}
        <TabsContent value="routes">
          <RouteOptimization 
            deliveries={[
              ...pendingDeliveries?.map(d => ({
                id: d.id,
                address: `${d.address.street}, ${d.address.city}`,
                priority: d.priority,
                estimatedTime: 25,
                coordinates: { lat: -12.0464, lng: -77.0428 }
              })) || [],
              ...activeDeliveries?.map(d => ({
                id: d.id,
                address: `${d.address.street}, ${d.address.city}`,
                priority: d.priority,
                estimatedTime: 20,
                coordinates: { lat: -12.0464, lng: -77.0428 }
              })) || []
            ]} 
          />
        </TabsContent>

        {/* Offline Mode Tab */}
        <TabsContent value="offline">
          <OfflineMode />
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
}