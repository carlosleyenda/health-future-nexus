
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, FileText } from 'lucide-react';
import type { GenomicProfile } from '@/types/genomics';

interface ResearchIntegrationProps {
  genomicProfile: GenomicProfile;
}

export default function ResearchIntegration({ genomicProfile }: ResearchIntegrationProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="h-5 w-5 mr-2" />
            Participación en Investigación
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Ensayos Clínicos Elegibles</h4>
              <div className="space-y-3">
                {genomicProfile.clinicalTrials?.map((trial, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{trial.trialName}</p>
                      <p className="text-xs text-gray-600">{trial.sponsor} • {trial.phase}</p>
                    </div>
                    <Badge variant="outline">Elegible</Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contribución a la Ciencia</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Datos contribuidos</span>
                    <Badge>Activo</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Estudios participando</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Impacto científico</span>
                    <span className="font-medium">Alto</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Acciones Disponibles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Ver ensayos disponibles
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Search className="h-4 w-4 mr-2" />
                    Buscar estudios relevantes
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Gestionar participación
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
