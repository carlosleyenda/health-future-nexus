
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, User } from "lucide-react";

export default function PatientAlerts() {
  const alerts = [
    {
      id: '1',
      patient: 'María González',
      message: 'Presión arterial elevada reportada',
      priority: 'alta',
      time: 'Hace 15 min'
    },
    {
      id: '2',
      patient: 'Roberto Silva',
      message: 'Cita de seguimiento vencida',
      priority: 'media',
      time: 'Hace 1 hora'
    },
    {
      id: '3',
      patient: 'Laura Fernández',
      message: 'Resultados de laboratorio listos',
      priority: 'baja',
      time: 'Hace 2 horas'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return 'destructive';
      case 'media': return 'default';
      case 'baja': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Alertas de Pacientes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start justify-between p-3 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{alert.patient}</span>
                  <Badge variant={getPriorityColor(alert.priority)}>
                    {alert.priority}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-1">{alert.message}</p>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  {alert.time}
                </div>
              </div>
              <Button size="sm" variant="outline">
                Revisar
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
