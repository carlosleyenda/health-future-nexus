import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Bell, Calendar, Clock, DollarSign, TrendingUp, Users,
  MessageSquare, Star, Award, Target, Briefcase,
  AlertCircle, CheckCircle, Eye, ArrowUp
} from 'lucide-react';

const mockConsultationRequests = [
  {
    id: '1',
    patientName: 'María López',
    age: 34,
    issue: 'Dolor de pecho y dificultad para respirar',
    urgency: 'Alta',
    requestedTime: 'Hoy 15:30',
    consultationType: 'Video',
    estimatedDuration: '30 min',
    offerredPrice: 85,
    status: 'Pendiente'
  },
  {
    id: '2',
    patientName: 'Carlos Mendoza',
    age: 45,
    issue: 'Seguimiento post-operatorio',
    urgency: 'Media',
    requestedTime: 'Mañana 10:00',
    consultationType: 'Presencial',
    estimatedDuration: '45 min',
    offerredPrice: 120,
    status: 'Pendiente'
  },
  {
    id: '3',
    patientName: 'Ana García',
    age: 28,
    issue: 'Consulta de rutina - chequeo general',
    urgency: 'Baja',
    requestedTime: 'Próxima semana',
    consultationType: 'Video',
    estimatedDuration: '20 min',
    offerredPrice: 65,
    status: 'Pendiente'
  }
];

const specialtyOpportunities = [
  {
    id: '1',
    specialty: 'Cardiología Intervencionista',
    demand: 'Muy Alta',
    avgPrice: 150,
    monthlyRequests: 245,
    competition: 'Baja',
    earning: '+40%'
  },
  {
    id: '2',
    specialty: 'Neurología Pediátrica',
    demand: 'Alta',
    avgPrice: 120,
    monthlyRequests: 180,
    competition: 'Media',
    earning: '+25%'
  },
  {
    id: '3',
    specialty: 'Dermatología Cosmética',
    demand: 'Alta',
    avgPrice: 95,
    monthlyRequests: 320,
    competition: 'Alta',
    earning: '+15%'
  }
];

export default function DoctorMarketplace() {
  const [filter, setFilter] = useState('Todos');
  const [urgencyFilter, setUrgencyFilter] = useState('Todas');

  const filteredRequests = mockConsultationRequests.filter(request => {
    const matchesFilter = filter === 'Todos' || request.status === filter;
    const matchesUrgency = urgencyFilter === 'Todas' || request.urgency === urgencyFilter;
    return matchesFilter && matchesUrgency;
  });

  const handleAcceptRequest = (requestId: string) => {
    console.log(`Aceptando solicitud ${requestId}`);
  };

  const handleViewDetails = (requestId: string) => {
    console.log(`Viendo detalles de solicitud ${requestId}`);
  };

  const handleApplySpecialty = (specialty: string) => {
    console.log(`Aplicando como especialista en ${specialty}`);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Alta': return 'bg-red-100 text-red-800 border-red-200';
      case 'Media': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Baja': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                Centro de Oportunidades Médicas
              </h1>
              <p className="text-lg text-purple-100">
                Gestiona solicitudes de consultas y expande tu práctica profesional
              </p>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm">
              <div className="bg-white/10 px-4 py-2 rounded-lg text-center">
                <div className="font-bold text-xl">12</div>
                <div className="text-purple-200">Solicitudes hoy</div>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-lg text-center">
                <div className="font-bold text-xl">$2,340</div>
                <div className="text-purple-200">Ingresos potenciales</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estadísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Solicitudes Pendientes</p>
                  <p className="text-2xl font-bold text-red-600">{filteredRequests.length}</p>
                </div>
                <Bell className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Ingresos Este Mes</p>
                  <p className="text-2xl font-bold text-green-600">$8,450</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pacientes Atendidos</p>
                  <p className="text-2xl font-bold text-blue-600">143</p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rating Promedio</p>
                  <p className="text-2xl font-bold text-yellow-600">4.8</p>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-full lg:w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos">Todas las solicitudes</SelectItem>
                  <SelectItem value="Pendiente">Pendientes</SelectItem>
                  <SelectItem value="Aceptada">Aceptadas</SelectItem>
                  <SelectItem value="Completada">Completadas</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todas">Todas las urgencias</SelectItem>
                  <SelectItem value="Alta">Urgencia alta</SelectItem>
                  <SelectItem value="Media">Urgencia media</SelectItem>
                  <SelectItem value="Baja">Urgencia baja</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Solicitudes de Consulta */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <MessageSquare className="h-6 w-6" />
            Solicitudes de Consulta ({filteredRequests.length})
          </h2>
          
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <Card key={request.id} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{request.patientName}</h3>
                          <p className="text-sm text-gray-600">{request.age} años</p>
                        </div>
                        <Badge className={getUrgencyColor(request.urgency)}>
                          Urgencia {request.urgency}
                        </Badge>
                        <Badge variant="outline" className="ml-auto">
                          {request.consultationType}
                        </Badge>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-800 font-medium">Motivo de consulta:</p>
                        <p className="text-gray-700">{request.issue}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-blue-500" />
                          <span>{request.requestedTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-purple-500" />
                          <span>{request.estimatedDuration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-green-500" />
                          <span className="font-semibold">${request.offerredPrice}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {request.status === 'Pendiente' ? (
                            <AlertCircle className="h-4 w-4 text-orange-500" />
                          ) : (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                          <span>{request.status}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-6">
                      <Button 
                        onClick={() => handleViewDetails(request.id)}
                        variant="outline"
                        size="sm"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Ver Detalles
                      </Button>
                      {request.status === 'Pendiente' && (
                        <Button 
                          onClick={() => handleAcceptRequest(request.id)}
                          className="bg-green-600 hover:bg-green-700"
                          size="sm"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Aceptar
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Oportunidades de Especialización */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Target className="h-6 w-6" />
            Oportunidades de Especialización
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialtyOpportunities.map((opportunity) => (
              <Card key={opportunity.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{opportunity.specialty}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge 
                      className={`${
                        opportunity.demand === 'Muy Alta' ? 'bg-red-100 text-red-800' :
                        opportunity.demand === 'Alta' ? 'bg-orange-100 text-orange-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      Demanda {opportunity.demand}
                    </Badge>
                    <Badge className="bg-green-100 text-green-800">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      {opportunity.earning}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Precio promedio</p>
                      <p className="font-bold text-green-600">${opportunity.avgPrice}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Solicitudes/mes</p>
                      <p className="font-bold text-blue-600">{opportunity.monthlyRequests}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Competencia</p>
                      <Badge 
                        variant="outline"
                        className={`${
                          opportunity.competition === 'Baja' ? 'border-green-300 text-green-700' :
                          opportunity.competition === 'Media' ? 'border-yellow-300 text-yellow-700' :
                          'border-red-300 text-red-700'
                        }`}
                      >
                        {opportunity.competition}
                      </Badge>
                    </div>
                    <Button 
                      onClick={() => handleApplySpecialty(opportunity.specialty)}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Briefcase className="h-4 w-4 mr-1" />
                      Aplicar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA para mejorar perfil */}
        <Card className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50">
          <CardContent className="p-8 text-center">
            <div className="max-w-2xl mx-auto space-y-4">
              <Award className="h-12 w-12 text-blue-600 mx-auto" />
              <h3 className="text-2xl font-bold text-gray-900">
                Mejora tu Perfil Profesional
              </h3>
              <p className="text-gray-600">
                Doctores con perfiles completos y verificados reciben 3x más solicitudes 
                y ganan hasta 40% más por consulta.
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-3">
                Optimizar Mi Perfil
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}