import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
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
  Plane
} from 'lucide-react';
import { useDeliveryPerson } from '@/hooks/useDeliveryPerson';

interface DeliveryPersonDashboardProps {
  deliveryPersonId: string;
}

export default function DeliveryPersonDashboard({ deliveryPersonId }: DeliveryPersonDashboardProps) {
  const [isOnline, setIsOnline] = useState(true);
  const { data: profile, pendingDeliveries, activeDeliveries, completedDeliveries } = useDeliveryPerson(deliveryPersonId);

  const getVehicleIcon = (vehicleType: string) => {
    switch (vehicleType) {
      case 'motorcycle': return <Bike className="h-4 w-4" />;
      case 'bicycle': return <Bike className="h-4 w-4" />;
      case 'car': return <Car className="h-4 w-4" />;
      case 'drone': return <Plane className="h-4 w-4" />;
      default: return <Truck className="h-4 w-4" />;
    }
  };

  const handleAcceptDelivery = (deliveryId: string) => {
    // Logic to accept delivery
    console.log('Accepting delivery:', deliveryId);
  };

  const handleCompleteDelivery = (deliveryId: string) => {
    // Logic to complete delivery
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Entregas Totales</p>
                <p className="text-2xl font-bold">{profile.totalDeliveries}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Calificación</p>
                <p className="text-2xl font-bold">{profile.rating.toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Tasa de Éxito</p>
                <p className="text-2xl font-bold">{profile.completionRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Tiempo Promedio</p>
                <p className="text-2xl font-bold">{profile.averageDeliveryTime}min</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delivery Tabs */}
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">
            Pendientes ({pendingDeliveries?.length || 0})
          </TabsTrigger>
          <TabsTrigger value="active">
            En Progreso ({activeDeliveries?.length || 0})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completadas ({completedDeliveries?.length || 0})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingDeliveries?.map((delivery) => (
            <Card key={delivery.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{delivery.serviceType}</Badge>
                      <Badge variant={delivery.priority === 'emergency' ? 'destructive' : 'secondary'}>
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

        <TabsContent value="active" className="space-y-4">
          {activeDeliveries?.map((delivery) => (
            <Card key={delivery.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="default">{delivery.serviceType}</Badge>
                      <Badge variant="outline">{delivery.status}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{delivery.address.street}, {delivery.address.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Llegada estimada: {delivery.estimatedArrival}</span>
                    </div>
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

        <TabsContent value="completed" className="space-y-4">
          {completedDeliveries?.map((delivery) => (
            <Card key={delivery.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{delivery.serviceType}</Badge>
                      <Badge variant="default">Completada</Badge>
                      {delivery.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{delivery.rating}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{delivery.address.street}, {delivery.address.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Completada: {delivery.createdAt}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">
                      ${delivery.actualCost || delivery.estimatedCost}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}