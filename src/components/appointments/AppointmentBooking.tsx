
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, Clock, User, Check, CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import type { Specialty } from '@/types';
import CountrySelector from '@/components/regional/CountrySelector';
import { APP_CONFIG } from '@/lib/constants';

const appointmentSchema = z.object({
  specialty: z.string().min(1, 'Selecciona una especialidad'),
  doctorId: z.string().min(1, 'Selecciona un doctor'),
  date: z.date({
    required_error: 'Selecciona una fecha',
  }),
  time: z.string().min(1, 'Selecciona una hora'),
  reason: z.string().min(10, 'Describe el motivo de la consulta (mínimo 10 caracteres)'),
  patientName: z.string().min(2, 'Nombre requerido'),
  patientPhone: z.string().min(10, 'Teléfono válido requerido'),
  patientEmail: z.string().email('Email válido requerido'),
  country: z.string().min(1, 'Selecciona tu país'),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

interface Doctor {
  id: string;
  name: string;
  specialty: Specialty;
  consultationFee: number;
  availability: string[];
}

const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. María González',
    specialty: 'general_medicine',
    consultationFee: 800,
    availability: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']
  },
  {
    id: '2',
    name: 'Dr. Carlos Hernández',
    specialty: 'cardiology',
    consultationFee: 1200,
    availability: ['08:00', '09:00', '10:00', '14:00', '15:00']
  },
  {
    id: '3',
    name: 'Dra. Ana Martínez',
    specialty: 'dermatology',
    consultationFee: 1000,
    availability: ['09:00', '11:00', '12:00', '15:00', '16:00', '17:00']
  },
  {
    id: '4',
    name: 'Dr. Luis Rodríguez',
    specialty: 'pediatrics',
    consultationFee: 900,
    availability: ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00']
  },
];

const specialties: { value: Specialty; label: string }[] = [
  { value: 'general_medicine', label: 'Medicina General' },
  { value: 'cardiology', label: 'Cardiología' },
  { value: 'dermatology', label: 'Dermatología' },
  { value: 'endocrinology', label: 'Endocrinología' },
  { value: 'gynecology', label: 'Ginecología' },
  { value: 'neurology', label: 'Neurología' },
  { value: 'pediatrics', label: 'Pediatría' },
  { value: 'psychiatry', label: 'Psiquiatría' },
];

interface AppointmentBookingProps {
  onClose?: () => void;
}

export default function AppointmentBooking({ onClose }: AppointmentBookingProps) {
  const [step, setStep] = useState<'form' | 'confirmation'>('form');
  const [confirmedAppointment, setConfirmedAppointment] = useState<any>(null);

  const getCurrencyByCountry = (country?: string) => {
    const selectedCountry = country || form.watch('country');
    return APP_CONFIG.currencies[selectedCountry as keyof typeof APP_CONFIG.currencies] || 'USD';
  };

  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      specialty: '',
      doctorId: '',
      reason: '',
      patientName: '',
      patientPhone: '',
      patientEmail: '',
      country: '',
    },
  });

  const selectedSpecialty = form.watch('specialty');
  const selectedDoctorId = form.watch('doctorId');
  const selectedDate = form.watch('date');

  const availableDoctors = mockDoctors.filter(
    doctor => doctor.specialty === selectedSpecialty
  );

  const selectedDoctor = mockDoctors.find(doctor => doctor.id === selectedDoctorId);

  const onSubmit = (data: AppointmentFormData) => {
    try {
      const appointment = {
        id: Date.now().toString(),
        ...data,
        doctor: selectedDoctor,
        status: 'scheduled',
        createdAt: new Date().toISOString(),
      };

      // Guardar en localStorage
      const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      existingAppointments.push(appointment);
      localStorage.setItem('appointments', JSON.stringify(existingAppointments));

      setConfirmedAppointment(appointment);
      setStep('confirmation');
      toast.success('¡Cita agendada exitosamente!');
    } catch (error) {
      toast.error('Error al agendar la cita');
    }
  };

  if (step === 'confirmation') {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-green-700">¡Cita Confirmada!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <div className="space-y-2">
            <p><strong>Doctor:</strong> {confirmedAppointment?.doctor?.name}</p>
            <p><strong>Fecha:</strong> {confirmedAppointment?.date && format(confirmedAppointment.date, 'dd/MM/yyyy', { locale: es })}</p>
            <p><strong>Hora:</strong> {confirmedAppointment?.time}</p>
            <p><strong>Costo:</strong> {getCurrencyByCountry()} {confirmedAppointment?.doctor?.consultationFee}</p>
          </div>
          <div className="pt-4 space-y-2">
            <Button onClick={() => {
              setStep('form');
              form.reset();
              setConfirmedAppointment(null);
            }} variant="outline" className="w-full">
              Agendar Otra Cita
            </Button>
            {onClose && (
              <Button onClick={onClose} className="w-full">
                Cerrar
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Agendar Nueva Cita
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Información del Paciente */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Información del Paciente</h3>
                
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>País</FormLabel>
                      <FormControl>
                        <CountrySelector
                          selectedCountry={field.value}
                          onCountryChange={field.onChange}
                          showEmergencyInfo={true}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="patientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Tu nombre completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="patientPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono</FormLabel>
                      <FormControl>
                        <Input placeholder="55 1234 5678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="patientEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="tu@email.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Información de la Cita */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Detalles de la Cita</h3>
                
                <FormField
                  control={form.control}
                  name="specialty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Especialidad</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una especialidad" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {specialties.map((specialty) => (
                            <SelectItem key={specialty.value} value={specialty.value}>
                              {specialty.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {selectedSpecialty && (
                  <FormField
                    control={form.control}
                    name="doctorId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Doctor</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un doctor" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableDoctors.map((doctor) => (
                              <SelectItem key={doctor.id} value={doctor.id}>
                                 <div className="flex items-center gap-2">
                                   <User className="h-4 w-4" />
                                   {doctor.name} - {getCurrencyByCountry()} {doctor.consultationFee}
                                 </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {selectedDoctorId && (
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Fecha</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP", { locale: es })
                                ) : (
                                  <span>Selecciona una fecha</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date() || date.getDay() === 0
                              }
                              initialFocus
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {selectedDate && selectedDoctor && (
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hora Disponible</FormLabel>
                        <div className="grid grid-cols-3 gap-2">
                          {selectedDoctor.availability.map((time) => (
                            <Button
                              key={time}
                              type="button"
                              variant={field.value === time ? "default" : "outline"}
                              size="sm"
                              onClick={() => field.onChange(time)}
                              className="flex items-center gap-1"
                            >
                              <Clock className="h-3 w-3" />
                              {time}
                            </Button>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>

            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Motivo de la consulta</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe brevemente el motivo de tu consulta..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
              {onClose && (
                <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                  Cancelar
                </Button>
              )}
              <Button 
                type="submit" 
                className="flex-1"
                disabled={!form.formState.isValid}
              >
                Confirmar Cita
                {selectedDoctor && ` - ${getCurrencyByCountry()} ${selectedDoctor.consultationFee}`}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
