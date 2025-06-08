
import React, { useState } from 'react';
import { Calendar, Activity, Pill, FileText, Heart, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { usePatientMedicalHistory, usePatientHealthMetrics, usePatientPrescriptions } from '@/hooks/usePatient';

interface HealthTimelineProps {
  patientId: string;
}

export default function HealthTimeline({ patientId }: HealthTimelineProps) {
  const [timeRange, setTimeRange] = useState('6m');
  const { data: medicalHistory } = usePatientMedicalHistory(patientId);
  const { data: healthMetrics } = usePatientHealthMetrics(patientId);
  const { data: prescriptions } = usePatientPrescriptions(patientId);

  // Combinar todos los eventos en una línea de tiempo
  const timelineEvents = [
    ...(medicalHistory?.map(record => ({
      id: record.id,
      type: 'medical_record',
      date: record.date,
      title: 'Consulta Médica',
      description: record.chiefComplaint,
      details: record.diagnosis.join(', '),
      icon: FileText,
      color: 'blue'
    })) || []),
    ...(healthMetrics?.map(metric => ({
      id: metric.id,
      type: 'health_metric',
      date: metric.recordedAt,
      title: `Medición de ${metric.type.replace('_', ' ')}`,
      description: `${metric.value} ${metric.unit}`,
      details: `Registrado por dispositivo`,
      icon: Activity,
      color: 'green'
    })) || []),
    ...(prescriptions?.map(prescription => ({
      id: prescription.id,
      type: 'prescription',
      date: prescription.createdAt,
      title: 'Nueva Receta',
      description: prescription.medicationName,
      details: `${prescription.dosage} - ${prescription.frequency}`,
      icon: Pill,
      color: 'purple'
    })) || [])
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getEventColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'green': return 'bg-green-100 text-green-800 border-green-200';
      case 'purple': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case 'blue': return 'text-blue-600 bg-blue-100';
      case 'green': return 'text-green-600 bg-green-100';
      case 'purple': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Línea de Tiempo de Salud</h2>
          <p className="text-gray-600">Historial cronológico completo</p>
        </div>
        <div className="flex space-x-2">
          {[
            { value: '1m', label: '1 Mes' },
            { value: '3m', label: '3 Meses' },
            { value: '6m', label: '6 Meses' },
            { value: '1y', label: '1 Año' },
            { value: 'all', label: 'Todo' }
          ].map((option) => (
            <Button
              key={option.value}
              variant={timeRange === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <Card>
        <CardContent className="pt-6">
          {timelineEvents.length > 0 ? (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              
              <div className="space-y-8">
                {timelineEvents.map((event, index) => {
                  const Icon = event.icon;
                  return (
                    <div key={event.id} className="relative flex items-start space-x-6">
                      {/* Timeline dot */}
                      <div className={`relative z-10 w-16 h-16 rounded-full border-4 border-white shadow-md flex items-center justify-center ${getIconColor(event.color)}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      
                      {/* Event content */}
                      <div className="flex-1 min-w-0">
                        <div className={`p-4 rounded-lg border ${getEventColor(event.color)}`}>
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-lg">{event.title}</h3>
                            <div className="text-right">
                              <p className="text-sm font-medium">
                                {new Date(event.date).toLocaleDateString('es-MX', {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric'
                                })}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(event.date).toLocaleTimeString('es-MX', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-800 mb-2">{event.description}</p>
                          <p className="text-sm text-gray-600">{event.details}</p>
                          
                          <div className="mt-3 flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {event.type.replace('_', ' ').toUpperCase()}
                            </Badge>
                            {index === 0 && (
                              <Badge variant="default" className="text-xs">
                                Más Reciente
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Sin eventos en el historial
              </h3>
              <p className="text-gray-500 mb-6">
                Tu línea de tiempo de salud se poblará con consultas, mediciones y recetas
              </p>
              <Button>Agendar Primera Consulta</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              Consultas Médicas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-600">{medicalHistory?.length || 0}</p>
            <p className="text-sm text-gray-600">Total registradas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Activity className="h-5 w-5 mr-2 text-green-600" />
              Métricas de Salud
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{healthMetrics?.length || 0}</p>
            <p className="text-sm text-gray-600">Mediciones registradas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Pill className="h-5 w-5 mr-2 text-purple-600" />
              Recetas Médicas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-600">{prescriptions?.length || 0}</p>
            <p className="text-sm text-gray-600">Medicamentos prescritos</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
