import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { 
  Calendar as CalendarIcon, Clock, User, Video, Phone, 
  CheckCircle, AlertCircle, XCircle, MapPin, DollarSign,
  Settings, Plus, Edit, Eye, Filter, TrendingUp
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface SmartDoctorScheduleProps {
  doctorId: string;
}

export default function SmartDoctorSchedule({ doctorId }: SmartDoctorScheduleProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [viewMode, setViewMode] = useState('day');
  const navigate = useNavigate();

  // Datos mock mejorados
  const todayAppointments = [
    {
      id: '1',
      time: '09:00',
      duration: 30,
      patient: {
        name: 'Ana García',
        age: 34,
        phone: '+52 55 1234 5678',
        condition: 'Hipertensión - Control'
      },
      type: 'virtual',
      status: 'confirmed',
      fee: 150,
      notes: 'Revisión de presión arterial y ajuste de medicamento'
    },
    {
      id: '2',
      time: '09:30',
      duration: 45,
      patient: {
        name: 'Carlos Méndez',
        age: 45,
        phone: '+52 55 9876 5432',
        condition: 'Diabetes - Seguimiento'
      },
      type: 'in-person',
      status: 'in-progress',
      fee: 200,
      notes: 'Resultados de laboratorio pendientes de revisar'
    },
    {
      id: '3',
      time: '10:15',
      duration: 30,
      patient: {
        name: 'María López',
        age: 28,
        phone: '+52 55 5555 1234',
        condition: 'Primera consulta'
      },
      type: 'virtual',
      status: 'pending',
      fee: 150,
      notes: 'Paciente nueva, evaluación inicial'
    },
    {
      id: '4',
      time: '11:00',
      duration: 30,
      patient: {
        name: 'Pedro Sánchez',
        age: 52,
        phone: '+52 55 7777 8888',
        condition: 'Cardiología - Revisión'
      },
      type: 'virtual',
      status: 'confirmed',
      fee: 180,
      notes: 'Control post-procedimiento'
    }
  ];

  const weeklyStats = {
    totalAppointments: 42,
    completedAppointments: 38,
    revenue: 6800,
    averageRating: 4.8,
    noShows: 2,
    cancellations: 4
  };

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', 
    '11:00', '11:30', '12:00', '12:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30'
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'in-progress': return <Video className="h-4 w-4 text-blue-600" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-gray-600" />;
      case 'cancelled': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const handleAppointmentAction = (action: string, appointmentId: string) => {
    const appointment = todayAppointments.find(apt => apt.id === appointmentId);
    
    switch (action) {
      case 'start':
        if (appointment?.type === 'virtual') {
          toast.success('Iniciando videoconsulta...');
          navigate(`/consultations?appointment=${appointmentId}`);
        } else {
          toast.success('Iniciando consulta presencial...');
        }
        break;
      case 'complete':
        toast.success('Consulta completada');
        break;
      case 'reschedule':
        toast.info('Abriendo reagendamiento...');
        break;
      case 'cancel':
        toast.error('Cita cancelada');
        break;
      case 'call':
        toast.info(`Llamando a ${appointment?.patient.name}...`);
        break;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header con estadísticas de la semana */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Mi Agenda Médica</CardTitle>
              <p className="text-muted-foreground">
                Gestión inteligente de citas y horarios
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Configurar
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Cita
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="p-3 bg-white rounded-lg text-center">
              <CalendarIcon className="h-5 w-5 mx-auto text-blue-600 mb-1" />
              <p className="text-lg font-bold">{weeklyStats.totalAppointments}</p>
              <p className="text-xs text-muted-foreground">Citas esta semana</p>
            </div>
            <div className="p-3 bg-white rounded-lg text-center">
              <CheckCircle className="h-5 w-5 mx-auto text-green-600 mb-1" />
              <p className="text-lg font-bold">{weeklyStats.completedAppointments}</p>
              <p className="text-xs text-muted-foreground">Completadas</p>
            </div>
            <div className="p-3 bg-white rounded-lg text-center">
              <DollarSign className="h-5 w-5 mx-auto text-purple-600 mb-1" />
              <p className="text-lg font-bold">${weeklyStats.revenue.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Ingresos</p>
            </div>
            <div className="p-3 bg-white rounded-lg text-center">
              <TrendingUp className="h-5 w-5 mx-auto text-yellow-600 mb-1" />
              <p className="text-lg font-bold">{weeklyStats.averageRating}</p>
              <p className="text-xs text-muted-foreground">Rating promedio</p>
            </div>
            <div className="p-3 bg-white rounded-lg text-center">
              <XCircle className="h-5 w-5 mx-auto text-red-600 mb-1" />
              <p className="text-lg font-bold">{weeklyStats.noShows + weeklyStats.cancellations}</p>
              <p className="text-xs text-muted-foreground">Cancelaciones</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vista principal con calendario y citas */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendario lateral */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Calendario</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="w-full"
            />
            <div className="mt-4 space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Settings className="h-4 w-4 mr-2" />
                Horarios
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Panel principal de citas */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="today" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="today">Hoy</TabsTrigger>
              <TabsTrigger value="week">Semana</TabsTrigger>
              <TabsTrigger value="month">Mes</TabsTrigger>
              <TabsTrigger value="availability">Disponibilidad</TabsTrigger>
            </TabsList>

            <TabsContent value="today" className="mt-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      Agenda de Hoy • {selectedDate?.toLocaleDateString('es-MX', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </CardTitle>
                    <Badge variant="secondary">
                      {todayAppointments.length} citas programadas
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todayAppointments.map((appointment) => (
                      <Card key={appointment.id} className="border-l-4 border-l-blue-500">
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="flex items-center gap-1 text-lg font-semibold">
                                  <Clock className="h-4 w-4 text-muted-foreground" />
                                  {appointment.time} - {
                                    (() => {
                                      const [hours, minutes] = appointment.time.split(':').map(Number);
                                      const endTime = new Date();
                                      endTime.setHours(hours, minutes + appointment.duration);
                                      return endTime.toLocaleTimeString('es-MX', { 
                                        hour: '2-digit', 
                                        minute: '2-digit' 
                                      });
                                    })()
                                  }
                                </div>
                                <Badge className={getStatusColor(appointment.status)}>
                                  {getStatusIcon(appointment.status)}
                                  <span className="ml-1">{appointment.status.toUpperCase()}</span>
                                </Badge>
                                <Badge variant={appointment.type === 'virtual' ? 'default' : 'outline'}>
                                  {appointment.type === 'virtual' ? <Video className="h-3 w-3 mr-1" /> : <MapPin className="h-3 w-3 mr-1" />}
                                  {appointment.type === 'virtual' ? 'Virtual' : 'Presencial'}
                                </Badge>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold text-lg">{appointment.patient.name}</h4>
                                  <p className="text-sm text-muted-foreground">{appointment.patient.age} años</p>
                                  <p className="text-sm font-medium text-blue-600">{appointment.patient.condition}</p>
                                  <p className="text-xs text-muted-foreground mt-1">{appointment.notes}</p>
                                </div>
                                
                                <div className="flex flex-col justify-between">
                                  <div className="text-right">
                                    <p className="text-lg font-bold text-green-600">${appointment.fee}</p>
                                    <p className="text-xs text-muted-foreground">Tarifa de consulta</p>
                                  </div>
                                  
                                  <div className="flex gap-2 mt-3">
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleAppointmentAction('call', appointment.id)}
                                    >
                                      <Phone className="h-3 w-3" />
                                    </Button>
                                    
                                    {appointment.status === 'confirmed' && (
                                      <Button
                                        size="sm"
                                        onClick={() => handleAppointmentAction('start', appointment.id)}
                                        className="bg-gradient-to-r from-green-600 to-teal-600"
                                      >
                                        {appointment.type === 'virtual' ? <Video className="h-3 w-3 mr-1" /> : <User className="h-3 w-3 mr-1" />}
                                        Iniciar
                                      </Button>
                                    )}
                                    
                                    {appointment.status === 'in-progress' && (
                                      <Button
                                        size="sm"
                                        onClick={() => handleAppointmentAction('complete', appointment.id)}
                                      >
                                        <CheckCircle className="h-3 w-3 mr-1" />
                                        Completar
                                      </Button>
                                    )}
                                    
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleAppointmentAction('reschedule', appointment.id)}
                                    >
                                      <Edit className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="week" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Vista Semanal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium mb-4">
                    {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day) => (
                      <div key={day} className="py-2">{day}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 7 }, (_, i) => (
                      <div key={i} className="border rounded-lg p-2 h-32">
                        <div className="text-sm font-medium mb-1">{i + 15}</div>
                        <div className="space-y-1">
                          {i < 5 && (
                            <>
                              <div className="text-xs bg-blue-100 text-blue-800 p-1 rounded">
                                09:00 Consulta
                              </div>
                              <div className="text-xs bg-green-100 text-green-800 p-1 rounded">
                                11:00 Seguimiento
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="month" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Vista Mensual</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground py-8">
                    Vista de calendario mensual en desarrollo...
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="availability" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Configurar Disponibilidad</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Horarios de Trabajo</h4>
                      <div className="space-y-2">
                        {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].map((day) => (
                          <div key={day} className="flex items-center justify-between p-2 border rounded">
                            <span className="text-sm font-medium">{day}</span>
                            <div className="flex items-center gap-2 text-sm">
                              <span>08:00 - 12:00</span>
                              <span>14:00 - 18:00</span>
                              <Button size="sm" variant="ghost">
                                <Edit className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3">Tarifas por Tipo de Consulta</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm font-medium">Consulta General</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">$150 MXN</span>
                            <Button size="sm" variant="ghost">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm font-medium">Seguimiento</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">$100 MXN</span>
                            <Button size="sm" variant="ghost">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm font-medium">Especialidad</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">$200 MXN</span>
                            <Button size="sm" variant="ghost">
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}