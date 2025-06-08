import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Truck, Clock, Map } from 'lucide-react';
import { useRequestDelivery } from '@/hooks/useDelivery';
import { useAuthStore } from '@/store/auth';

export default function DeliveryRequestForm() {
  const [serviceType, setServiceType] = useState('');
  const [scheduledDate, setScheduledDate] = useState<Date>();
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [priority, setPriority] = useState('normal');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const { user } = useAuthStore();
  const requestDelivery = useRequestDelivery();

  const serviceTypes = [
    {
      value: 'medication_delivery',
      label: 'Entrega de Medicamentos',
      description: 'Medicamentos con receta médica',
      estimatedTime: '30-60 min',
      price: 50
    },
    {
      value: 'sample_collection',
      label: 'Toma de Muestras',
      description: 'Análisis de sangre, orina, etc.',
      estimatedTime: '1-2 horas',
      price: 200
    },
    {
      value: 'home_consultation',
      label: 'Consulta a Domicilio',
      description: 'Médico general en tu hogar',
      estimatedTime: '2-4 horas',
      price: 800
    },
    {
      value: 'nursing_care',
      label: 'Cuidado de Enfermería',
      description: 'Aplicación de inyecciones, curaciones',
      estimatedTime: '1-2 horas',
      price: 600
    },
    {
      value: 'medical_equipment',
      label: 'Equipo Médico',
      description: 'Renta y entrega de equipo',
      estimatedTime: '2-3 horas',
      price: 300
    },
    {
      value: 'oxygen_delivery',
      label: 'Entrega de Oxígeno',
      description: 'Tanques y concentradores',
      estimatedTime: '1-2 horas',
      price: 400
    },
    {
      value: 'emergency_care',
      label: 'Atención de Emergencia',
      description: 'Atención médica urgente',
      estimatedTime: '15-30 min',
      price: 1500
    }
  ];

  const selectedService = serviceTypes.find(s => s.value === serviceType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !serviceType || !scheduledDate || !address) {
      return;
    }

    requestDelivery.mutate({
      patientId: user.id,
      serviceType,
      scheduledDate: scheduledDate.toISOString(),
      address,
      notes,
      priority,
      specialInstructions
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5 text-blue-600" />
          Solicitar Servicio Médico a Domicilio
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Type Selection */}
          <div>
            <Label htmlFor="serviceType">Tipo de Servicio</Label>
            <Select onValueChange={setServiceType} value={serviceType}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un servicio" />
              </SelectTrigger>
              <SelectContent>
                {serviceTypes.map((service) => (
                  <SelectItem key={service.value} value={service.value}>
                    <div className="flex flex-col">
                      <span className="font-medium">{service.label}</span>
                      <span className="text-sm text-gray-500">{service.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Service Details */}
          {selectedService && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Truck className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">Precio estimado</p>
                      <p className="text-lg font-bold text-green-600">${selectedService.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">Tiempo estimado</p>
                      <p className="text-sm text-gray-600">{selectedService.estimatedTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Map className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium">Disponibilidad</p>
                      <Badge variant="outline" className="text-green-600">24/7</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Fecha y Hora</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !scheduledDate && "text-muted-foreground"
                    )}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    {scheduledDate ? format(scheduledDate, "PPP p") : "Selecciona fecha y hora"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={scheduledDate}
                    onSelect={setScheduledDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label htmlFor="priority">Prioridad</Label>
              <Select onValueChange={setPriority} value={priority}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baja</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="urgent">Urgente</SelectItem>
                  <SelectItem value="emergency">Emergencia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="address">Dirección Completa</Label>
            <Input
              id="address"
              placeholder="Calle, número, colonia, ciudad"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          {/* Special Instructions */}
          <div>
            <Label htmlFor="specialInstructions">Instrucciones Especiales</Label>
            <Textarea
              id="specialInstructions"
              placeholder="Indicaciones de acceso, alergias, etc."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
            />
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Notas Adicionales</Label>
            <Textarea
              id="notes"
              placeholder="Información adicional relevante"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={requestDelivery.isPending || !serviceType || !scheduledDate || !address}
          >
            {requestDelivery.isPending ? 'Solicitando...' : 'Solicitar Servicio'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
