
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, User, Video } from "lucide-react";

export default function TodaysSchedule() {
  const appointments = [
    {
      id: '1',
      time: '09:00',
      patient: 'María García',
      type: 'Consulta General',
      status: 'confirmada',
      isVirtual: false
    },
    {
      id: '2',
      time: '10:30',
      patient: 'Carlos López',
      type: 'Seguimiento',
      status: 'pendiente',
      isVirtual: true
    },
    {
      id: '3',
      time: '14:00',
      patient: 'Ana Martínez',
      type: 'Revisión',
      status: 'confirmada',
      isVirtual: false
    },
    {
      id: '4',
      time: '15:30',
      patient: 'Pedro Rodríguez',
      type: 'Consulta General',
      status: 'confirmada',
      isVirtual: true
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Agenda de Hoy
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="text-sm font-medium text-blue-600">
                  {appointment.time}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">{appointment.patient}</span>
                    {appointment.isVirtual && (
                      <Video className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                  <div className="text-sm text-gray-500">{appointment.type}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={appointment.status === 'confirmada' ? 'default' : 'secondary'}>
                  {appointment.status}
                </Badge>
                <Button size="sm" variant="outline">
                  Ver Detalles
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
