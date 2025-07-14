import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, User, Stethoscope, History } from 'lucide-react';
import HomeDoctorRequest from './HomeDoctorRequest';
import HomeDoctorTracking from './HomeDoctorTracking';
import { useDeliveryServices } from '@/hooks/useDelivery';
import { useAuthStore } from '@/store/auth';

export default function HomeDoctorService() {
  const [activeTab, setActiveTab] = useState('request');
  const [trackingDeliveryId, setTrackingDeliveryId] = useState<string | null>(null);
  const { user } = useAuthStore();

  const { data: deliveries, isLoading } = useDeliveryServices(user?.id || '');

  // Filter for home consultation services
  const homeDoctorServices = deliveries?.filter(d => 
    d.serviceType === 'home_consultation'
  ) || [];

  const activeServices = homeDoctorServices.filter(d => 
    ['requested', 'assigned', 'in_transit', 'arrived', 'in_progress'].includes(d.status)
  );

  const completedServices = homeDoctorServices.filter(d => 
    ['completed', 'cancelled'].includes(d.status)
  );

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

  const getStatusMessage = (status: string) => {
    const messages = {
      requested: 'Buscando médico',
      assigned: 'Médico asignado',
      in_transit: 'En camino',
      arrived: 'Ha llegado',
      in_progress: 'En consulta',
      completed: 'Completado',
      cancelled: 'Cancelado'
    };
    return messages[status as keyof typeof messages] || status;
  };

  const handleRequestSuccess = (deliveryId: string) => {
    setTrackingDeliveryId(deliveryId);
    setActiveTab('tracking');
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Médico a Domicilio
        </h1>
        <p className="text-gray-600">
          Solicita un médico profesional que llegue directamente a tu hogar con seguimiento en tiempo real
        </p>
      </div>

      {/* Active Services Summary */}
      {activeServices.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Consultas Activas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeServices.map((service) => (
              <Card 
                key={service.id} 
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => {
                  setTrackingDeliveryId(service.id);
                  setActiveTab('tracking');
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Stethoscope className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-sm">
                        Consulta Médica
                      </span>
                    </div>
                    <Badge className={getStatusColor(service.status)}>
                      {getStatusMessage(service.status)}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">
                    {service.address.street}
                  </p>
                  
                  {service.estimatedArrival && service.status === 'in_transit' && (
                    <div className="flex items-center space-x-1 text-sm text-gray-500 mb-2">
                      <Clock className="h-4 w-4" />
                      <span>
                        Llega en {Math.round((new Date(service.estimatedArrival).getTime() - Date.now()) / (1000 * 60))} min
                      </span>
                    </div>
                  )}
                  
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-lg font-semibold text-green-600">
                      ${service.estimatedCost}
                    </span>
                    <Button variant="outline" size="sm">
                      <MapPin className="h-4 w-4 mr-1" />
                      Seguir
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
            <Stethoscope className="w-4 h-4" />
            Solicitar Médico
          </TabsTrigger>
          <TabsTrigger value="tracking" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Seguimiento
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="w-4 h-4" />
            Historial
          </TabsTrigger>
        </TabsList>

        <TabsContent value="request">
          <HomeDoctorRequest onRequestSuccess={handleRequestSuccess} />
        </TabsContent>

        <TabsContent value="tracking">
          {trackingDeliveryId ? (
            <HomeDoctorTracking deliveryId={trackingDeliveryId} />
          ) : activeServices.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Selecciona una consulta para hacer seguimiento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activeServices.map((service) => (
                    <Card 
                      key={service.id} 
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setTrackingDeliveryId(service.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Stethoscope className="h-5 w-5 text-blue-600" />
                            <div>
                              <p className="font-medium">Consulta Médica</p>
                              <p className="text-sm text-gray-600">{service.address.street}</p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(service.status)}>
                            {getStatusMessage(service.status)}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <Stethoscope className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No hay consultas activas para hacer seguimiento</p>
                <Button 
                  className="mt-4" 
                  onClick={() => setActiveTab('request')}
                >
                  Solicitar Médico a Domicilio
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Consultas</CardTitle>
            </CardHeader>
            <CardContent>
              {completedServices.length > 0 ? (
                <div className="space-y-4">
                  {completedServices.map((service) => (
                    <Card key={service.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Stethoscope className="h-5 w-5 text-gray-600" />
                            <div>
                              <p className="font-medium">Consulta Médica</p>
                              <p className="text-sm text-gray-600">
                                {new Date(service.createdAt).toLocaleDateString()} - {service.address.street}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={getStatusColor(service.status)}>
                              {getStatusMessage(service.status)}
                            </Badge>
                            <p className="text-sm text-gray-600 mt-1">
                              ${service.actualCost || service.estimatedCost}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No hay consultas en el historial</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}