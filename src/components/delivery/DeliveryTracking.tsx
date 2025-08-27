
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Truck, Map, Eye } from 'lucide-react';
import { useDeliveryServices, useDeliveryTracking } from '@/hooks/useDelivery';
import { useAuthStore } from '@/store/auth';
import RealTimeDeliveryTracking from './RealTimeDeliveryTracking';

interface DeliveryTrackingProps {
  selectedDeliveryId?: string | null;
}

export default function DeliveryTracking({ selectedDeliveryId }: DeliveryTrackingProps) {
  const [trackingId, setTrackingId] = useState(selectedDeliveryId || '');
  const [showRealTimeTracking, setShowRealTimeTracking] = useState(false);
  const { user } = useAuthStore();

  const { data: deliveries } = useDeliveryServices(user?.id || '');

  const activeDeliveries = deliveries?.filter(d => 
    ['requested', 'assigned', 'in_transit', 'arrived', 'in_progress'].includes(d.status)
  ) || [];

  const selectedDelivery = deliveries?.find(d => d.id === trackingId);

  const getServiceName = (serviceType: string) => {
    const names = {
      medication_delivery: 'Entrega de Medicamentos',
      sample_collection: 'Toma de Muestras',
      home_consultation: 'Consulta a Domicilio',
      nursing_care: 'Cuidado de Enfermería',
      medical_equipment: 'Equipo Médico',
      oxygen_delivery: 'Entrega de Oxígeno',
      emergency_care: 'Atención de Emergencia'
    };
    return names[serviceType as keyof typeof names] || serviceType;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      requested: 'bg-yellow-100 text-yellow-800',
      assigned: 'bg-blue-100 text-blue-800',
      preparing: 'bg-purple-100 text-purple-800',
      pickup: 'bg-orange-100 text-orange-800',
      in_transit: 'bg-green-100 text-green-800',
      arrived: 'bg-indigo-100 text-indigo-800',
      in_progress: 'bg-orange-100 text-orange-800',
      completed: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  // Si hay un tracking ID seleccionado y se quiere ver el tracking en tiempo real
  if (trackingId && showRealTimeTracking) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => setShowRealTimeTracking(false)}
          >
            ← Volver al listado
          </Button>
        </div>
        <RealTimeDeliveryTracking deliveryId={trackingId} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Delivery Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Map className="h-5 w-5 text-blue-600" />
            Seguimiento de Servicios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Seleccionar servicio activo
              </label>
              <Select onValueChange={setTrackingId} value={trackingId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un servicio para rastrear" />
                </SelectTrigger>
                <SelectContent>
                  {activeDeliveries.map((delivery) => (
                    <SelectItem key={delivery.id} value={delivery.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{getServiceName(delivery.serviceType)}</span>
                        <Badge className={`ml-2 ${getStatusColor(delivery.status)}`}>
                          {delivery.status === 'in_transit' ? 'En camino' : 
                           delivery.status === 'assigned' ? 'Asignado' :
                           delivery.status === 'arrived' ? 'Llegó' :
                           delivery.status}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Deliveries Grid */}
      {activeDeliveries.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeDeliveries.map((delivery) => (
            <Card key={delivery.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-sm">
                        {getServiceName(delivery.serviceType)}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1">
                        {delivery.address.street}
                      </p>
                    </div>
                    <Badge className={`${getStatusColor(delivery.status)} text-xs`}>
                      {delivery.status === 'in_transit' ? 'En camino' : 
                       delivery.status === 'assigned' ? 'Asignado' :
                       delivery.status === 'arrived' ? 'Llegó' :
                       delivery.status}
                    </Badge>
                  </div>

                  {delivery.estimatedArrival && (
                    <div className="text-xs text-gray-500">
                      Llegada estimada: {new Date(delivery.estimatedArrival).toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 text-xs"
                      onClick={() => {
                        setTrackingId(delivery.id);
                        setShowRealTimeTracking(true);
                      }}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Ver en vivo
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Quick Access for In Transit */}
      {activeDeliveries.filter(d => ['in_transit', 'assigned'].includes(d.status)).length > 0 && (
        <Card className="bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <Truck className="h-5 w-5" />
              Servicios en camino
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeDeliveries
                .filter(d => ['in_transit', 'assigned'].includes(d.status))
                .map((delivery) => (
                  <div key={delivery.id} className="flex items-center justify-between bg-white rounded-lg p-3">
                    <div>
                      <h4 className="font-medium text-sm">
                        {getServiceName(delivery.serviceType)}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {delivery.estimatedArrival && (
                          <>Llega en {Math.round((new Date(delivery.estimatedArrival).getTime() - Date.now()) / (1000 * 60))} min</>
                        )}
                      </p>
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => {
                        setTrackingId(delivery.id);
                        setShowRealTimeTracking(true);
                      }}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Rastrear
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeDeliveries.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Truck className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">No tienes servicios activos</p>
            <p className="text-sm text-gray-400 mt-2">
              Solicita un servicio para ver el seguimiento en tiempo real
            </p>
            <Button className="mt-4" variant="outline">
              Solicitar servicio
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
