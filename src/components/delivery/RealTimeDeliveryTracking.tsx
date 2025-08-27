import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MapPin, 
  Clock, 
  Phone, 
  MessageCircle, 
  Truck, 
  CheckCircle,
  User,
  Star,
  Navigation
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { useToast } from '@/hooks/use-toast';

interface DeliveryDriver {
  id: string;
  name: string;
  phone: string;
  photo: string;
  rating: number;
  totalDeliveries: number;
  vehicleType: 'motorcycle' | 'bicycle' | 'car';
  vehiclePlate: string;
  currentLocation: {
    lat: number;
    lng: number;
  };
}

interface DeliveryStatus {
  id: string;
  status: 'requested' | 'accepted' | 'preparing' | 'pickup' | 'in_transit' | 'arrived' | 'delivered';
  timestamp: string;
  description: string;
  estimatedTime?: number; // minutos
}

interface RealTimeDelivery {
  id: string;
  serviceType: string;
  address: {
    street: string;
    coordinates: { lat: number; lng: number };
  };
  driver?: DeliveryDriver;
  statuses: DeliveryStatus[];
  currentStatus: string;
  estimatedDeliveryTime: string;
  totalTime: number; // minutos
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  totalCost: number;
  createdAt: string;
}

interface RealTimeDeliveryTrackingProps {
  deliveryId: string;
}

