
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  FileText, 
  TestTube, 
  Image, 
  Pill, 
  Syringe, 
  Scissors,
  AlertTriangle,
  Eye,
  Clock
} from 'lucide-react';
import type { MedicalTimelineEvent } from '@/types/medical-records';

interface MedicalTimelineProps {
  events: MedicalTimelineEvent[];
  onSelectDocument: (documentId: string) => void;
}

export default function MedicalTimeline({ events, onSelectDocument }: MedicalTimelineProps) {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'consultation': return <FileText className="h-5 w-5" />;
      case 'study': return <TestTube className="h-5 w-5" />;
      case 'prescription': return <Pill className="h-5 w-5" />;
      case 'vaccination': return <Syringe className="h-5 w-5" />;
      case 'surgery': return <Scissors className="h-5 w-5" />;
      case 'emergency': return <AlertTriangle className="h-5 w-5" />;
      default: return <Calendar className="h-5 w-5" />;
    }
  };

  const getEventColor = (type: string, severity: string) => {
    if (severity === 'critical') return 'bg-red-100 text-red-800 border-red-200';
    if (severity === 'high') return 'bg-orange-100 text-orange-800 border-orange-200';
    
    switch (type) {
      case 'consultation': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'study': return 'bg-green-100 text-green-800 border-green-200';
      case 'prescription': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'vaccination': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'surgery': return 'bg-red-100 text-red-800 border-red-200';
      case 'emergency': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical': return <Badge variant="destructive">Crítico</Badge>;
      case 'high': return <Badge variant="outline" className="border-orange-500 text-orange-700">Alto</Badge>;
      case 'medium': return <Badge variant="outline" className="border-yellow-500 text-yellow-700">Medio</Badge>;
      case 'low': return <Badge variant="outline">Bajo</Badge>;
      default: return null;
    }
  };

  if (events.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            Sin eventos médicos
          </h3>
          <p className="text-gray-500">
            No hay eventos registrados en el historial médico
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        
        {events.map((event, index) => (
          <div key={event.id} className="relative flex items-start space-x-6 pb-8">
            {/* Timeline dot */}
            <div className={`flex-shrink-0 w-16 h-16 rounded-full border-4 flex items-center justify-center ${getEventColor(event.type, event.severity)}`}>
              {getEventIcon(event.type)}
            </div>
            
            {/* Event content */}
            <Card className="flex-1">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {event.title}
                    </h3>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(event.date).toLocaleDateString('es-MX', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                      {event.doctorName && (
                        <span>Dr. {event.doctorName}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {getSeverityBadge(event.severity)}
                    <Badge variant="outline">
                      {event.type === 'consultation' && 'Consulta'}
                      {event.type === 'study' && 'Estudio'}
                      {event.type === 'prescription' && 'Receta'}
                      {event.type === 'vaccination' && 'Vacuna'}
                      {event.type === 'surgery' && 'Cirugía'}
                      {event.type === 'emergency' && 'Emergencia'}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">
                  {event.description}
                </p>
                
                {/* Associated documents */}
                {event.documents.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-900">
                      Documentos asociados ({event.documents.length}):
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {event.documents.map((document) => (
                        <div
                          key={document.id}
                          className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex-shrink-0">
                            {document.type === 'image' ? (
                              <Image className="h-5 w-5 text-purple-600" />
                            ) : (
                              <FileText className="h-5 w-5 text-blue-600" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {document.title}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {document.fileName}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onSelectDocument(document.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
