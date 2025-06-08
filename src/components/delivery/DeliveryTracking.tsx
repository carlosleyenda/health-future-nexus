
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { truck, map, clock } from 'lucide-react';
import { useDeliveryServices, useDeliveryTracking } from '@/hooks/useDelivery';
import { useAuthStore } from '@/store/auth';

interface DeliveryTrackingProps {
  selectedDeliveryId?: string | null;
}

export default function DeliveryTracking({ selectedDeliveryId }: DeliveryTrackingProps) {
  const [trackingId, setTrackingId] = useState(selectedDeliveryId || '');
  const { user } = useAuthStore();

  const { data: deliveries } = useDeliveryServices(user?.id || '');
  const { data: tracking } = useDeliveryTracking(trackingId);

  const activeDeliveries = deliveries?.filter(d => 
    ['requested', 'assigned', 'in_transit', 'arrived', 'in_progress'].includes(d.status)
  ) || [];

  const selectedDelivery = deliveries?.find(d => d.id === trackingId);

  const getStatusProgress = (status: string) => {
    const statusMap = {
      requested: 20,
      assigned: 40,
      in_transit: 60,
      arrived: 80,
      in_progress: 90,
      completed: 100
    };
    return statusMap[status as keyof typeof statusMap] || 0;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      requested: 'bg-yellow-100 text-yellow-800',
      assigned: 'bg-blue-100 text-blue-800',
      in_transit: 'bg-purple-100 text-purple-800',
      arrived: 'bg-green-100 text-green-800',
      in_progress: 'bg-orange-100 text-orange-800',
      completed: 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

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

  return (
    <div className="space-y-6">
      {/* Delivery Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <map className="h-5 w-5 text-blue-600" />
            Seguimiento de Servicio
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
                          {delivery.status}
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

      {/* Tracking Information */}
      {selectedDelivery && (
        <>
          {/* Service Overview */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    {getServiceName(selectedDelivery.serviceType)}
                  </h3>
                  <p className="text-gray-600 mb-4">{selectedDelivery.address.street}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Estado:</span>
                      <Badge className={getStatusColor(selectedDelivery.status)}>
                        {selectedDelivery.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Costo:</span>
                      <span className="font-semibold">${selectedDelivery.estimatedCost}</span>
                    </div>
                    {selectedDelivery.estimatedArrival && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Llegada estimada:</span>
                        <span className="font-semibold">
                          {new Date(selectedDelivery.estimatedArrival).toLocaleTimeString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Progreso del servicio</h4>
                  <Progress value={getStatusProgress(selectedDelivery.status)} className="mb-2" />
                  <p className="text-sm text-gray-600">
                    {getStatusProgress(selectedDelivery.status)}% completado
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Live Tracking */}
          {selectedDelivery.status === 'in_transit' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <truck className="h-5 w-5 text-green-600" />
                  Ubicación en Tiempo Real
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center mb-4">
                  <div className="text-center">
                    <map className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-gray-500">Mapa de seguimiento</p>
                    <p className="text-sm text-gray-400">
                      {selectedDelivery.currentLocation || 'Ubicación en tiempo real'}
                    </p>
                  </div>
                </div>

                {selectedDelivery.estimatedArrival && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <clock className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">Tiempo estimado de llegada</span>
                    </div>
                    <span className="font-semibold text-green-600">
                      {Math.round((new Date(selectedDelivery.estimatedArrival).getTime() - Date.now()) / (1000 * 60))} min
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Tracking Events */}
          {tracking && (
            <Card>
              <CardHeader>
                <CardTitle>Historial de Eventos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tracking.events.map((event, index) => (
                    <div key={event.id} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-3 h-3 bg-blue-600 rounded-full mt-2" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{event.description}</p>
                          <span className="text-xs text-gray-500">
                            {new Date(event.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">{event.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contact and Actions */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="w-full">
                  <truck className="h-4 w-4 mr-2" />
                  Contactar Repartidor
                </Button>
                <Button variant="outline" className="w-full">
                  Cancelar Servicio
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {activeDeliveries.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <truck className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">No tienes servicios activos</p>
            <p className="text-sm text-gray-400 mt-2">
              Solicita un servicio para ver el seguimiento en tiempo real
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
