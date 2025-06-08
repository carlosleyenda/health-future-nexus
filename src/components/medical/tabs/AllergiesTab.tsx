
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePatientAllergies } from '@/hooks/usePatient';

interface AllergiesTabProps {
  patientId: string;
}

export default function AllergiesTab({ patientId }: AllergiesTabProps) {
  const { data: allergies } = usePatientAllergies(patientId);

  if (!allergies?.length) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Sin alergias registradas</h3>
          <p className="text-muted-foreground">Es importante mantener actualizada tu información de alergias</p>
        </CardContent>
      </Card>
    );
  }

  return (
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
                <p className="text-muted-foreground mb-2">{allergy.reaction}</p>
                <p className="text-sm text-muted-foreground">
                  Diagnosticada: {new Date(allergy.diagnosedDate).toLocaleDateString('es-MX')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
