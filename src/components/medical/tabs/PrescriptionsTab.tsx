
import React from 'react';
import { Pill } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePatientPrescriptions } from '@/hooks/usePatient';

interface PrescriptionsTabProps {
  patientId: string;
}

export default function PrescriptionsTab({ patientId }: PrescriptionsTabProps) {
  const { data: prescriptions } = usePatientPrescriptions(patientId);

  if (!prescriptions?.length) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Pill className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Sin recetas médicas</h3>
          <p className="text-muted-foreground">Tus recetas médicas aparecerán aquí después de tus consultas</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {prescriptions.map((prescription) => (
        <Card key={prescription.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="flex items-center gap-2">
                <Pill className="h-5 w-5" />
                {prescription.medicationName}
              </CardTitle>
              <Badge variant={
                prescription.status === 'delivered' ? 'default' :
                prescription.status === 'dispensed' ? 'secondary' :
                prescription.status === 'sent_to_pharmacy' ? 'outline' : 'secondary'
              }>
                {prescription.status.replace('_', ' ')}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium">Dosis:</span>
                <p>{prescription.dosage}</p>
              </div>
              <div>
                <span className="font-medium">Cantidad:</span>
                <p>{prescription.quantity}</p>
              </div>
              <div>
                <span className="font-medium">Frecuencia:</span>
                <p>{prescription.frequency}</p>
              </div>
              <div>
                <span className="font-medium">Duración:</span>
                <p>{prescription.duration} días</p>
              </div>
            </div>
            {prescription.instructions && (
              <div className="mt-3">
                <span className="font-medium">Instrucciones:</span>
                <p className="text-muted-foreground">{prescription.instructions}</p>
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              Prescrita el: {new Date(prescription.createdAt).toLocaleDateString('es-MX')}
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
