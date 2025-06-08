
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import type { GenomicProfile } from '@/types/genomics';

interface PharmacogenomicsPanelProps {
  genomicProfile: GenomicProfile;
}

export default function PharmacogenomicsPanel({ genomicProfile }: PharmacogenomicsPanelProps) {
  if (!genomicProfile.pharmacogenomicProfile) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-600">Datos farmacogenómicos no disponibles</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Esta información debe ser revisada por un médico antes de hacer cambios en la medicación.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Respuestas a Medicamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {genomicProfile.pharmacogenomicProfile.drugResponses.map((response, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{response.medication}</h4>
                  <Badge variant={
                    response.metabolizerStatus === 'poor' ? 'destructive' :
                    response.metabolizerStatus === 'intermediate' ? 'default' :
                    'secondary'
                  }>
                    {response.metabolizerStatus} metabolizador
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Gen</p>
                    <p className="font-medium">{response.gene}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Eficacia Esperada</p>
                    <p className="font-medium">{response.efficacyPrediction}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Riesgo de RAM</p>
                    <p className="font-medium">{response.adverseReactionRisk}</p>
                  </div>
                </div>
                
                {response.dosageRecommendation && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Recomendación de Dosis:</p>
                    <p className="text-sm font-medium">{response.dosageRecommendation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
