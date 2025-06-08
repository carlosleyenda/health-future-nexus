
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, AlertTriangle } from 'lucide-react';
import type { GenomicProfile } from '@/types/genomics';

interface FamilyHealthPlanningProps {
  genomicProfile: GenomicProfile;
}

export default function FamilyHealthPlanning({ genomicProfile }: FamilyHealthPlanningProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Planificación de Salud Familiar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Riesgos Hereditarios Identificados</h4>
              <div className="space-y-2">
                {genomicProfile.riskFactors?.slice(0, 3).map((risk, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm">{risk.condition}</span>
                    <Badge variant={risk.riskScore > 70 ? 'destructive' : 'secondary'}>
                      {risk.riskScore}% riesgo
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recomendaciones Familiares</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm">Consejería genética recomendada</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm">Screening familiar para diabetes tipo 2</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm">Evaluación cardiovascular preventiva</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Acciones Recomendadas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Solicitar consulta genética familiar
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Compartir reporte con familiares
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Crear plan de screening familiar
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
