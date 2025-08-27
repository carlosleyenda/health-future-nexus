
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, Plus } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface CompactUpcomingAppointmentsProps {
  patientId: string;
}

export default function CompactUpcomingAppointments({ patientId }: CompactUpcomingAppointmentsProps) {
  const { data: appointments } = useQuery({
    queryKey: ['appointments', patientId],
    queryFn: async () => [
      {
        id: '1',
        doctor: 'Dr. María González',
        specialty: 'Cardiología',
        date: '2024-01-20',
        time: '14:30',
        type: 'video',
        status: 'confirmed'
      },
      {
        id: '2',
        doctor: 'Dr. Carlos Ruiz',
        specialty: 'Medicina General',
        date: '2024-01-22',
        time: '10:00',
        type: 'presencial',
        status: 'pending'
      }
    ]
  });

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Próximas Citas</CardTitle>
          <Button size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-1" />
            Nueva
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {appointments && appointments.length > 0 ? (
            appointments.slice(0, 2).map((appointment) => (
              <div key={appointment.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">{appointment.doctor}</h4>
                    <p className="text-sm text-gray-600">{appointment.specialty}</p>
                  </div>
                  <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
                    {appointment.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(appointment.date).toLocaleDateString('es-MX')}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {appointment.time}
                    </div>
                  </div>
                  {appointment.type === 'video' && (
                    <Video className="h-4 w-4 text-blue-500" />
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4">
              <Calendar className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">No tienes citas programadas</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
