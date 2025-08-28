import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, User, Video, FileText, Calendar, Filter, 
  Phone, Mail, MapPin, Activity, Clock, AlertCircle,
  Heart, Pill, Stethoscope, Eye, ChevronRight, Plus
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface EnhancedPatientManagementProps {
  doctorId: string;
}

export default function EnhancedPatientManagement({ doctorId }: EnhancedPatientManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const navigate = useNavigate();

  // Datos mock enriquecidos
  const patients = [
    {
      id: '1',
      name: 'Ana García Martínez',
      email: 'ana.garcia@email.com',
      phone: '+52 55 1234 5678',
      age: 34,
      gender: 'Femenino',
      lastVisit: '2024-01-15',
      nextAppointment: '2024-01-20 10:00',
      status: 'active',
      condition: 'Hipertensión',
      priority: 'medium',
      avatar: null,
      vitals: {
        bloodPressure: '130/85',
        heartRate: '72 bpm',
        temperature: '36.5°C',
        weight: '68 kg'
      },
      medications: ['Losartán 50mg', 'Metformina 500mg'],
      allergies: ['Penicilina'],
      insurance: 'IMSS',
      notes: 'Paciente con buen control de presión arterial.'
    },
    {
      id: '2',
      name: 'Carlos Méndez López',
      email: 'carlos.mendez@email.com',
      phone: '+52 55 9876 5432',
      age: 45,
      gender: 'Masculino',
      lastVisit: '2024-01-14',
      nextAppointment: null,
      status: 'follow_up',
      condition: 'Diabetes Tipo 2',
      priority: 'high',
      avatar: null,
      vitals: {
        bloodPressure: '145/90',
        heartRate: '78 bpm',
        glucose: '160 mg/dl',
        weight: '85 kg'
      },
      medications: ['Metformina 850mg', 'Glibenclamida 5mg'],
      allergies: ['Ninguna conocida'],
      insurance: 'Seguro Popular',
      notes: 'Requiere seguimiento de niveles de glucosa.'
    },
    {
      id: '3',
      name: 'María López Hernández',
      email: 'maria.lopez@email.com',
      phone: '+52 55 5555 1234',
      age: 28,
      gender: 'Femenino',
      lastVisit: null,
      nextAppointment: '2024-01-18 15:30',
      status: 'new',
      condition: 'Primera consulta',
      priority: 'low',
      avatar: null,
      vitals: null,
      medications: [],
      allergies: ['Por determinar'],
      insurance: 'Particular',
      notes: 'Paciente nueva, primera consulta programada.'
    }
  ];

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.condition.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || patient.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const handlePatientAction = (action: string, patientId: string) => {
    switch (action) {
      case 'view':
        navigate(`/patients/${patientId}`);
        break;
      case 'consult':
        toast.success('Iniciando videoconsulta...');
        navigate(`/consultations?patient=${patientId}`);
        break;
      case 'schedule':
        navigate(`/appointments?patient=${patientId}&action=new`);
        break;
      case 'records':
        navigate(`/medical-records?patient=${patientId}`);
        break;
      case 'call':
        toast.info('Iniciando llamada telefónica...');
        break;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'follow_up': return 'bg-blue-100 text-blue-800';
      case 'new': return 'bg-purple-100 text-purple-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header con estadísticas */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Gestión de Pacientes</CardTitle>
              <p className="text-muted-foreground mt-1">
                Administra tu base de pacientes de forma eficiente
              </p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Paciente
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-lg border">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">Total Pacientes</span>
              </div>
              <p className="text-2xl font-bold mt-1">{patients.length}</p>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">Activos</span>
              </div>
              <p className="text-2xl font-bold mt-1">
                {patients.filter(p => p.status === 'active').length}
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-600" />
                <span className="text-sm font-medium">Seguimiento</span>
              </div>
              <p className="text-2xl font-bold mt-1">
                {patients.filter(p => p.status === 'follow_up').length}
              </p>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium">Nuevos</span>
              </div>
              <p className="text-2xl font-bold mt-1">
                {patients.filter(p => p.status === 'new').length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filtros y búsqueda */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nombre, email o condición médica..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedFilter('all')}
                size="sm"
              >
                Todos
              </Button>
              <Button
                variant={selectedFilter === 'active' ? 'default' : 'outline'}
                onClick={() => setSelectedFilter('active')}
                size="sm"
              >
                Activos
              </Button>
              <Button
                variant={selectedFilter === 'follow_up' ? 'default' : 'outline'}
                onClick={() => setSelectedFilter('follow_up')}
                size="sm"
              >
                Seguimiento
              </Button>
              <Button
                variant={selectedFilter === 'new' ? 'default' : 'outline'}
                onClick={() => setSelectedFilter('new')}
                size="sm"
              >
                Nuevos
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de pacientes mejorada */}
      <div className="grid gap-4">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <Card key={patient.id} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Header del paciente */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                        {patient.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{patient.name}</h3>
                        <p className="text-muted-foreground">{patient.age} años • {patient.gender}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={getStatusColor(patient.status)}>
                            {patient.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <Badge className={getPriorityColor(patient.priority)} variant="outline">
                            Prioridad {patient.priority.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePatientAction('call', patient.id)}
                      >
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handlePatientAction('consult', patient.id)}
                        className="bg-gradient-to-r from-green-600 to-teal-600"
                      >
                        <Video className="h-4 w-4 mr-1" />
                        Consulta
                      </Button>
                    </div>
                  </div>

                  {/* Información médica compacta */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Condición Principal</h4>
                      <p className="text-sm font-medium">{patient.condition}</p>
                      {patient.notes && (
                        <p className="text-xs text-muted-foreground mt-1">{patient.notes}</p>
                      )}
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Signos Vitales</h4>
                      {patient.vitals ? (
                        <div className="space-y-1">
                          <p className="text-xs">PA: {patient.vitals.bloodPressure}</p>
                          <p className="text-xs">FC: {patient.vitals.heartRate}</p>
                          {patient.vitals.glucose && (
                            <p className="text-xs">Glucosa: {patient.vitals.glucose}</p>
                          )}
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground">Sin datos</p>
                      )}
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Medicamentos</h4>
                      {patient.medications.length > 0 ? (
                        <div className="space-y-1">
                          {patient.medications.slice(0, 2).map((med, index) => (
                            <p key={index} className="text-xs">{med}</p>
                          ))}
                          {patient.medications.length > 2 && (
                            <p className="text-xs text-blue-600">+{patient.medications.length - 2} más</p>
                          )}
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground">Sin medicamentos</p>
                      )}
                    </div>
                  </div>

                  {/* Información de contacto y próximas citas */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {patient.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {patient.phone}
                      </div>
                      {patient.lastVisit && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Última: {new Date(patient.lastVisit).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePatientAction('records', patient.id)}
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        Historial
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePatientAction('schedule', patient.id)}
                      >
                        <Calendar className="h-3 w-3 mr-1" />
                        Agendar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePatientAction('view', patient.id)}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Ver Todo
                        <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>

                  {/* Próxima cita si existe */}
                  {patient.nextAppointment && (
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">
                          Próxima cita: {new Date(patient.nextAppointment).toLocaleDateString()} a las{' '}
                          {new Date(patient.nextAppointment).toLocaleTimeString('es-MX', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <User className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No se encontraron pacientes
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm 
                  ? `No hay pacientes que coincidan con "${searchTerm}"`
                  : 'Aún no tienes pacientes asignados'
                }
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Agregar Primer Paciente
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}