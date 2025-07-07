import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar as CalendarIcon, Clock, Video, MapPin, User, Star,
  CheckCircle, AlertCircle, MessageCircle, Phone, ChevronRight,
  Filter, Search, Plus, Bell, Stethoscope
} from "lucide-react";

const upcomingAppointments = [
  {
    id: '1',
    doctor: 'Dr. María González',
    specialty: 'Cardiología',
    date: '2024-06-15',
    time: '10:30',
    type: 'virtual',
    status: 'confirmed',
    avatar: '👩‍⚕️',
    reason: 'Control rutinario',
    location: 'Videoconsulta'
  },
  {
    id: '2', 
    doctor: 'Dr. Carlos Ruiz',
    specialty: 'Dermatología',
    date: '2024-06-18',
    time: '14:15',
    type: 'presencial',
    status: 'pending',
    avatar: '👨‍⚕️',
    reason: 'Consulta de seguimiento',
    location: 'Clínica Central, Sala 205'
  },
  {
    id: '3',
    doctor: 'Dra. Ana Martín',
    specialty: 'Medicina General',
    date: '2024-06-22',
    time: '09:00',
    type: 'virtual',
    status: 'confirmed',
    avatar: '👩‍⚕️',
    reason: 'Revisión de análisis',
    location: 'Videoconsulta'
  }
];

const availableDoctors = [
  {
    id: '1',
    name: 'Dr. María González',
    specialty: 'Cardiología',
    rating: 4.9,
    reviews: 127,
    nextAvailable: '2024-06-20',
    avatar: '👩‍⚕️',
    price: '$150'
  },
  {
    id: '2',
    name: 'Dr. Carlos Ruiz', 
    specialty: 'Dermatología',
    rating: 4.8,
    reviews: 89,
    nextAvailable: '2024-06-19',
    avatar: '👨‍⚕️',
    price: '$120'
  },
  {
    id: '3',
    name: 'Dra. Ana Martín',
    specialty: 'Medicina General',
    rating: 4.9,
    reviews: 203,
    nextAvailable: '2024-06-17',
    avatar: '👩‍⚕️',
    price: '$100'
  }
];

export default function SmartAppointmentManager() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'virtual' ? <Video className="h-4 w-4" /> : <MapPin className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Header con estadísticas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Próxima Cita</p>
                <p className="text-2xl font-bold">Hoy</p>
                <p className="text-blue-100 text-xs">10:30 AM</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Citas Este Mes</p>
                <p className="text-2xl font-bold">5</p>
                <p className="text-green-100 text-xs">+2 vs mes anterior</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Videoconsultas</p>
                <p className="text-2xl font-bold">3</p>
                <p className="text-purple-100 text-xs">70% del total</p>
              </div>
              <Video className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Doctores</p>
                <p className="text-2xl font-bold">8</p>
                <p className="text-orange-100 text-xs">En tu network</p>
              </div>
              <Stethoscope className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upcoming">Próximas Citas</TabsTrigger>
          <TabsTrigger value="book">Agendar Nueva</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
          <TabsTrigger value="calendar">Calendario</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          {/* Filtros */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-4 items-center">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar por doctor o especialidad..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Lista de citas próximas */}
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <Card key={appointment.id} className="hover:shadow-lg transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                        {appointment.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{appointment.doctor}</h3>
                        <p className="text-blue-600 font-medium">{appointment.specialty}</p>
                        <p className="text-gray-600 text-sm">{appointment.reason}</p>
                        
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center text-sm text-gray-500">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            {new Date(appointment.date).toLocaleDateString('es-MX')}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            {appointment.time}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            {getTypeIcon(appointment.type)}
                            <span className="ml-1">{appointment.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right space-y-2">
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status === 'confirmed' ? 'Confirmada' : 
                         appointment.status === 'pending' ? 'Pendiente' : 'Cancelada'}
                      </Badge>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Chat
                        </Button>
                        {appointment.type === 'virtual' && (
                          <Button size="sm">
                            <Video className="h-4 w-4 mr-2" />
                            Unirse
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="book" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Formulario de búsqueda */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Buscar Doctor</CardTitle>
                <CardDescription>
                  Encuentra el especialista perfecto para ti
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Especialidad</label>
                  <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar especialidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardiologia">Cardiología</SelectItem>
                      <SelectItem value="dermatologia">Dermatología</SelectItem>
                      <SelectItem value="medicina-general">Medicina General</SelectItem>
                      <SelectItem value="neurologia">Neurología</SelectItem>
                      <SelectItem value="pediatria">Pediatría</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Fecha Preferida</label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Motivo de la Consulta</label>
                  <Textarea 
                    placeholder="Describe brevemente el motivo de tu consulta..."
                    className="min-h-[100px]"
                  />
                </div>

                <Button className="w-full">
                  <Search className="h-4 w-4 mr-2" />
                  Buscar Doctores
                </Button>
              </CardContent>
            </Card>

            {/* Lista de doctores disponibles */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Doctores Disponibles</h3>
                <Badge variant="outline">{availableDoctors.length} encontrados</Badge>
              </div>

              {availableDoctors.map((doctor) => (
                <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl">
                          {doctor.avatar}
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">{doctor.name}</h4>
                          <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                          
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium ml-1">{doctor.rating}</span>
                              <span className="text-sm text-gray-500 ml-1">({doctor.reviews} reseñas)</span>
                            </div>
                            <div className="text-sm text-gray-500">
                              Disponible: {new Date(doctor.nextAvailable).toLocaleDateString('es-MX')}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right space-y-2">
                        <div className="text-xl font-bold text-green-600">{doctor.price}</div>
                        <div className="space-y-2">
                          <Button size="sm" className="w-full">
                            <CalendarIcon className="h-4 w-4 mr-2" />
                            Agendar Cita
                          </Button>
                          <Button size="sm" variant="outline" className="w-full">
                            <User className="h-4 w-4 mr-2" />
                            Ver Perfil
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Citas</CardTitle>
              <CardDescription>
                Revisa tus consultas médicas anteriores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Historial de Citas
                </h3>
                <p className="text-gray-600 mb-4">
                  Aquí aparecerán todas tus citas pasadas con detalles completos
                </p>
                <Button variant="outline">
                  Ver Historial Completo
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vista de Calendario</CardTitle>
              <CardDescription>
                Visualiza todas tus citas en un calendario interactivo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border w-full max-w-md"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}