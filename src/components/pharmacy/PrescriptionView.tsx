
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, User, Clock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { PharmacyMedicationService } from '@/services/api/pharmacyMedicationService';
import { useAuthStore } from '@/store/auth';
import type { DigitalPrescription } from '@/types/pharmacy';

interface PrescriptionViewProps {
  onOrderFromPrescription: (prescription: DigitalPrescription) => void;
}

export default function PrescriptionView({ onOrderFromPrescription }: PrescriptionViewProps) {
  const { user } = useAuthStore();

  const { data: prescriptions, isLoading } = useQuery({
    queryKey: ['prescriptions', user?.id],
    queryFn: () => PharmacyMedicationService.getPatientPrescriptions(user?.id || ''),
    enabled: !!user,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'used': return 'secondary';
      case 'expired': return 'destructive';
      default: return 'secondary';
    }
  };

  const isExpired = (validUntil: string) => {
    return new Date(validUntil) < new Date();
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
        <p className="mt-2 text-gray-600">Cargando recetas...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <FileText className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-semibold">Mis Recetas Digitales</h2>
      </div>

      {prescriptions && prescriptions.length > 0 ? (
        <div className="grid gap-4">
          {prescriptions.map((prescription) => (
            <Card key={prescription.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Receta #{prescription.id.slice(-6)}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {prescription.doctorName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(prescription.issuedDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Válida hasta: {new Date(prescription.validUntil).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <Badge variant={getStatusColor(isExpired(prescription.validUntil) ? 'expired' : prescription.status)}>
                    {isExpired(prescription.validUntil) ? 'Expirada' : 
                     prescription.status === 'active' ? 'Activa' : 
                     prescription.status === 'used' ? 'Usada' : 'Expirada'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Medicamentos Prescritos:</h4>
                    <div className="space-y-2">
                      {prescription.medications.map((med, index) => (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{med.medicationName}</p>
                              <p className="text-sm text-gray-600">
                                {med.frequency} por {med.duration}
                              </p>
                              {med.instructions && (
                                <p className="text-sm text-blue-600 mt-1">
                                  Instrucciones: {med.instructions}
                                </p>
                              )}
                            </div>
                            <Badge variant="outline">{med.dosage}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {prescription.status === 'active' && !isExpired(prescription.validUntil) && (
                    <Button
                      onClick={() => onOrderFromPrescription(prescription)}
                      className="w-full"
                    >
                      Ordenar Medicamentos
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No tienes recetas digitales</p>
          <p className="text-sm text-gray-500 mt-2">
            Las recetas emitidas por tu médico aparecerán aquí
          </p>
        </div>
      )}
    </div>
  );
}
