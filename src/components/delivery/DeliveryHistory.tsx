
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Clock, Truck, Star } from 'lucide-react';
import { useDeliveryServices, useRateService } from '@/hooks/useDelivery';
import { useAuthStore } from '@/store/auth';

export default function DeliveryHistory() {
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const { user } = useAuthStore();
  const { data: deliveries } = useDeliveryServices(user?.id || '');
  const rateService = useRateService();

  const completedDeliveries = deliveries?.filter(d => 
    ['completed', 'cancelled'].includes(d.status)
  ) || [];

  const filteredDeliveries = completedDeliveries.filter(delivery => {
    const matchesFilter = filter === '' || 
      getServiceName(delivery.serviceType).toLowerCase().includes(filter.toLowerCase()) ||
      delivery.address.street.toLowerCase().includes(filter.toLowerCase());
    
    const matchesStatus = statusFilter === '' || delivery.status === statusFilter;
    
    return matchesFilter && matchesStatus;
  });

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
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const handleRating = (deliveryId: string, stars: number) => {
    setRating(stars);
    rateService.mutate({ deliveryId, rating: stars, feedback });
  };

  const renderStarRating = (currentRating: number, onRate?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 cursor-pointer ${
              star <= currentRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
            onClick={() => onRate && onRate(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" />
            Historial de Servicios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Buscar por servicio o dirección..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <Select onValueChange={setStatusFilter} value={statusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos los estados</SelectItem>
                <SelectItem value="completed">Completados</SelectItem>
                <SelectItem value="cancelled">Cancelados</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Delivery History List */}
      <div className="space-y-4">
        {filteredDeliveries.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Clock className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No hay servicios completados</p>
            </CardContent>
          </Card>
        ) : (
          filteredDeliveries.map((delivery) => (
            <Card key={delivery.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Truck className="h-5 w-5 text-gray-400" />
                      <h3 className="font-semibold">
                        {getServiceName(delivery.serviceType)}
                      </h3>
                      <Badge className={getStatusColor(delivery.status)}>
                        {delivery.status === 'completed' ? 'Completado' : 'Cancelado'}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-2">{delivery.address.street}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
                      <div>
                        <span className="font-medium">Fecha:</span>
                        <p>{new Date(delivery.scheduledDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="font-medium">Costo:</span>
                        <p className="text-green-600 font-semibold">
                          ${delivery.actualCost || delivery.estimatedCost}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium">Calificación:</span>
                        {delivery.rating ? (
                          renderStarRating(delivery.rating)
                        ) : delivery.status === 'completed' ? (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="mt-1">
                                Calificar
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Calificar Servicio</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <label className="text-sm font-medium mb-2 block">
                                    ¿Cómo calificarías este servicio?
                                  </label>
                                  {renderStarRating(rating, setRating)}
                                </div>
                                <div>
                                  <label className="text-sm font-medium mb-2 block">
                                    Comentarios (opcional)
                                  </label>
                                  <Textarea
                                    placeholder="Comparte tu experiencia..."
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                  />
                                </div>
                                <Button
                                  onClick={() => handleRating(delivery.id, rating)}
                                  disabled={rating === 0}
                                  className="w-full"
                                >
                                  Enviar Calificación
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        ) : (
                          <span className="text-gray-400">No disponible</span>
                        )}
                      </div>
                    </div>

                    {delivery.notes && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">{delivery.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Summary Stats */}
      {completedDeliveries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Resumen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {completedDeliveries.filter(d => d.status === 'completed').length}
                </p>
                <p className="text-sm text-gray-500">Servicios Completados</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  ${completedDeliveries.reduce((total, d) => 
                    total + (d.actualCost || d.estimatedCost), 0
                  )}
                </p>
                <p className="text-sm text-gray-500">Total Gastado</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {(completedDeliveries
                    .filter(d => d.rating)
                    .reduce((sum, d) => sum + (d.rating || 0), 0) /
                    completedDeliveries.filter(d => d.rating).length || 0
                  ).toFixed(1)}
                </p>
                <p className="text-sm text-gray-500">Calificación Promedio</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
