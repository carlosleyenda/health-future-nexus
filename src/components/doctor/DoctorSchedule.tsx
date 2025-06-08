
import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Video } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDoctorAppointments, useUpdateAppointment } from '@/hooks/useAppointments';
import { useDoctorPatients } from '@/hooks/useDoctor';
import { toast } from 'sonner';

interface DoctorScheduleProps {
  doctorId: string;
}

export default function DoctorSchedule({ doctorId }: DoctorScheduleProps) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const { data: appointments } = useDoctorAppointments(doctorId);
  const { data: patients } = useDoctorPatients(doctorId);
  const updateAppointment = useUpdateAppointment();

  const todayAppointments = appointments?.filter(apt => 
    new Date(apt.appointmentDate).toDateString() === new Date(selectedDate).toDateString()
  ) || [];

  const upcomingAppointments = appointments?.filter(apt => 
    new Date(apt.appointmentDate) > new Date() && apt.status !== 'cancelled'
  ) || [];

  const handleStartConsultation = async (appointmentId: string) => {
    try {
      await updateAppointment.mutateAsync({
        appointmentId,
        updates: { status: 'in_progress' }
      });
      toast.success('Consulta iniciada');
    } catch (error) {
      toast.error('Error al iniciar la consulta');
    }
  };

  const handleCompleteConsultation = async (appointmentId: string) => {
    try {
      await updateAppointment.mutateAsync({
        appointmentId,
        updates: { status: 'completed' }
      });
      toast.success('Consulta completada');
    } catch (error) {
      toast.error('Error al completar la consulta');
    }
  };

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

  return (
    <div className="space-y-6">
      <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="today">Hoy</TabsTrigger>
          <TabsTrigger value="upcoming">Próximas</TabsTrigger>
          <TabsTrigger value="patients">Pacientes</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          <div className="flex items-center gap-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border rounded-md"
            />
            <span className="text-sm text-gray-500">
              {todayAppointments.length} citas programadas
            </span>
          </div>

          {todayAppointments.length ? (
            <div className="space-y-4">
              {todayAppointments
                .sort((a, b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime())
                .map((appointment) => (
                <Card key={appointment.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <User className="h-5 w-5" />
                          Paciente {appointment.patientId} {/* Aquí necesitaríamos el nombre real */}
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
                          <Clock className="h-4 w-4 text-gray-400" />
                          {new Date(appointment.appointmentDate).toLocaleTimeString('es-MX', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          {appointment.type === 'virtual' ? (
                            <Video className="h-4 w-4 text-gray-400" />
                          ) : (
                            <User className="h-4 w-4 text-gray-400" />
                          )}
                          {appointment.type === 'virtual' ? 'Virtual' : 'Presencial'}
                        </div>
                        <span className="font-medium">${appointment.totalCost} MXN</span>
                      </div>

                      <div className="flex gap-2">
                        {appointment.status === 'confirmed' && (
                          <Button 
                            size="sm" 
                            onClick={() => handleStartConsultation(appointment.id)}
                            className="flex items-center gap-1"
                          >
                            <Video className="h-3 w-3" />
                            Iniciar Consulta
                          </Button>
                        )}
                        
                        {appointment.status === 'in_progress' && (
                          <Button 
                            size="sm" 
                            onClick={() => handleCompleteConsultation(appointment.id)}
                            className="flex items-center gap-1"
                          >
                            Completar Consulta
                          </Button>
                        )}

                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          Contactar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay citas para esta fecha</h3>
                <p className="text-gray-500">Tu agenda está libre para {new Date(selectedDate).toLocaleDateString('es-MX')}</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingAppointments.length ? (
            upcomingAppointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Paciente {appointment.patientId}</h3>
                      <p className="text-sm text-gray-500">{appointment.reason}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <span>{new Date(appointment.appointmentDate).toLocaleDateString('es-MX')}</span>
                        <span>{new Date(appointment.appointmentDate).toLocaleTimeString('es-MX', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</span>
                        <span>{appointment.type === 'virtual' ? 'Virtual' : 'Presencial'}</span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(appointment.status)}>
                      {appointment.status.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No hay citas próximas</h3>
                <p className="text-gray-500">Tu agenda próxima está vacía</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="patients" className="space-y-4">
          {patients?.length ? (
            <div className="grid gap-4">
              {patients.map((patient) => (
                <Card key={patient.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <User className="h-8 w-8 text-gray-400" />
                      <div>
                        <h3 className="font-medium">{patient.firstName} {patient.lastName}</h3>
                        <p className="text-sm text-gray-500">{patient.email}</p>
                        <p className="text-xs text-gray-400">
                          Última consulta: {/* Aquí calcularíamos la última cita */}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <User className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Sin pacientes</h3>
                <p className="text-gray-500">Tus pacientes aparecerán aquí después de las consultas</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
