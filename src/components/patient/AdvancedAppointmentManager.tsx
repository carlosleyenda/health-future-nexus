
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, Clock, Video, MapPin, Phone, MessageCircle,
  Plus, Search, Filter, Star, ChevronRight, Users,
  Smartphone, Heart, Brain, Eye, Bone, Baby, User,
  CheckCircle, AlertCircle, XCircle, RefreshCw
} from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function AdvancedAppointmentManager() {
  const [selectedView, setSelectedView] = useState('upcoming');
  const [searchTerm, setSearchTerm] = useState('');

  const appointments = [
    {
      id: 1,
      doctor: {
        name: 'Dr. María García',
        specialty: 'Cardiología',
        rating: 4.9,
        avatar: '/placeholder.svg',
        languages: ['Español', 'Inglés']
      },
      date: '2024-06-12',
      time: '10:30',
      type: 'virtual',
      status: 'confirmed',
      reason: 'Consulta de seguimiento - Hipertensión',
      duration: 30,
      cost: 150,
      insurance: 'Cubierto 80%',
      preparationTime: '15 min antes',
      documents: ['Análisis de sangre', 'ECG reciente']
    },
    {
      id: 2,
      doctor: {
        name: 'Dr. Carlos Ruiz',
        specialty: 'Medicina General',
        rating: 4.7,
        avatar: '/placeholder.svg',
        languages: ['Español']
      },
      date: '2024-06-15',
      time: '14:00',
      type: 'in_person',
      status: 'pending',
      reason: 'Chequeo general anual',
      duration: 45,
      cost: 120,
      insurance: 'Cubierto 100%',
      preparationTime: '30 min antes',
      documents: []
    },
    {
      id: 3,
      doctor: {
        name: 'Dra. Ana López',
        specialty: 'Dermatología',
        rating: 4.8,
        avatar: '/placeholder.svg',
        languages: ['Español', 'Francés']
      },
      date: '2024-06-20',
      time: '11:15',
      type: 'virtual',
      status: 'scheduled',
      reason: 'Revisión de lunares - Seguimiento',
      duration: 25,
      cost: 100,
      insurance: 'Cubierto 60%',
      preparationTime: '10 min antes',
      documents: ['Fotos de lunares']
    }
  ];

  const specialties = [
    { name: 'Cardiología', icon: Heart, available: 12, color: 'text-red-500' },
    { name: 'Neurología', icon: Brain, available: 8, color: 'text-purple-500' },
    { name: 'Oftalmología', icon: Eye, available: 15, color: 'text-blue-500' },
    { name: 'Traumatología', icon: Bone, available: 10, color: 'text-green-500' },
    { name: 'Pediatría', icon: Baby, available: 18, color: 'text-pink-500' },
    { name: 'Medicina General', icon: User, available: 25, color: 'text-gray-500' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'scheduled': return <Calendar className="h-4 w-4 text-blue-500" />;
      case 'cancelled': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmada';
      case 'pending': return 'Pendiente';
      case 'scheduled': return 'Programada';
      case 'cancelled': return 'Cancelada';
      default: return status;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'virtual': return <Video className="h-4 w-4 text-blue-500" />;
      case 'in_person': return <MapPin className="h-4 w-4 text-green-500" />;
      case 'phone': return <Phone className="h-4 w-4 text-purple-500" />;
      default: return <Calendar className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header con acciones rápidas */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Mis Citas Médicas</h2>
            <p className="text-blue-100">Gestiona todas tus consultas en un solo lugar</p>
          </div>
          <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row gap-3">
            <Button variant="secondary" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nueva Cita
            </Button>
            <Button variant="outline" className="flex items-center gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Calendar className="h-4 w-4" />
              Ver Calendario
            </Button>
          </div>
        </div>
      </div>

      {/* Búsqueda y filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por doctor, especialidad o fecha..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedView} onValueChange={setSelectedView}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upcoming">Próximas</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
          <TabsTrigger value="specialists">Especialistas</TabsTrigger>
          <TabsTrigger value="emergency">Urgencias</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {appointments.map((appointment) => (
            <Card key={appointment.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {appointment.doctor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{appointment.doctor.name}</h3>
                      <p className="text-gray-600">{appointment.doctor.specialty}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm ml-1">{appointment.doctor.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {appointment.doctor.languages.map((lang, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 lg:mt-0 text-right">
                    <div className="flex items-center justify-end space-x-2 mb-2">
                      {getStatusIcon(appointment.status)}
                      <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
                        {getStatusText(appointment.status)}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold">${appointment.cost}</div>
                    <div className="text-sm text-green-600">{appointment.insurance}</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="font-medium mb-2">{appointment.reason}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {new Date(appointment.date).toLocaleDateString('es-MX')}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-400" />
                      {appointment.time} ({appointment.duration}min)
                    </div>
                    <div className="flex items-center">
                      {getTypeIcon(appointment.type)}
                      <span className="ml-2">
                        {appointment.type === 'virtual' ? 'Virtual' : 
                         appointment.type === 'in_person' ? 'Presencial' : 'Teléfono'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Smartphone className="h-4 w-4 mr-2 text-gray-400" />
                      {appointment.preparationTime}
                    </div>
                  </div>
                </div>

                {appointment.documents.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Documentos requeridos:</p>
                    <div className="flex flex-wrap gap-2">
                      {appointment.documents.map((doc, index) => (
                        <Badge key={index} variant="outline">
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  {appointment.type === 'virtual' && appointment.status === 'confirmed' && (
                    <Button className="flex items-center gap-2">
                      <Video className="h-4 w-4" />
                      Unirse a Consulta
                    </Button>
                  )}
                  <Button variant="outline" className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Enviar Mensaje
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Reprogramar
                  </Button>
                  <Button variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="specialists" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {specialties.map((specialty, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-lg transition-all hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4`}>
                    <specialty.icon className={`h-8 w-8 ${specialty.color}`} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{specialty.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{specialty.available} doctores disponibles</p>
                  <Button variant="outline" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Agendar Cita
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="emergency" className="space-y-4">
          <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-700 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                Servicios de Emergencia
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white h-16">
                  <Phone className="h-6 w-6 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold">Llamada de Emergencia</div>
                    <div className="text-sm opacity-90">Disponible 24/7</div>
                  </div>
                </Button>
                <Button size="lg" variant="outline" className="border-red-300 text-red-700 hover:bg-red-50 h-16">
                  <Video className="h-6 w-6 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold">Consulta Virtual Urgente</div>
                    <div className="text-sm opacity-70">En menos de 15 min</div>
                  </div>
                </Button>
              </div>
              <div className="bg-white rounded-lg p-4 border border-red-200">
                <h4 className="font-semibold text-red-700 mb-2">¿Cuándo es una emergencia?</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Dolor en el pecho intenso</li>
                  <li>• Dificultad para respirar severa</li>
                  <li>• Pérdida de conciencia</li>
                  <li>• Hemorragia severa</li>
                  <li>• Síntomas de derrame cerebral</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
