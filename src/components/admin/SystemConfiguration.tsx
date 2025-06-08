
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useSystemConfig, useUpdateSystemConfig } from '@/hooks/useAdminManagement';
import { toast } from 'sonner';

const systemConfigSchema = z.object({
  consultationFee: z.number().min(0, 'La tarifa debe ser mayor a 0'),
  emergencyFee: z.number().min(0, 'La tarifa de emergencia debe ser mayor a 0'),
  followUpFee: z.number().min(0, 'La tarifa de seguimiento debe ser mayor a 0'),
  businessHours: z.object({
    start: z.string().min(1, 'Hora de inicio es requerida'),
    end: z.string().min(1, 'Hora de fin es requerida'),
  }),
  weekends: z.boolean(),
  maxAppointmentsPerDay: z.number().min(1, 'Mínimo 1 cita por día'),
  appointmentDuration: z.number().min(15, 'Duración mínima 15 minutos'),
  taxRate: z.number().min(0).max(100, 'Tasa de impuesto debe estar entre 0 y 100'),
  companyInfo: z.object({
    name: z.string().min(1, 'Nombre de la empresa es requerido'),
    address: z.string().min(1, 'Dirección es requerida'),
    phone: z.string().min(1, 'Teléfono es requerido'),
    email: z.string().email('Email inválido'),
    website: z.string().url('URL inválida').optional().or(z.literal('')),
  }),
});

type SystemConfigFormData = z.infer<typeof systemConfigSchema>;

