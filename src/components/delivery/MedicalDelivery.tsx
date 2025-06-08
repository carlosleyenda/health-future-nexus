
import React, { useState } from 'react';
import { Truck, MapPin, Clock, Package, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDeliveryServices, useRequestDelivery, useDeliveryTracking } from '@/hooks/useDelivery';

interface MedicalDeliveryProps {
  patientId: string;
}

export default function MedicalDelivery({ patientId }: MedicalDeliveryProps) {
  const { data: deliveries } = useDeliveryServices(patientId);
  const requestDelivery = useRequestDelivery();
  const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null);
  const { data: tracking } = useDeliveryTracking(selectedDelivery || '');

  const handleRequestService = async (serviceType: string) => {
    try {
      await requestDelivery.mutateAsync({
        patientId,
        serviceType,
        scheduledDate: new Date().toISOString(),
        notes: ''
      });
    } catch (error) {
      console.error('Error requesting service:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'secondary';
      case 'in_transit': return 'default';
      case 'delivered': return 'outline';
      default: return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'scheduled': return 'Programado';
      case 'in_transit': return 'En Camino';
      case 'delivered': return 'Entregado';
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Servicios a Domicilio</h2>
          <p className="text-muted-foreground">Consultas, medicamentos y servicios médicos</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Solicitar Servicio
        </Button>
      </div>

      {/* Service Types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Medicamentos</h3>
                <p className="text-sm text-muted-foreground">Entrega a domicilio</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => handleRequestService('medication')}
            >
              Solicitar
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Truck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Consulta a Domicilio</h3>
                <p className="text-sm text-gray-600">Doctor en casa</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => handleRequestService('home_consultation')}
            >
              Solicitar
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">Exámenes de Lab</h3>
                <p className="text-sm text-gray-600">Toma de muestras</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => handleRequestService('lab_tests')}
            >
              Solicitar
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Active Deliveries */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Truck className="h-5 w-5 mr-2" />
            Servicios Activos
          </CardTitle>
        </CardHeader>
        <CardContent>
          {deliveries?.length ? (
            <div className="space-y-4">
              {deliveries.map((delivery) => (
                <div 
                  key={delivery.id} 
                  className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer"
                  onClick={() => setSelectedDelivery(delivery.id)}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold capitalize">
                        {delivery.serviceType.replace('_', ' ')}
                      </h4>
                      <p className="text-sm text-muted-foreground">{delivery.deliveryAddress}</p>
                    </div>
                    <Badge variant={getStatusColor(delivery.status)}>
                      {getStatusText(delivery.status)}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    Llegada estimada: {new Date(delivery.estimatedArrival).toLocaleTimeString('es-MX', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  
                  {selectedDelivery === delivery.id && tracking && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <h5 className="font-medium mb-2">Información del Conductor</h5>
                      <p className="text-sm">Conductor: {tracking.driverName}</p>
                      <p className="text-sm">Teléfono: {tracking.driverPhone}</p>
                      <p className="text-sm">Tiempo estimado: {tracking.estimatedArrival}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Truck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Sin servicios activos</h3>
              <p className="text-muted-foreground">Solicita un servicio a domicilio cuando lo necesites</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
