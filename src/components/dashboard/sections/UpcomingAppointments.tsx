
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, MapPin } from "lucide-react";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface StoredAppointment {
  id: string;
  patientName: string;
  date: string;
  time: string;
  doctor: {
    name: string;
    specialty: string;
    consultationFee: number;
  };
  reason: string;
  status: string;
}

export default function UpcomingAppointments() {
  const [appointments, setAppointments] = useState<StoredAppointment[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('appointments');
    if (stored) {
      const parsedAppointments = JSON.parse(stored);
      // Mostrar solo las próximas 3 citas
      setAppointments(parsedAppointments.slice(0, 3));
    }
  }, []);

  if (appointments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Próximas Citas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 mb-4">No tienes citas programadas</p>
            <p className="text-sm text-gray-400">Agenda tu primera consulta</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Próximas Citas ({appointments.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium">{appointment.doctor.name}</h4>
                <p className="text-sm text-gray-600 capitalize">
                  {appointment.doctor.specialty.replace('_', ' ')}
                </p>
              </div>
              <Badge variant="outline">
                {appointment.status === 'scheduled' ? 'Programada' : appointment.status}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {typeof appointment.date === 'string' ? 
                  format(new Date(appointment.date), 'dd/MM/yyyy', { locale: es }) :
                  format(appointment.date, 'dd/MM/yyyy', { locale: es })
                }
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {appointment.time}
              </div>
            </div>

            <p className="text-sm text-gray-700 mb-3 line-clamp-2">
              {appointment.reason}
            </p>

            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">
                <Video className="h-3 w-3 mr-1" />
                Unirse
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                <MapPin className="h-3 w-3 mr-1" />
                Ver detalles
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
