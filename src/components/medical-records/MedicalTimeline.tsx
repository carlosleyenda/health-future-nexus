
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, FileText } from 'lucide-react';
import type { MedicalTimelineEvent, MedicalDocument } from '@/types/medical-records';

interface MedicalTimelineProps {
  events: MedicalTimelineEvent[];
  onDocumentSelect: (document: MedicalDocument) => void;
}

export default function MedicalTimeline({ events, onDocumentSelect }: MedicalTimelineProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <Clock className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500">No hay eventos en el timeline</p>
      </div>
    );
  }

  return (
    <div className="space-y-4" role="timeline" aria-label="Timeline de eventos médicos">
      {events.map((event, index) => (
        <div key={event.id} className="relative">
          {index !== events.length - 1 && (
            <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200" aria-hidden="true" />
          )}
          
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sm">{event.title}</h3>
                    <time className="text-xs text-gray-500" dateTime={event.date}>
                      {new Date(event.date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Badge variant="secondary">{event.type}</Badge>
                      {event.doctorName && (
                        <Badge variant="outline">Dr. {event.doctorName}</Badge>
                      )}
                    </div>
                    
                    {event.documents.length > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const firstDocument = event.documents[0];
                          onDocumentSelect(firstDocument);
                        }}
                        aria-label={`Ver documento: ${event.documents[0].title}`}
                      >
                        Ver Documento
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
