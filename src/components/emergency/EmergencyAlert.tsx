
import React, { useState } from 'react';
import { AlertTriangle, Phone, MapPin, Clock, Heart, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useEmergencyAlert } from '@/hooks/useEmergency';

interface EmergencyAlertProps {
  patientId: string;
}

export default function EmergencyAlert({ patientId }: EmergencyAlertProps) {
  const [isEmergency, setIsEmergency] = useState(false);
  const { sendEmergencyAlert, emergencyContacts } = useEmergencyAlert(patientId);

  const emergencyTypes = [
    { id: 'cardiac', label: 'Problema Cardíaco', icon: Heart, severity: 'critical' },
    { id: 'breathing', label: 'Dificultad Respiratoria', icon: Activity, severity: 'high' },
    { id: 'accident', label: 'Accidente', icon: AlertTriangle, severity: 'high' },
    { id: 'severe_pain', label: 'Dolor Severo', icon: AlertTriangle, severity: 'medium' },
  ];

  const handleEmergencyCall = (type: string) => {
    setIsEmergency(true);
    sendEmergencyAlert.mutate({
      patientId,
      emergencyType: type,
      location: { lat: 19.4326, lng: -99.1332 }, // Ubicación actual
      severity: 'high'
    });
  };

  if (isEmergency || sendEmergencyAlert.isSuccess) {
    return (
      <div className="space-y-6">
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Alerta de emergencia activada.</strong> Los servicios de emergencia han sido notificados.
          </AlertDescription>
        </Alert>

        <Card className="border-red-200">
          <CardHeader className="bg-red-50">
            <CardTitle className="text-red-800 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Emergencia en Progreso
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm">Tiempo estimado de llegada: 8-12 minutos</span>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-sm">Ubicación confirmada</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  <Phone className="h-4 w-4 mr-2" />
                  911 - Emergencias
                </Button>
                <Button variant="outline" className="border-red-200">
                  <Phone className="h-4 w-4 mr-2" />
                  Contacto de emergencia
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-red-600 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Sistema de Emergencias
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emergencyTypes.map((emergency) => (
              <Button
                key={emergency.id}
                variant="outline"
                className="h-20 flex-col gap-2 border-red-200 hover:bg-red-50"
                onClick={() => handleEmergencyCall(emergency.id)}
              >
                <emergency.icon className="h-6 w-6 text-red-600" />
                <span className="text-sm">{emergency.label}</span>
                <Badge variant={emergency.severity === 'critical' ? 'destructive' : 'secondary'}>
                  {emergency.severity}
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contactos de Emergencia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {emergencyContacts?.map((contact) => (
              <div key={contact.id} className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-gray-500">{contact.relationship}</p>
                </div>
                <Button size="sm" variant="outline">
                  <Phone className="h-3 w-3 mr-1" />
                  {contact.phone}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
