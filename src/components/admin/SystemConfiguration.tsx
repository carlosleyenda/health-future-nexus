import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const systemConfigSchema = z.object({
  consultationFee: z.number().min(0),
  emergencyFee: z.number().min(0),
  followUpFee: z.number().min(0),
  businessHours: z.object({
    start: z.string(),
    end: z.string()
  }),
  weekends: z.boolean(),
  maxAppointmentsPerDay: z.number().min(1),
  appointmentDuration: z.number().min(15).max(60),
  taxRate: z.number().min(0).max(100),
  companyInfo: z.object({
    name: z.string(),
    address: z.string(),
    phone: z.string(),
    email: z.string()
  })
});

interface SystemConfig {
  consultationFee: number;
  emergencyFee: number;
  followUpFee: number;
  businessHours: {
    start: string;
    end: string;
  };
  weekends: boolean;
  maxAppointmentsPerDay: number;
  appointmentDuration: number;
  taxRate: number;
  companyInfo: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
}

export default function SystemConfiguration() {
  const form = useForm<SystemConfig>({
    resolver: zodResolver(systemConfigSchema),
    defaultValues: {
      consultationFee: 500,
      emergencyFee: 1000,
      followUpFee: 300,
      businessHours: {
        start: '08:00',
        end: '18:00'
      },
      weekends: false,
      maxAppointmentsPerDay: 20,
      appointmentDuration: 30,
      taxRate: 16,
      companyInfo: {
        name: 'Clínica Virtual',
        address: 'Av. Principal 123, CDMX',
        phone: '+52 55 1234 5678',
        email: 'info@clinicavirtual.mx'
      }
    }
  });

  const onSubmit = (data: SystemConfig) => {
    console.log('Configuración guardada:', data);
    toast.success('Configuración actualizada correctamente');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configuración del Sistema</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="consultationFee">Tarifa de Consulta</Label>
              <Input type="number" id="consultationFee" placeholder="500" {...form.register('consultationFee', { valueAsNumber: true })} />
            </div>
            <div>
              <Label htmlFor="emergencyFee">Tarifa de Emergencia</Label>
              <Input type="number" id="emergencyFee" placeholder="1000" {...form.register('emergencyFee', { valueAsNumber: true })} />
            </div>
            <div>
              <Label htmlFor="followUpFee">Tarifa de Seguimiento</Label>
              <Input type="number" id="followUpFee" placeholder="300" {...form.register('followUpFee', { valueAsNumber: true })} />
            </div>
            <div>
              <Label htmlFor="taxRate">Tasa de Impuestos (%)</Label>
              <Input type="number" id="taxRate" placeholder="16" {...form.register('taxRate', { valueAsNumber: true })} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="businessHoursStart">Horario de Inicio</Label>
              <Input type="time" id="businessHoursStart" {...form.register('businessHours.start')} />
            </div>
            <div>
              <Label htmlFor="businessHoursEnd">Horario de Fin</Label>
              <Input type="time" id="businessHoursEnd" {...form.register('businessHours.end')} />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Label htmlFor="weekends">¿Abrir los fines de semana?</Label>
            <Switch id="weekends" {...form.register('weekends')} />
          </div>

          <div>
            <Label htmlFor="maxAppointmentsPerDay">Máximo de Citas por Día</Label>
            <Input type="number" id="maxAppointmentsPerDay" placeholder="20" {...form.register('maxAppointmentsPerDay', { valueAsNumber: true })} />
          </div>

          <div>
            <Label htmlFor="appointmentDuration">Duración de la Cita (minutos)</Label>
            <Input type="number" id="appointmentDuration" placeholder="30" {...form.register('appointmentDuration', { valueAsNumber: true })} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="companyName">Nombre de la Clínica</Label>
              <Input type="text" id="companyName" placeholder="Clínica Virtual" {...form.register('companyInfo.name')} />
            </div>
            <div>
              <Label htmlFor="companyPhone">Teléfono de la Clínica</Label>
              <Input type="text" id="companyPhone" placeholder="+52 55 1234 5678" {...form.register('companyInfo.phone')} />
            </div>
            <div>
              <Label htmlFor="companyAddress">Dirección de la Clínica</Label>
              <Input type="text" id="companyAddress" placeholder="Av. Principal 123, CDMX" {...form.register('companyInfo.address')} />
            </div>
            <div>
              <Label htmlFor="companyEmail">Email de la Clínica</Label>
              <Input type="email" id="companyEmail" placeholder="info@clinicavirtual.mx" {...form.register('companyInfo.email')} />
            </div>
          </div>

          <Button onClick={form.handleSubmit(onSubmit)}>Guardar Configuración</Button>
        </CardContent>
      </Card>
    </div>
  );
}
