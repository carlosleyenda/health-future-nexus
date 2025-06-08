
import React from 'react';
import { FileText, Calendar, User, Pill, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePatientMedicalHistory, usePatientAllergies, usePatientPrescriptions } from '@/hooks/usePatient';

interface MedicalHistoryProps {
  patientId: string;
}

export default function MedicalHistory({ patientId }: MedicalHistoryProps) {
  const { data: medicalHistory } = usePatientMedicalHistory(patientId);
  const { data: allergies } = usePatientAllergies(patientId);
  const { data: prescriptions } = usePatientPrescriptions(patientId);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="history" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="history">Historial Médico</TabsTrigger>
          <TabsTrigger value="allergies">Alergias</TabsTrigger>
          <TabsTrigger value="prescriptions">Recetas</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-4">
          {medicalHistory?.length ? (
            medicalHistory.map((record) => (
              <Card key={record.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Consulta Médica
                    </CardTitle>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      {new Date(record.date).toLocaleDateString('es-MX')}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">Motivo de consulta:</h4>
                    <p className="text-gray-700">{record.chiefComplaint}</p>
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
                    <p className="text-gray-700">{record.treatmentPlan}</p>
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
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Sin historial médico</h3>
                <p className="text-gray-500">Tu historial médico aparecerá aquí después de tus consultas</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="allergies" className="space-y-4">
          {allergies?.length ? (
            <div className="grid gap-4">
              {allergies.map((allergy) => (
                <Card key={allergy.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className={`h-5 w-5 mt-0.5 ${
                        allergy.severity === 'severe' ? 'text-red-500' :
                        allergy.severity === 'moderate' ? 'text-yellow-500' :
                        'text-blue-500'
                      }`} />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">{allergy.allergen}</h3>
                          <Badge variant={
                            allergy.severity === 'severe' ? 'destructive' :
                            allergy.severity === 'moderate' ? 'default' : 'secondary'
                          }>
                            {allergy.severity}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-2">{allergy.reaction}</p>
                        <p className="text-sm text-gray-500">
                          Diagnosticada: {new Date(allergy.diagnosedDate).toLocaleDateString('es-MX')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <AlertTriangle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Sin alergias registradas</h3>
                <p className="text-gray-500">Es importante mantener actualizada tu información de alergias</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="prescriptions" className="space-y-4">
          {prescriptions?.length ? (
            prescriptions.map((prescription) => (
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
                      <p className="text-gray-700">{prescription.instructions}</p>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    Prescrita el: {new Date(prescription.createdAt).toLocaleDateString('es-MX')}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <Pill className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Sin recetas médicas</h3>
                <p className="text-gray-500">Tus recetas médicas aparecerán aquí después de tus consultas</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
