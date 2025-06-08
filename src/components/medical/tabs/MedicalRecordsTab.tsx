
import React from 'react';
import { FileText, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePatientMedicalHistory } from '@/hooks/usePatient';

interface MedicalRecordsTabProps {
  patientId: string;
}

export default function MedicalRecordsTab({ patientId }: MedicalRecordsTabProps) {
  const { data: medicalHistory } = usePatientMedicalHistory(patientId);

  if (!medicalHistory?.length) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Sin historial médico</h3>
          <p className="text-muted-foreground">Tu historial médico aparecerá aquí después de tus consultas</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {medicalHistory.map((record) => (
        <Card key={record.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Consulta Médica
              </CardTitle>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {new Date(record.date).toLocaleDateString('es-MX')}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">Motivo de consulta:</h4>
              <p className="text-muted-foreground">{record.chiefComplaint}</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Diagnósticos:</h4>
              <div className="flex flex-wrap gap-2">
                {record.diagnosis.map((diag, index) => (
                  <Badge key={index} variant="secondary">{diag}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-1">Plan de tratamiento:</h4>
              <p className="text-muted-foreground">{record.treatmentPlan}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
              <div>
                <span className="font-medium">Presión:</span>
                <p>{record.vitalSigns.bloodPressure}</p>
              </div>
              <div>
                <span className="font-medium">Pulso:</span>
                <p>{record.vitalSigns.heartRate} bpm</p>
              </div>
              <div>
                <span className="font-medium">Temp:</span>
                <p>{record.vitalSigns.temperature}°C</p>
              </div>
              <div>
                <span className="font-medium">Peso:</span>
                <p>{record.vitalSigns.weight} kg</p>
              </div>
              <div>
                <span className="font-medium">Altura:</span>
                <p>{record.vitalSigns.height} cm</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
