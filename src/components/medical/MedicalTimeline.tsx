import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  FileText, 
  Pill, 
  TestTube, 
  Stethoscope, 
  Activity,
  Search,
  Filter,
  Download,
  Share2,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface TimelineEvent {
  id: string;
  date: string;
  type: 'appointment' | 'prescription' | 'test' | 'diagnosis' | 'surgery';
  title: string;
  description: string;
  doctor: string;
  location: string;
  status: 'completed' | 'scheduled' | 'cancelled';
  details?: any;
}

// Datos simulados
const mockTimelineData: TimelineEvent[] = [
  {
    id: '1',
    date: '2024-01-15',
    type: 'appointment',
    title: 'Consulta General',
    description: 'Revisión médica de rutina',
    doctor: 'Dr. María García',
    location: 'Consultorio 3A',
    status: 'completed',
    details: {
      symptoms: 'Dolor de cabeza ocasional',
      diagnosis: 'Tensión muscular',
      recommendations: 'Descanso y relajación'
    }
  },
  {
    id: '2',
    date: '2024-01-20',
    type: 'test',
    title: 'Análisis de Sangre',
    description: 'Exámenes de laboratorio completos',
    doctor: 'Dr. Carlos López',
    location: 'Laboratorio Central',
    status: 'completed',
    details: {
      results: 'Valores normales',
      glucose: '95 mg/dL',
      cholesterol: '180 mg/dL'
    }
  },
  {
    id: '3',
    date: '2024-02-01',
    type: 'prescription',
    title: 'Medicamento Recetado',
    description: 'Tratamiento para dolor muscular',
    doctor: 'Dr. María García',
    location: 'Farmacia Virtual',
    status: 'completed',
    details: {
      medication: 'Ibuprofeno 400mg',
      dosage: '1 cada 8 horas',
      duration: '7 días'
    }
  },
  {
    id: '4',
    date: '2024-02-15',
    type: 'appointment',
    title: 'Cardiología',
    description: 'Evaluación cardiológica preventiva',
    doctor: 'Dr. Ana Mendoza',
    location: 'Consultorio 5B',
    status: 'scheduled'
  }
];

export function MedicalTimeline() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());

  const filteredEvents = mockTimelineData.filter(event => {
    const matchesFilter = filter === 'all' || event.type === filter;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.doctor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Stethoscope className="h-5 w-5" />;
      case 'prescription':
        return <Pill className="h-5 w-5" />;
      case 'test':
        return <TestTube className="h-5 w-5" />;
      case 'diagnosis':
        return <FileText className="h-5 w-5" />;
      case 'surgery':
        return <Activity className="h-5 w-5" />;
      default:
        return <Calendar className="h-5 w-5" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'appointment':
        return 'bg-blue-500';
      case 'prescription':
        return 'bg-green-500';
      case 'test':
        return 'bg-purple-500';
      case 'diagnosis':
        return 'bg-orange-500';
      case 'surgery':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const toggleEventExpansion = (eventId: string) => {
    const newExpanded = new Set(expandedEvents);
    if (newExpanded.has(eventId)) {
      newExpanded.delete(eventId);
    } else {
      newExpanded.add(eventId);
    }
    setExpandedEvents(newExpanded);
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Historial Médico</h1>
          <p className="text-muted-foreground">
            Timeline completo de tu atención médica
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Compartir
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel de Filtros y Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Controles de filtrado */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filtros y Búsqueda</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Buscar por título, doctor..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <Tabs value={filter} onValueChange={setFilter} className="w-full sm:w-auto">
                  <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6">
                    <TabsTrigger value="all">Todo</TabsTrigger>
                    <TabsTrigger value="appointment">Citas</TabsTrigger>
                    <TabsTrigger value="test">Análisis</TabsTrigger>
                    <TabsTrigger value="prescription">Recetas</TabsTrigger>
                    <TabsTrigger value="diagnosis">Diagnósticos</TabsTrigger>
                    <TabsTrigger value="surgery">Cirugías</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Timeline Médico</CardTitle>
              <CardDescription>
                {filteredEvents.length} eventos encontrados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Línea vertical del timeline */}
                <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />
                
                <div className="space-y-6">
                  {filteredEvents.map((event, index) => (
                    <div key={event.id} className="relative flex items-start space-x-4">
                      {/* Icono del evento */}
                      <div className={`
                        relative z-10 flex items-center justify-center w-16 h-16 rounded-full
                        ${getEventColor(event.type)} text-white
                      `}>
                        {getEventIcon(event.type)}
                      </div>
                      
                      {/* Contenido del evento */}
                      <div className="flex-1 min-w-0">
                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                          <CardHeader 
                            className="pb-3"
                            onClick={() => toggleEventExpansion(event.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <CardTitle className="text-lg">{event.title}</CardTitle>
                                  <Badge variant={event.status === 'completed' ? 'default' : 'secondary'}>
                                    {event.status === 'completed' ? 'Completado' : 
                                     event.status === 'scheduled' ? 'Programado' : 'Cancelado'}
                                  </Badge>
                                </div>
                                <CardDescription className="text-sm">
                                  {new Date(event.date).toLocaleDateString('es-ES', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })} • {event.doctor} • {event.location}
                                </CardDescription>
                              </div>
                              
                              <Button variant="ghost" size="sm">
                                {expandedEvents.has(event.id) ? 
                                  <ChevronDown className="h-4 w-4" /> : 
                                  <ChevronRight className="h-4 w-4" />
                                }
                              </Button>
                            </div>
                          </CardHeader>
                          
                          {expandedEvents.has(event.id) && (
                            <CardContent className="pt-0 animate-fade-in">
                              <div className="space-y-3">
                                <p className="text-sm text-muted-foreground">
                                  {event.description}
                                </p>
                                
                                {event.details && (
                                  <div className="bg-muted/50 p-3 rounded-lg">
                                    <h4 className="font-semibold text-sm mb-2">Detalles:</h4>
                                    <div className="space-y-1 text-sm">
                                      {Object.entries(event.details).map(([key, value]) => (
                                        <div key={key} className="flex justify-between">
                                          <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                                          <span className="font-medium">{String(value)}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                
                                <div className="flex gap-2 pt-2">
                                  <Button size="sm" variant="outline">
                                    Ver Detalles
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    Descargar
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          )}
                        </Card>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel lateral con resumen */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resumen de Salud</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {mockTimelineData.filter(e => e.type === 'appointment').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Consultas</div>
                </div>
                
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {mockTimelineData.filter(e => e.type === 'test').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Análisis</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Próximas Citas</h4>
                {mockTimelineData
                  .filter(e => e.status === 'scheduled')
                  .slice(0, 3)
                  .map(event => (
                    <div key={event.id} className="p-2 bg-muted/50 rounded text-sm">
                      <div className="font-medium">{event.title}</div>
                      <div className="text-muted-foreground">
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                    </div>
                  ))
                }
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Agendar Cita
              </Button>
              <Button className="w-full" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Solicitar Informe
              </Button>
              <Button className="w-full" variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Compartir con Doctor
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}