export default function SystemConfiguration() {
  const { data: config, isLoading } = useSystemConfig();
  const updateConfig = useUpdateSystemConfig();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<SystemConfigFormData>({
    resolver: zodResolver(systemConfigSchema),
  });

  React.useEffect(() => {
    if (config) {
      reset({
        consultationFee: config.consultationFee,
        emergencyFee: config.emergencyFee,
        followUpFee: config.followUpFee,
        businessHours: {
          start: config.businessHours.start,
          end: config.businessHours.end,
        },
        weekends: config.weekends,
        maxAppointmentsPerDay: config.maxAppointmentsPerDay,
        appointmentDuration: config.appointmentDuration,
        taxRate: config.taxRate,
        companyInfo: {
          name: config.companyInfo.name,
          address: config.companyInfo.address,
          phone: config.companyInfo.phone,
          email: config.companyInfo.email,
          website: config.companyInfo.website,
        },
      });
    }
  }, [config, reset]);

  const onSubmit = (data: SystemConfigFormData) => {
    updateConfig.mutate(data, {
      onSuccess: () => {
        toast.success('Configuración actualizada exitosamente');
      },
      onError: () => {
        toast.error('Error al actualizar configuración');
      },
    });
  };

  if (isLoading) {
    return <div>Cargando configuración...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configuración del Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Tarifas */}
            <div>
              <h3 className="text-lg font-medium mb-4">Tarifas</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="consultationFee">Consulta General (MXN)</Label>
                  <Input
                    id="consultationFee"
                    type="number"
                    {...register('consultationFee', { valueAsNumber: true })}
                    className={errors.consultationFee ? 'border-red-500' : ''}
                  />
                  {errors.consultationFee && (
                    <p className="text-red-500 text-sm mt-1">{errors.consultationFee.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="emergencyFee">Emergencia (MXN)</Label>
                  <Input
                    id="emergencyFee"
                    type="number"
                    {...register('emergencyFee', { valueAsNumber: true })}
                    className={errors.emergencyFee ? 'border-red-500' : ''}
                  />
                  {errors.emergencyFee && (
                    <p className="text-red-500 text-sm mt-1">{errors.emergencyFee.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="followUpFee">Seguimiento (MXN)</Label>
                  <Input
                    id="followUpFee"
                    type="number"
                    {...register('followUpFee', { valueAsNumber: true })}
                    className={errors.followUpFee ? 'border-red-500' : ''}
                  />
                  {errors.followUpFee && (
                    <p className="text-red-500 text-sm mt-1">{errors.followUpFee.message}</p>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Horarios */}
            <div>
              <h3 className="text-lg font-medium mb-4">Horarios de Operación</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="startTime">Hora de Inicio</Label>
                  <Input
                    id="startTime"
                    type="time"
                    {...register('businessHours.start')}
                    className={errors.businessHours?.start ? 'border-red-500' : ''}
                  />
                  {errors.businessHours?.start && (
                    <p className="text-red-500 text-sm mt-1">{errors.businessHours.start.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="endTime">Hora de Fin</Label>
                  <Input
                    id="endTime"
                    type="time"
                    {...register('businessHours.end')}
                    className={errors.businessHours?.end ? 'border-red-500' : ''}
                  />
                  {errors.businessHours?.end && (
                    <p className="text-red-500 text-sm mt-1">{errors.businessHours.end.message}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="weekends"
                  checked={watch('weekends')}
                  onCheckedChange={(checked) => setValue('weekends', checked)}
                />
                <Label htmlFor="weekends">Atender fines de semana</Label>
              </div>
            </div>

            <Separator />

            {/* Configuración de Citas */}
            <div>
              <h3 className="text-lg font-medium mb-4">Configuración de Citas</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="maxAppointmentsPerDay">Máximo de Citas por Día</Label>
                  <Input
                    id="maxAppointmentsPerDay"
                    type="number"
                    {...register('maxAppointmentsPerDay', { valueAsNumber: true })}
                    className={errors.maxAppointmentsPerDay ? 'border-red-500' : ''}
                  />
                  {errors.maxAppointmentsPerDay && (
                    <p className="text-red-500 text-sm mt-1">{errors.maxAppointmentsPerDay.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="appointmentDuration">Duración de Cita (minutos)</Label>
                  <Input
                    id="appointmentDuration"
                    type="number"
                    {...register('appointmentDuration', { valueAsNumber: true })}
                    className={errors.appointmentDuration ? 'border-red-500' : ''}
                  />
                  {errors.appointmentDuration && (
                    <p className="text-red-500 text-sm mt-1">{errors.appointmentDuration.message}</p>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Información de la Empresa */}
            <div>
              <h3 className="text-lg font-medium mb-4">Información de la Empresa</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Nombre de la Empresa</Label>
                  <Input
                    id="companyName"
                    {...register('companyInfo.name')}
                    className={errors.companyInfo?.name ? 'border-red-500' : ''}
                  />
                  {errors.companyInfo?.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.companyInfo.name.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="companyAddress">Dirección</Label>
                  <Input
                    id="companyAddress"
                    {...register('companyInfo.address')}
                    className={errors.companyInfo?.address ? 'border-red-500' : ''}
                  />
                  {errors.companyInfo?.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.companyInfo.address.message}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyPhone">Teléfono</Label>
                    <Input
                      id="companyPhone"
                      {...register('companyInfo.phone')}
                      className={errors.companyInfo?.phone ? 'border-red-500' : ''}
                    />
                    {errors.companyInfo?.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.companyInfo.phone.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="companyEmail">Email</Label>
                    <Input
                      id="companyEmail"
                      type="email"
                      {...register('companyInfo.email')}
                      className={errors.companyInfo?.email ? 'border-red-500' : ''}
                    />
                    {errors.companyInfo?.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.companyInfo.email.message}</p>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="companyWebsite">Sitio Web</Label>
                  <Input
                    id="companyWebsite"
                    {...register('companyInfo.website')}
                    placeholder="https://ejemplo.com"
                  />
                </div>
                <div>
                  <Label htmlFor="taxRate">Tasa de Impuesto (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    step="0.01"
                    {...register('taxRate', { valueAsNumber: true })}
                    className={errors.taxRate ? 'border-red-500' : ''}
                  />
                  {errors.taxRate && (
                    <p className="text-red-500 text-sm mt-1">{errors.taxRate.message}</p>
                  )}
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={updateConfig.isPending}
            >
              {updateConfig.isPending ? 'Guardando...' : 'Guardar Configuración'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
