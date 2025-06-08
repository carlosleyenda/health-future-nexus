
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Dna, 
  Users, 
  Search, 
  Shield, 
  TrendingUp, 
  AlertTriangle,
  FileText,
  Download
} from 'lucide-react';
import { useGenomicProfile } from '@/hooks/useGenomics';
import { useAuthStore } from '@/store/auth';
import GenomicAnalysisPanel from './GenomicAnalysisPanel';
import PharmacogenomicsPanel from './PharmacogenomicsPanel';
import FamilyHealthPlanning from './FamilyHealthPlanning';
import ResearchIntegration from './ResearchIntegration';
import PrivacyControls from './PrivacyControls';

export default function PersonalizedMedicineDashboard() {
  const { user } = useAuthStore();
  const { data: genomicProfile, isLoading } = useGenomicProfile(user?.id || '');
  const [selectedTab, setSelectedTab] = useState('overview');

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2">Analizando perfil genómico...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!genomicProfile) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Dna className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold mb-2">Medicina Personalizada</h3>
          <p className="text-gray-600 mb-4">
            Conecta tus datos genómicos para recibir recomendaciones médicas personalizadas
          </p>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Conectar Datos Genómicos
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Medicina Personalizada</h2>
          <p className="text-gray-600">
            Análisis genómico completo y recomendaciones personalizadas
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Reporte Médico
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar Datos
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Variantes Analizadas</p>
                <p className="text-2xl font-bold text-blue-600">
                  {genomicProfile.variants?.length || 0}
                </p>
              </div>
              <Dna className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Calidad de Datos</p>
                <p className="text-2xl font-bold text-green-600">
                  {genomicProfile.qualityMetrics.overallQuality}%
                </p>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Riesgos Identificados</p>
                <p className="text-2xl font-bold text-orange-600">
                  {genomicProfile.riskFactors?.length || 0}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Medicamentos Analizados</p>
                <p className="text-2xl font-bold text-purple-600">
                  {genomicProfile.pharmacogenomicProfile?.drugResponses.length || 0}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="analysis">Análisis</TabsTrigger>
          <TabsTrigger value="pharmacogenomics">Farmacogenómica</TabsTrigger>
          <TabsTrigger value="family">Familia</TabsTrigger>
          <TabsTrigger value="research">Investigación</TabsTrigger>
          <TabsTrigger value="privacy">Privacidad</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quality Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Métricas de Calidad del Secuenciamiento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Cobertura Promedio</p>
                  <p className="text-2xl font-bold text-blue-600">{genomicProfile.qualityMetrics.coverage}x</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Tasa de Mapeo</p>
                  <p className="text-2xl font-bold text-green-600">{genomicProfile.qualityMetrics.mappingRate}%</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Tasa de Error</p>
                  <p className="text-2xl font-bold text-orange-600">{genomicProfile.qualityMetrics.errorRate}%</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Calidad Q30</p>
                  <p className="text-2xl font-bold text-purple-600">95%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Risk Factors */}
          <Card>
            <CardHeader>
              <CardTitle>Principales Factores de Riesgo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {genomicProfile.riskFactors?.slice(0, 5).map((risk, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{risk.condition}</h4>
                      <p className="text-sm text-gray-600">{risk.description}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Progress value={risk.riskScore} className="w-24" />
                      <Badge variant={risk.riskScore > 70 ? 'destructive' : risk.riskScore > 40 ? 'default' : 'secondary'}>
                        {risk.riskScore}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pharmacogenomics Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Resumen Farmacogenómico</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {genomicProfile.pharmacogenomicProfile?.drugResponses.slice(0, 3).map((response, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{response.medication}</p>
                      <p className="text-sm text-gray-600">Gen: {response.gene}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant={
                        response.efficacyPrediction === 'high' ? 'default' :
                        response.efficacyPrediction === 'normal' ? 'secondary' :
                        response.efficacyPrediction === 'reduced' ? 'default' :
                        response.efficacyPrediction === 'poor' ? 'destructive' :
                        'secondary'
                      }>
                        {response.efficacyPrediction}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">{response.metabolizerStatus}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis">
          <GenomicAnalysisPanel />
        </TabsContent>

        <TabsContent value="pharmacogenomics">
          <PharmacogenomicsPanel genomicProfile={genomicProfile} />
        </TabsContent>

        <TabsContent value="family">
          <FamilyHealthPlanning genomicProfile={genomicProfile} />
        </TabsContent>

        <TabsContent value="research">
          <ResearchIntegration genomicProfile={genomicProfile} />
        </TabsContent>

        <TabsContent value="privacy">
          <PrivacyControls genomicProfile={genomicProfile} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
