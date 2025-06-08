
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Truck, Map, Clock } from 'lucide-react';
import DeliveryRequestForm from './DeliveryRequestForm';
import DeliveryTracking from './DeliveryTracking';
import DeliveryHistory from './DeliveryHistory';
import { useDeliveryServices } from '@/hooks/useDelivery';
import { useAuthStore } from '@/store/auth';

export default function MedicalDelivery() {
  const [activeTab, setActiveTab] = useState('request');
  const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null);
  const { user } = useAuthStore();

  const { data: deliveries, isLoading } = useDeliveryServices(user?.id || '');

  const activeDeliveries = deliveries?.filter(d => 
    ['requested', 'assigned', 'in_transit', 'arrived', 'in_progress'].includes(d.status)
  ) || [];

  const getStatusColor = (status: string) => {
    const colors = {
      requested: 'bg-yellow-100 text-yellow-800',
      assigned: 'bg-blue-100 text-blue-800',
      in_transit: 'bg-purple-100 text-purple-800',
      arrived: 'bg-green-100 text-green-800',
      in_progress: 'bg-orange-100 text-orange-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getServiceIcon = (serviceType: string) => {
    return <Truck className="h-5 w-5" />;
  };

  const getServiceName = (serviceType: string) => {
    const names = {
      medication_delivery: 'Entrega de Medicamentos',
      sample_collection: 'Toma de Muestras',
      home_consultation: 'Consulta a Domicilio',
      nursing_care: 'Cuidado de Enfermería',
      medical_equipment: 'Equipo Médico',
      oxygen_delivery: 'Entrega de Oxígeno',
      nebulizer_delivery: 'Entrega de Nebulizador',
      emergency_care: 'Atención de Emergencia'
    };
    return names[serviceType as keyof typeof names] || serviceType;
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Servicios Médicos a Domicilio
        </h1>
        <p className="text-gray-600">
          Solicita servicios médicos directamente en tu hogar con seguimiento en tiempo real
        </p>
      </div>

      {/* Active Deliveries Summary */}
      {activeDeliveries.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Servicios Activos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeDeliveries.map((delivery) => (
              <Card key={delivery.id} className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => {
                      setSelectedDelivery(delivery.id);
                      setActiveTab('tracking');
                    }}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getServiceIcon(delivery.serviceType)}
                      <span className="font-medium text-sm">
                        {getServiceName(delivery.serviceType)}
                      </span>
                    </div>
                    <Badge className={getStatusColor(delivery.status)}>
                      {delivery.status}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">
                    {delivery.address.street}
                  </p>
                  
                  {delivery.estimatedArrival && (
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>
                        Llega en {Math.round((new Date(delivery.estimatedArrival).getTime() - Date.now()) / (1000 * 60))} min
                      </span>
                    </div>
                  )}
                  
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">
                      ${delivery.estimatedCost}
                    </span>
                    <Button variant="outline" size="sm">
                      <Map className="h-4 w-4 mr-1" />
                      Rastrear
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="request" className="flex items-center gap-2">
            <Truck className="w-4 h-4" />
            Solicitar Servicio
          </TabsTrigger>
          <TabsTrigger value="tracking" className="flex items-center gap-2">
            <Map className="w-4 h-4" />
            Seguimiento
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Historial
          </TabsTrigger>
        </TabsList>

        <TabsContent value="request">
          <DeliveryRequestForm />
        </TabsContent>

        <TabsContent value="tracking">
          <DeliveryTracking selectedDeliveryId={selectedDelivery} />
        </TabsContent>

        <TabsContent value="history">
          <DeliveryHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}
