
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Activity } from 'lucide-react';
import { usePatientTimeline } from '@/hooks/useMedicalRecords';

interface HealthTimelineProps {
  patientId: string;
}

export default function HealthTimeline({ patientId }: HealthTimelineProps) {
  const { data: timeline, isLoading } = usePatientTimeline(patientId);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse">Cargando línea de tiempo...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Línea de Tiempo de Salud
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timeline?.map((event) => (
            <div key={event.id} className="flex items-start gap-4 p-4 border rounded-lg">
              <Calendar className="h-5 w-5 text-blue-500 mt-1" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-medium">{event.title}</h3>
                  <Badge variant="outline">{event.type}</Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                <p className="text-xs text-gray-500">
                  {new Date(event.date).toLocaleDateString('es-MX')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
