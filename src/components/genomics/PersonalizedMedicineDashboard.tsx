
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  Dna, Pill, Family, Research, Shield, AlertTriangle,
  TrendingUp, Target, Users, FileText, Download, Eye
} from 'lucide-react';
import { useGenomicProfile, usePharmacogenomics, useDiseasePredisposition } from '@/hooks/useGenomics';
import { useAuthStore } from '@/store/auth';
import GenomicAnalysisPanel from './GenomicAnalysisPanel';
import PharmacogenomicsPanel from './PharmacogenomicsPanel';
import FamilyHealthPlanning from './FamilyHealthPlanning';
import ResearchIntegration from './ResearchIntegration';
import PrivacyControls from './PrivacyControls';

export default function PersonalizedMedicineDashboard() {
  const { user } = useAuthStore();
  const patientId = user?.id || 'demo-patient';
  
  const { data: genomicProfile, isLoading: genomicLoading } = useGenomicProfile(patientId);
  const { data: pharmacogenomics, isLoading: pharmaLoading } = usePharmacogenomics(patientId);
  const { data: diseasePredisposition, isLoading: diseaseLoading } = useDiseasePredisposition(patientId);

  const [selectedTab, setSelectedTab] = useState('overview');

  if (genomicLoading || pharmaLoading || diseaseLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando perfil genómico...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Medicina Personalizada</h1>
          <p className="text-gray-600">Análisis genómico integral y recomendaciones de precisión</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar Datos
          </Button>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Ver Reporte
          </Button>
        </div>
      </div>

      {/* Privacy Notice */}
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          <strong>Privacidad y Seguridad:</strong> Sus datos genómicos están encriptados con AES-256 
          y solo se comparten según sus preferencias de consentimiento. Puede modificar estos 
          ajustes en cualquier momento.
        </AlertDescription>
      </Alert>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="genomics">Genómica</TabsTrigger>
          <TabsTrigger value="pharmacogenomics">Farmacogenómica</TabsTrigger>
          <TabsTrigger value="family">Planificación Familiar</TabsTrigger>
          <TabsTrigger value="research">Investigación</TabsTrigger>
          <TabsTrigger value="privacy">Privacidad</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Secuenciación</p>
                    <p className="text-2xl font-bold">
                      {genomicProfile?.sequenceType === 'whole_genome' ? 'Genoma Completo' : 'Exoma'}
                    </p>
                  </div>
                  <Dna className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Variantes Identificadas</p>
                    <p className="text-2xl font-bold">
                      {genomicProfile?.sequenceData.variants?.length || 0}
                    </p>
                  </div>
                  <Target className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Respuestas a Fármacos</p>
                    <p className="text-2xl font-bold">
                      {pharmacogenomics?.drugResponses?.length || 0}
                    </p>
                  </div>
                  <Pill className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Calidad de Secuencia</p>
                    <p className="text-2xl font-bold">
                      {genomicProfile?.qualityMetrics?.q30Percentage.toFixed(1)}%
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Disease Risk Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                Evaluación de Riesgo de Enfermedades
              </CardTitle>
              <CardDescription>
                Predisposiciones genéticas basadas en variantes identificadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {diseasePredisposition?.slice(0, 3).map((disease) => (
                  <div key={disease.condition} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold">{disease.condition}</h4>
                        <Badge variant={disease.riskScore > 70 ? 'destructive' : disease.riskScore > 40 ? 'default' : 'secondary'}>
                          {disease.riskScore > 70 ? 'Alto Riesgo' : disease.riskScore > 40 ? 'Riesgo Moderado' : 'Bajo Riesgo'}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Puntuación de Riesgo:</span>
                          <Progress value={disease.riskScore} className="flex-1" />
                          <span className="text-sm font-medium">{disease.riskScore}%</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Riesgo relativo: {disease.relativeRisk}x | Confianza: {Math.round(disease.confidence * 100)}%
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pharmacogenomics Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pill className="h-5 w-5 text-blue-600" />
                Respuestas Farmacogenómicas Clave
              </CardTitle>
              <CardDescription>
                Recomendaciones de medicamentos basadas en su perfil genético
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pharmacogenomics?.drugResponses?.slice(0, 4).map((drug) => (
                  <div key={drug.drugName} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{drug.drugName}</h4>
                      <Badge variant={
                        drug.expectedResponse === 'poor' || drug.expectedResponse === 'toxic' ? 'destructive' :
                        drug.expectedResponse === 'reduced' ? 'default' : 'secondary'
                      }>
                        {drug.expectedResponse === 'poor' ? 'Respuesta Pobre' :
                         drug.expectedResponse === 'reduced' ? 'Respuesta Reducida' :
                         drug.expectedResponse === 'normal' ? 'Respuesta Normal' :
                         drug.expectedResponse === 'increased' ? 'Respuesta Aumentada' : 'Tóxico'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{drug.mechanism}</p>
                    <p className="text-sm font-medium text-blue-600">{drug.clinicalRecommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="genomics">
          <GenomicAnalysisPanel genomicProfile={genomicProfile} />
        </TabsContent>

        <TabsContent value="pharmacogenomics">
          <PharmacogenomicsPanel pharmacogenomics={pharmacogenomics} />
        </TabsContent>

        <TabsContent value="family">
          <FamilyHealthPlanning patientId={patientId} />
        </TabsContent>

        <TabsContent value="research">
          <ResearchIntegration patientId={patientId} />
        </TabsContent>

        <TabsContent value="privacy">
          <PrivacyControls genomicProfile={genomicProfile} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
