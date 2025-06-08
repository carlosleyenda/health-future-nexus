
import React, { useState } from 'react';
import { Calendar, Clock, User, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAllDoctors, useDoctorsBySpecialty } from '@/hooks/useDoctor';
import { useAvailableSlots, useCreateAppointment } from '@/hooks/useAppointments';
import { useCreatePaymentIntent } from '@/hooks/usePayments';
import { toast } from 'sonner';

interface AppointmentBookingProps {
  patientId: string;
}

export default function AppointmentBooking({ patientId }: AppointmentBookingProps) {
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');

  const { data: allDoctors } = useAllDoctors();
  const { data: specialtyDoctors } = useDoctorsBySpecialty(selectedSpecialty);
  const { data: availableSlots } = useAvailableSlots(selectedDoctor, selectedDate);
  const createAppointment = useCreateAppointment();
  const createPaymentIntent = useCreatePaymentIntent();

  const specialties = [
    'general_medicine', 'cardiology', 'dermatology', 'endocrinology',
    'gynecology', 'neurology', 'pediatrics', 'psychiatry'
  ];

  const handleBookAppointment = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime || !reason) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    try {
      const appointmentDate = new Date(`${selectedDate}T${selectedTime}:00`).toISOString();
      
      const appointmentData = {
        patientId,
        doctorId: selectedDoctor,
        appointmentDate,
        duration: 30,
        type: 'virtual' as const,
        status: 'scheduled' as const,
        reason,
        totalCost: 800
      };

      const appointment = await createAppointment.mutateAsync(appointmentData);
      
      // Crear intención de pago
      await createPaymentIntent.mutateAsync({
        amount: appointment.totalCost,
        appointmentId: appointment.id
      });

      toast.success('Cita agendada correctamente');
    } catch (error) {
      toast.error('Error al agendar la cita');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Agendar Nueva Cita
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Selección de especialidad */}
          <div>
            <label className="block text-sm font-medium mb-2">Especialidad</label>
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una especialidad" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty.replace('_', ' ').toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Selección de médico */}
          {selectedSpecialty && (
            <div>
              <label className="block text-sm font-medium mb-2">Médico</label>
              <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un médico" />
                </SelectTrigger>
                <SelectContent>
                  {specialtyDoctors?.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Dr. {doctor.firstName} {doctor.lastName} - ${doctor.consultationFee}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Selección de fecha */}
          {selectedDoctor && (
            <div>
              <label className="block text-sm font-medium mb-2">Fecha</label>
              <input
                type="date"
                className="w-full p-2 border rounded-md"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          )}

          {/* Selección de hora */}
          {selectedDate && availableSlots && (
            <div>
              <label className="block text-sm font-medium mb-2">Hora Disponible</label>
              <div className="grid grid-cols-4 gap-2">
                {availableSlots.map((slot) => (
                  <Button
                    key={slot}
                    variant={selectedTime === slot ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTime(slot)}
                    className="flex items-center gap-1"
                  >
                    <Clock className="h-3 w-3" />
                    {slot}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Motivo de consulta */}
          <div>
            <label className="block text-sm font-medium mb-2">Motivo de la consulta</label>
            <textarea
              className="w-full p-2 border rounded-md"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Describe brevemente el motivo de tu consulta..."
            />
          </div>

          <Button 
            onClick={handleBookAppointment}
            disabled={!selectedDoctor || !selectedDate || !selectedTime || !reason}
            className="w-full flex items-center gap-2"
          >
            <CreditCard className="h-4 w-4" />
            Agendar Cita - $800 MXN
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
