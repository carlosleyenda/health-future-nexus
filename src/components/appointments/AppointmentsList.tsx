
import React from 'react';
import { Calendar, Clock, User, Video, MapPin, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { usePatientAppointments } from '@/hooks/useAppointments';
import { useCancelAppointment, useUpdateAppointment } from '@/hooks/useAppointments';
import { toast } from 'sonner';
import type { Appointment } from '@/lib/database';

interface AppointmentsListProps {
  patientId: string;
}

export default function AppointmentsList({ patientId }: AppointmentsListProps) {
  const { data: appointments, isLoading } = usePatientAppointments(patientId);
  const cancelAppointment = useCancelAppointment();
  const updateAppointment = useUpdateAppointment();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      await cancelAppointment.mutateAsync({
        appointmentId,
        reason: 'Cancelada por el paciente'
      });
      toast.success('Cita cancelada correctamente');
    } catch (error) {
      toast.error('Error al cancelar la cita');
    }
  };

  const handleJoinVideoCall = async (appointmentId: string) => {
    try {
      await updateAppointment.mutateAsync({
        id: appointmentId,
        updates: { status: 'in_progress' }
      });
      toast.success('Uniéndose a la consulta virtual...');
    } catch (error) {
      toast.error('Error al unirse a la consulta');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (!appointments?.length) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes citas programadas</h3>
          <p className="text-gray-500">Agenda tu primera consulta médica</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <Card key={appointment.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">
                  Dr. {appointment.doctor_id}
                </CardTitle>
                <p className="text-sm text-gray-500">{appointment.reason}</p>
              </div>
              <Badge className={getStatusColor(appointment.status)}>
                {appointment.status.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  {new Date(appointment.appointment_date).toLocaleDateString('es-MX')}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-gray-400" />
                  {new Date(appointment.appointment_date).toLocaleTimeString('es-MX', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
                <div className="flex items-center gap-1">
                  {appointment.type === 'virtual' ? (
                    <Video className="h-4 w-4 text-gray-400" />
                  ) : appointment.type === 'home_visit' ? (
                    <MapPin className="h-4 w-4 text-gray-400" />
                  ) : (
                    <User className="h-4 w-4 text-gray-400" />
                  )}
                  {appointment.type === 'virtual' ? 'Virtual' : 
                   appointment.type === 'home_visit' ? 'Domicilio' : 'Presencial'}
                </div>
              </div>

              <div className="flex gap-2">
                {appointment.status === 'confirmed' && appointment.type === 'virtual' && (
                  <Button 
                    size="sm" 
                    onClick={() => handleJoinVideoCall(appointment.id)}
                    className="flex items-center gap-1"
                  >
                    <Video className="h-3 w-3" />
                    Unirse a consulta
                  </Button>
                )}
                
                {appointment.status === 'scheduled' && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleCancelAppointment(appointment.id)}
                  >
                    Cancelar
                  </Button>
                )}

                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  Contactar
                </Button>
              </div>

              <div className="text-right">
                <span className="text-lg font-semibold">${appointment.total_cost} MXN</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
