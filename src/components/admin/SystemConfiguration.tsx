
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useSystemConfig, useUpdateSystemConfig } from '@/hooks/useAdminManagement';
import { useToast } from '@/hooks/use-toast';
import { Settings, Save, Loader2 } from 'lucide-react';

const configSchema = z.object({
  consultationFee: z.number().min(0, 'La tarifa debe ser mayor a 0'),
  emergencyFee: z.number().min(0, 'La tarifa debe ser mayor a 0'),
  followUpFee: z.number().min(0, 'La tarifa debe ser mayor a 0'),
  businessHours: z.object({
    start: z.string(),
    end: z.string(),
  }),
  weekends: z.boolean(),
  maxAppointmentsPerDay: z.number().min(1, 'Debe ser al menos 1'),
  appointmentDuration: z.number().min(15, 'Mínimo 15 minutos'),
  taxRate: z.number().min(0).max(100, 'Debe estar entre 0 y 100'),
  companyInfo: z.object({
    name: z.string().min(1, 'El nombre es requerido'),
    address: z.string().min(1, 'La dirección es requerida'),
    phone: z.string().min(10, 'Teléfono inválido'),
    email: z.string().email('Email inválido'),
    website: z.string().url('URL inválida'),
  }),
});

type ConfigFormData = z.infer<typeof configSchema>;

export const SystemConfiguration = () => {
  const { toast } = useToast();
  const { data: config, isLoading } = useSystemConfig();
  const updateConfigMutation = useUpdateSystemConfig();

  const form = useForm<ConfigFormData>({
    resolver: zodResolver(configSchema),
    defaultValues: config,
  });

  // Actualizar valores del formulario cuando se carga la configuración
  React.useEffect(() => {
    if (config) {
      form.reset(config);
    }
  }, [config, form]);

  const onSubmit = async (data: ConfigFormData) => {
    try {
      await updateConfigMutation.mutateAsync(data);
      toast({
        title: 'Configuración actualizada',
        description: 'Los cambios han sido guardados exitosamente.',
      });
    } catch (error) {
      toast({
        title: 'Error al guardar',
        description: 'Hubo un problema al actualizar la configuración.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Configuración del Sistema</h2>
        <p className="text-muted-foreground">Configura las opciones generales de la clínica</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Tarifas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Tarifas de Consulta
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="consultationFee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Consulta General (MXN)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="emergencyFee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Consulta de Emergencia (MXN)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="followUpFee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Consulta de Seguimiento (MXN)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Horarios */}
          <Card>
            <CardHeader>
              <CardTitle>Horarios de Atención</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="businessHours.start"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hora de Inicio</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="businessHours.end"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hora de Fin</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="weekends"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Atención en Fines de Semana</FormLabel>
                      <div className="text-sm text-muted-foreground">
                        Permitir citas los sábados y domingos
                      </div>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Configuración de Citas */}
          <Card>
            <CardHeader>
              <CardTitle>Configuración de Citas</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="maxAppointmentsPerDay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Máximo de Citas por Día</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="appointmentDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duración de Cita (minutos)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Información de la Empresa */}
          <Card>
            <CardHeader>
              <CardTitle>Información de la Empresa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="companyInfo.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de la Clínica</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="companyInfo.address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dirección</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="companyInfo.phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="companyInfo.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="companyInfo.website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sitio Web</FormLabel>
                    <FormControl>
                      <Input type="url" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={updateConfigMutation.isPending}
          >
            {updateConfigMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Guardar Configuración
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};
