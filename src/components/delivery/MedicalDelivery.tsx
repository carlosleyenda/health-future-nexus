import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useQuery, useMutation } from '@tanstack/react-query';
import { DeliveryService, DeliveryRequest } from '@/services/api/deliveryService';
import { useAuthStore } from '@/store/auth';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface MockDeliveryService {
  id: string;
  patientId: string;
  serviceType: string;
  scheduledDate: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  status: string;
}

export default function MedicalDelivery() {
  const [selectedService, setSelectedService] = useState<string>('');
  const [scheduledDate, setScheduledDate] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const { user } = useAuthStore();
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const { data: deliveries, isLoading } = useQuery({
    queryKey: ['delivery-services', user?.id],
    queryFn: () => DeliveryService.getDeliveryServices(user?.id || ''),
    enabled: !!user,
  });

  const requestDelivery = useMutation({
    mutationFn: (request: DeliveryRequest) => DeliveryService.requestDelivery(request),
    onSuccess: () => {
      toast.success('Servicio solicitado exitosamente');
      setSelectedService('');
      setScheduledDate('');
      setNotes('');
      setAddress('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedService || !scheduledDate || !address) return;

    requestDelivery.mutate({
      patientId: user.id,
      serviceType: selectedService,
      scheduledDate,
      address,
      notes,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Solicitar Servicio Médico a Domicilio</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="service">Tipo de Servicio</Label>
          <Select onValueChange={setSelectedService}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona un servicio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="home_consultation">Consulta Médica a Domicilio</SelectItem>
              <SelectItem value="nursing_care">Cuidado de Enfermería</SelectItem>
              <SelectItem value="medication_delivery">Entrega de Medicamentos</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="date">Fecha Programada</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Selecciona una fecha</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center" side="bottom">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) =>
                  date < new Date()
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Input
            type="hidden"
            name="scheduledDate"
            value={date ? date.toISOString() : ''}
            onChange={(e) => setScheduledDate(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="address">Dirección</Label>
          <Input
            type="text"
            id="address"
            placeholder="Calle, número, colonia"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="notes">Notas Adicionales</Label>
          <Textarea
            id="notes"
            placeholder="Indicaciones especiales para el personal médico"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full" disabled={requestDelivery.isPending}>
          {requestDelivery.isPending ? 'Solicitando...' : 'Solicitar Servicio'}
        </Button>
      </form>
      
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Servicios Activos</h3>
        {deliveries?.map((delivery) => (
          <Card key={delivery.id} className="mb-4">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{delivery.serviceType}</p>
                  <p className="text-sm text-gray-600">{delivery.address.street}</p>
                  <p className="text-sm text-gray-500">
                    Programado: {new Date(delivery.scheduledDate).toLocaleDateString()}
                  </p>
                </div>
                <Badge variant={delivery.status === 'completed' ? 'default' : 'secondary'}>
                  {delivery.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
