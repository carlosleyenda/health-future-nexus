import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Navigation, 
  User, 
  CheckCircle,
  AlertCircle,
  Car,
  Home,
  Stethoscope
} from 'lucide-react';
import { useDeliveryTracking } from '@/hooks/useDelivery';

interface HomeDoctorTrackingProps {
  deliveryId: string;
}

export default function HomeDoctorTracking({ deliveryId }: HomeDoctorTrackingProps) {
  const { data: tracking, isLoading } = useDeliveryTracking(deliveryId);
  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  // Simulate real-time updates
  useEffect(() => {
    if (!tracking) return;

    const interval = setInterval(() => {
      // This would update the doctor's location in a real implementation
      console.log('Updating doctor location...');
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [tracking]);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!tracking) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No se encontró información de seguimiento</p>
        </CardContent>
      </Card>
    );
  }

  const getStatusProgress = (status: string) => {
    const progressMap = {
      requested: 20,
      assigned: 40,
      in_transit: 70,
      arrived: 90,
      in_progress: 95,
      completed: 100
    };
    return progressMap[status as keyof typeof progressMap] || 0;
  };

  const getStatusColor = (status: string) => {
    const colorMap = {
      requested: 'bg-yellow-100 text-yellow-800',
      assigned: 'bg-blue-100 text-blue-800',
      in_transit: 'bg-purple-100 text-purple-800',
      arrived: 'bg-green-100 text-green-800',
      in_progress: 'bg-orange-100 text-orange-800',
      completed: 'bg-gray-100 text-gray-800'
    };
    return colorMap[status as keyof typeof colorMap] || 'bg-gray-100 text-gray-800';
  };

  const getStatusMessage = (status: string) => {
    const messages = {
      requested: 'Solicitud recibida, buscando médico disponible',
      assigned: 'Médico asignado, preparándose para salir',
      in_transit: 'Médico en camino a tu ubicación',
      arrived: 'Médico ha llegado a tu domicilio',
      in_progress: 'Consulta médica en progreso',
      completed: 'Consulta completada'
    };
    return messages[status as keyof typeof messages] || 'Estado desconocido';
  };

  const estimatedArrival = tracking.estimatedArrival ? new Date(tracking.estimatedArrival) : null;
  const timeRemaining = estimatedArrival ? Math.max(0, estimatedArrival.getTime() - Date.now()) : 0;
  const minutesRemaining = Math.floor(timeRemaining / (1000 * 60));

  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-6 w-6" />
            Seguimiento de Médico a Domicilio
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Badge className={getStatusColor(tracking.status)}>
                {tracking.status}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {Math.round(getStatusProgress(tracking.status))}% completado
              </span>
            </div>
            <Progress value={getStatusProgress(tracking.status)} className="h-2" />
            <p className="text-sm text-muted-foreground">
              {getStatusMessage(tracking.status)}
            </p>
          </div>

          {/* Estimated Arrival */}
          {tracking.status === 'in_transit' && minutesRemaining > 0 && (
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
              <Clock className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="font-medium text-blue-900">Tiempo estimado de llegada</h3>
                <p className="text-2xl font-bold text-blue-600">
                  {minutesRemaining} minutos
                </p>
                <p className="text-sm text-blue-700">
                  Llega aproximadamente a las {estimatedArrival?.toLocaleTimeString()}
                </p>
              </div>
            </div>
          )}

          {/* Doctor Information */}
          <div className="flex items-start gap-4 p-4 border rounded-lg">
            <Avatar className="h-12 w-12">
              <AvatarFallback>
                <User className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-medium">Dr. Juan Carlos Mendoza</h3>
              <p className="text-sm text-muted-foreground">Medicina General</p>
              <div className="flex items-center gap-4 mt-2">
                <Badge variant="secondary">8 años experiencia</Badge>
                <div className="flex items-center gap-1">
                  <span className="text-sm">4.8</span>
                  <div className="flex">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className={`w-3 h-3 ${i <= 4 ? 'text-yellow-400' : 'text-gray-300'}`}>
                        ⭐
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-2" />
              Llamar
            </Button>
          </div>

          {/* Current Location */}
          <div className="space-y-2">
            <h3 className="font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Ubicación Actual
            </h3>
            <p className="text-sm text-muted-foreground">
              {tracking.currentLocation}
            </p>
            
            {/* Map placeholder - In a real implementation, you'd integrate with a mapping service */}
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center relative overflow-hidden">
              {!showMap ? (
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 mb-4">Mapa en tiempo real</p>
                  <Button onClick={() => setShowMap(true)}>
                    <Navigation className="h-4 w-4 mr-2" />
                    Ver Mapa
                  </Button>
                </div>
              ) : (
                <div className="w-full h-full relative">
                  {/* Simulated map interface */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
                    <div className="absolute top-4 left-4 bg-white p-2 rounded shadow">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium">Dr. Mendoza</span>
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-white p-2 rounded shadow">
                      <div className="flex items-center gap-2">
                        <Home className="h-4 w-4" />
                        <span className="text-sm">Tu ubicación</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de la Consulta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tracking.events.map((event, index) => (
              <div key={event.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  }`}>
                    {index === 0 ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Clock className="h-4 w-4" />
                    )}
                  </div>
                  {index < tracking.events.length - 1 && (
                    <div className="w-px h-8 bg-border mt-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{event.description}</h4>
                    <span className="text-sm text-muted-foreground">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{event.location}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      {tracking.status === 'arrived' && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="flex-1">
                <h3 className="font-medium text-green-900">
                  El médico ha llegado a tu domicilio
                </h3>
                <p className="text-sm text-green-700">
                  Por favor, recíbelo y prepárate para la consulta
                </p>
              </div>
              <Button variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Contactar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}