export default function RealTimeDeliveryTracking({ deliveryId }: RealTimeDeliveryTrackingProps) {
  const { user } = useAuthStore();
  const { toast } = useToast();
  const mapRef = useRef<HTMLDivElement>(null);
  const [delivery, setDelivery] = useState<RealTimeDelivery | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Simulación de datos en tiempo real
  useEffect(() => {
    // Datos simulados del delivery
    const mockDelivery: RealTimeDelivery = {
      id: deliveryId,
      serviceType: 'medication_delivery',
      address: {
        street: 'Av. Reforma 123, Col. Centro',
        coordinates: { lat: 19.4326, lng: -99.1332 }
      },
      driver: {
        id: 'driver-1',
        name: 'Carlos Mendoza',
        phone: '+52 55 1234 5678',
        photo: '/placeholder-driver.jpg',
        rating: 4.8,
        totalDeliveries: 847,
        vehicleType: 'motorcycle',
        vehiclePlate: 'MOT-123',
        currentLocation: { lat: 19.4200, lng: -99.1300 }
      },
      statuses: [
        {
          id: '1',
          status: 'requested',
          timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          description: 'Pedido solicitado',
          estimatedTime: 5
        },
        {
          id: '2',
          status: 'accepted',
          timestamp: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
          description: 'Pedido aceptado por el repartidor',
          estimatedTime: 10
        },
        {
          id: '3',
          status: 'preparing',
          timestamp: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
          description: 'Preparando medicamentos en farmacia',
          estimatedTime: 15
        },
        {
          id: '4',
          status: 'pickup',
          timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
          description: 'Repartidor recogió el pedido',
          estimatedTime: 20
        },
        {
          id: '5',
          status: 'in_transit',
          timestamp: new Date().toISOString(),
          description: 'En camino a tu ubicación',
          estimatedTime: 8
        }
      ],
      currentStatus: 'in_transit',
      estimatedDeliveryTime: new Date(Date.now() + 8 * 60 * 1000).toISOString(),
      totalTime: 25,
      items: [
        { name: 'Paracetamol 500mg', quantity: 1, price: 45.00 },
        { name: 'Ibuprofeno 400mg', quantity: 1, price: 32.00 }
      ],
      totalCost: 97.00,
      createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString()
    };

    setDelivery(mockDelivery);

    // Simulación de actualizaciones en tiempo real
    const interval = setInterval(() => {
      setDelivery(prev => {
        if (!prev || !prev.driver) return prev;
        
        // Simular movimiento del repartidor
        const newLat = prev.driver.currentLocation.lat + (Math.random() - 0.5) * 0.001;
        const newLng = prev.driver.currentLocation.lng + (Math.random() - 0.5) * 0.001;
        
        return {
          ...prev,
          driver: {
            ...prev.driver,
            currentLocation: { lat: newLat, lng: newLng }
          }
        };
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [deliveryId]);

  // Simulación de mapa (en un proyecto real usarías Google Maps o Mapbox)
  useEffect(() => {
    if (mapRef.current && delivery) {
      setIsMapLoaded(true);
    }
  }, [delivery]);

  const getStatusProgress = (currentStatus: string) => {
    const statusOrder = ['requested', 'accepted', 'preparing', 'pickup', 'in_transit', 'arrived', 'delivered'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    return ((currentIndex + 1) / statusOrder.length) * 100;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      requested: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-blue-100 text-blue-800',
      preparing: 'bg-purple-100 text-purple-800',
      pickup: 'bg-orange-100 text-orange-800',
      in_transit: 'bg-green-100 text-green-800',
      arrived: 'bg-indigo-100 text-indigo-800',
      delivered: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'requested': return <Clock className="h-4 w-4" />;
      case 'accepted': return <CheckCircle className="h-4 w-4" />;
      case 'preparing': return <User className="h-4 w-4" />;
      case 'pickup': return <Truck className="h-4 w-4" />;
      case 'in_transit': return <Navigation className="h-4 w-4" />;
      case 'arrived': return <MapPin className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const formatTimeRemaining = (estimatedTime: string) => {
    const now = new Date();
    const estimated = new Date(estimatedTime);
    const diffMs = estimated.getTime() - now.getTime();
    const diffMins = Math.max(0, Math.round(diffMs / (1000 * 60)));
    
    if (diffMins < 60) {
      return `${diffMins} min`;
    }
    const hours = Math.floor(diffMins / 60);
    const minutes = diffMins % 60;
    return `${hours}h ${minutes}min`;
  };

  const handleContactDriver = (method: 'call' | 'message') => {
    if (!delivery?.driver) return;
    
    if (method === 'call') {
      toast({
        title: "Llamando al repartidor",
        description: `Conectando con ${delivery.driver.name}...`,
      });
    } else {
      toast({
        title: "Abriendo chat",
        description: `Iniciando conversación con ${delivery.driver.name}`,
      });
    }
  };

  if (!delivery) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Truck className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">Cargando información del pedido...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header with ETA */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Tu pedido está en camino 🚀
              </h1>
              <p className="text-gray-600">
                Llegará en aproximadamente <span className="font-semibold text-green-600">
                  {formatTimeRemaining(delivery.estimatedDeliveryTime)}
                </span>
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">
                {formatTimeRemaining(delivery.estimatedDeliveryTime)}
              </div>
              <p className="text-sm text-gray-500">tiempo estimado</p>
            </div>
          </div>
          
          <div className="mt-4">
            <Progress value={getStatusProgress(delivery.currentStatus)} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Driver Info */}
      {delivery.driver && delivery.currentStatus !== 'requested' && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={delivery.driver.photo} alt={delivery.driver.name} />
                  <AvatarFallback>{delivery.driver.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{delivery.driver.name}</h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span>{delivery.driver.rating}</span>
                    <span>•</span>
                    <span>{delivery.driver.totalDeliveries} entregas</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {delivery.driver.vehicleType === 'motorcycle' ? 'Motocicleta' : 
                     delivery.driver.vehicleType === 'bicycle' ? 'Bicicleta' : 'Auto'} • 
                    {delivery.driver.vehiclePlate}
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleContactDriver('call')}
                >
                  <Phone className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleContactDriver('message')}
                >
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Live Map */}
      {delivery.currentStatus === 'in_transit' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-600" />
              Ubicación en tiempo real
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div 
              ref={mapRef}
              className="bg-gradient-to-br from-green-100 to-blue-100 rounded-lg h-80 flex items-center justify-center relative overflow-hidden"
            >
              {isMapLoaded ? (
                <div className="w-full h-full relative">
                  {/* Simulación visual del mapa */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 opacity-50"></div>
                  
                  {/* Ubicación del cliente */}
                  <div className="absolute top-16 right-16 bg-red-500 rounded-full p-2 shadow-lg">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute top-12 right-20 bg-white px-2 py-1 rounded text-xs font-medium shadow">
                    Tu ubicación
                  </div>
                  
                  {/* Ubicación del repartidor (animada) */}
                  <div 
                    className="absolute top-32 left-24 bg-green-500 rounded-full p-2 shadow-lg animate-pulse"
                    style={{
                      transform: `translate(${Math.sin(Date.now() / 1000) * 20}px, ${Math.cos(Date.now() / 1000) * 10}px)`
                    }}
                  >
                    <Truck className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute top-28 left-28 bg-white px-2 py-1 rounded text-xs font-medium shadow">
                    {delivery.driver?.name}
                  </div>
                  
                  {/* Ruta simulada */}
                  <svg className="absolute inset-0 w-full h-full">
                    <path
                      d="M 100 150 Q 200 100 300 130"
                      stroke="#22c55e"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray="5,5"
                      className="animate-pulse"
                    />
                  </svg>
                  
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span>Siguiendo en tiempo real</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">Cargando mapa...</p>
                </div>
              )}
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">En tiempo real</span>
              </div>
              <div className="text-sm text-gray-600">
                Distancia estimada: ~2.3 km
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Status Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Estado del pedido</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {delivery.statuses.map((status, index) => (
              <div key={status.id} className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  delivery.currentStatus === status.status || 
                  delivery.statuses.findIndex(s => s.status === delivery.currentStatus) > index
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {getStatusIcon(status.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-medium ${
                        delivery.currentStatus === status.status ? 'text-green-600' : 'text-gray-900'
                      }`}>
                        {status.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(status.timestamp).toLocaleTimeString('es-ES', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    {delivery.currentStatus === status.status && (
                      <Badge className={getStatusColor(status.status)}>
                        Actual
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Order Details */}
      <Card>
        <CardHeader>
          <CardTitle>Detalles del pedido</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {delivery.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <span className="font-medium">{item.name}</span>
                  <span className="text-gray-500 ml-2">x{item.quantity}</span>
                </div>
                <span className="font-medium">${item.price.toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center font-semibold">
                <span>Total</span>
                <span>${delivery.totalCost.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delivery Address */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-gray-600 mt-1" />
            <div>
              <h4 className="font-medium mb-1">Dirección de entrega</h4>
              <p className="text-gray-600">{delivery.address.street}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}