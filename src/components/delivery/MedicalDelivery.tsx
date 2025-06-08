
import React, { useState } from 'react';
import { MapPin, Clock, User, Phone, Navigation, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDeliveryServices, useRequestDelivery } from '@/hooks/useDelivery';

interface MedicalDeliveryProps {
  patientId: string;
}

export default function MedicalDelivery({ patientId }: MedicalDeliveryProps) {
  const [selectedService, setSelectedService] = useState('');
  const { data: activeDeliveries } = useDeliveryServices(patientId);
  const requestDelivery = useRequestDelivery();

  const serviceTypes = [
    { value: 'home_consultation', label: 'Consulta a domicilio', icon: '🏠' },
    { value: 'lab_tests', label: 'Exámenes de laboratorio', icon: '🧪' },
    { value: 'medication_delivery', label: 'Entrega de medicamentos', icon: '💊' },
    { value: 'vaccination', label: 'Vacunación', icon: '💉' },
    { value: 'physiotherapy', label: 'Fisioterapia', icon: '🤸' },
    { value: 'nursing_care', label: 'Cuidados de enfermería', icon: '👩‍⚕️' },
  ];

  const handleRequestService = async () => {
    if (!selectedService) return;
    
    try {
      await requestDelivery.mutateAsync({
        patientId,
        serviceType: selectedService,
        scheduledDate: new Date().toISOString(),
        notes: ''
      });
    } catch (error) {
      console.error('Error requesting service:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'in_transit': return 'bg-purple-100 text-purple-800';
      case 'arrived': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Solicitar servicio médico a domicilio</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={selectedService} onValueChange={setSelectedService}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un servicio" />
            </SelectTrigger>
            <SelectContent>
              {serviceTypes.map((service) => (
                <SelectItem key={service.value} value={service.value}>
                  <div className="flex items-center gap-2">
                    <span>{service.icon}</span>
                    <span>{service.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            onClick={handleRequestService} 
            disabled={!selectedService || requestDelivery.isPending}
            className="w-full"
          >
            {requestDelivery.isPending ? 'Solicitando...' : 'Solicitar servicio'}
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Servicios activos</h3>
        
        {activeDeliveries?.length ? (
          activeDeliveries.map((delivery) => (
            <Card key={delivery.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">
                      {serviceTypes.find(s => s.value === delivery.serviceType)?.label}
                    </CardTitle>
                    <p className="text-sm text-gray-500">
                      Programado: {new Date(delivery.scheduledDate).toLocaleString('es-MX')}
                    </p>
                  </div>
                  <Badge className={getStatusColor(delivery.status)}>
                    {delivery.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {delivery.assignedStaff && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">
                        Asignado a: {delivery.assignedStaff.name}
                      </span>
                    </div>
                  )}

                  {delivery.currentLocation && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">
                        Ubicación actual disponible
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">
                      Tiempo estimado: {delivery.estimatedDuration} min
                    </span>
                  </div>

                  <div className="flex gap-2">
                    {delivery.status === 'assigned' && (
                      <Button size="sm" className="flex items-center gap-1">
                        <Navigation className="h-3 w-3" />
                        Rastrear
                      </Button>
                    )}
                    
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      Contactar
                    </Button>

                    {delivery.status === 'arrived' && (
                      <Button size="sm" variant="default" className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Confirmar llegada
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="text-center py-8">
              <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No hay servicios activos</h3>
              <p className="text-gray-500">Solicita un servicio médico a domicilio</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
