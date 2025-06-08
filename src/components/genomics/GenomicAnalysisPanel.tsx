
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Dna, 
  AlertTriangle, 
  TrendingUp, 
  Shield, 
  Users, 
  FileText,
  Download,
  Upload
} from 'lucide-react';
import { useGenomicProfile } from '@/hooks/useGenomics';
import { useAuthStore } from '@/store/auth';

export default function GenomicAnalysisPanel() {
  const { user } = useAuthStore();
  const { data: genomicProfile, isLoading } = useGenomicProfile(user?.id || '');
  const [selectedTab, setSelectedTab] = useState('overview');

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2">Analizando datos genómicos...</span>
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
          <h3 className="text-lg font-semibold mb-2">Perfil Genómico No Disponible</h3>
          <p className="text-gray-600 mb-4">
            Sube tus datos genómicos para obtener análisis personalizados
          </p>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Subir Datos Genómicos
          </Button>
        </CardContent>
      </Card>
    );
  }

  const getRiskColor = (score: number) => {
    if (score < 30) return 'text-green-600 bg-green-100';
    if (score < 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getRiskLabel = (score: number) => {
    if (score < 30) return 'Bajo';
    if (score < 70) return 'Moderado';
    return 'Alto';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Análisis Genómico Completo</h2>
          <p className="text-gray-600">
            Perfil genómico procesado el {new Date(genomicProfile.processedAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar Reporte
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Reporte Médico
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="variants">Variantes</TabsTrigger>
          <TabsTrigger value="risks">Riesgos</TabsTrigger>
          <TabsTrigger value="pharmacogenomics">Farmacogenómica</TabsTrigger>
          <TabsTrigger value="ancestry">Ancestría</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quality Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Calidad del Secuenciamiento</p>
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
                    <p className="text-sm font-medium text-gray-600">Cobertura Promedio</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {genomicProfile.qualityMetrics.coverage}x
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Variantes Detectadas</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {genomicProfile.variants?.length || 0}
                    </p>
                  </div>
                  <Dna className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Risk Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Resumen de Riesgos Genéticos</CardTitle>
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
                      <Badge className={getRiskColor(risk.riskScore)}>
                        {getRiskLabel(risk.riskScore)}
                      </Badge>
                      <div className="text-right">
                        <p className="text-sm font-medium">{risk.riskScore}%</p>
                        <p className="text-xs text-gray-500">vs población</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="variants" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Variantes Genéticas Detectadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {genomicProfile.variants?.map((variant, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{variant.gene}</h4>
                      <Badge variant={variant.pathogenicity === 'pathogenic' ? 'destructive' : 'secondary'}>
                        {variant.pathogenicity}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Posición</p>
                        <p className="font-medium">{variant.chromosome}:{variant.position}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Cambio</p>
                        <p className="font-medium">{variant.ref} → {variant.alt}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Zigosidad</p>
                        <p className="font-medium">{variant.zygosity}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Frecuencia</p>
                        <p className="font-medium">{(variant.alleleFrequency * 100).toFixed(2)}%</p>
                      </div>
                    </div>
                    {variant.clinicalSignificance && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">Significancia Clínica:</p>
                        <p className="text-sm">{variant.clinicalSignificance}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Evaluación de Riesgos Genéticos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {genomicProfile.riskFactors?.map((risk, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-medium">{risk.condition}</h4>
                      <Badge className={getRiskColor(risk.riskScore)}>
                        Riesgo {getRiskLabel(risk.riskScore)} ({risk.riskScore}%)
                      </Badge>
                    </div>
                    
                    <Progress value={risk.riskScore} className="w-full" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium mb-2">Genes Asociados</h5>
                        <div className="flex flex-wrap gap-2">
                          {risk.associatedGenes.map((gene, gIndex) => (
                            <Badge key={gIndex} variant="outline">{gene}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">Nivel de Evidencia</h5>
                        <p className="text-sm text-gray-600">{risk.evidenceLevel}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium mb-2">Recomendaciones</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {risk.recommendations.map((rec, rIndex) => (
                          <li key={rIndex} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pharmacogenomics" className="space-y-6">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Esta información debe ser revisada por un médico antes de hacer cambios en la medicación.
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Perfil Farmacogenómico</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {genomicProfile.pharmacogenomicProfile?.drugResponses.map((response, index) => (
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
                        <p className="text-gray-600">Enzima</p>
                        <p className="font-medium">{response.enzyme}</p>
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
        </TabsContent>

        <TabsContent value="ancestry" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Análisis de Ancestría</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {genomicProfile.ancestryAnalysis?.populationGroups.map((group, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{group.population}</span>
                      <span className="text-sm font-medium">{(group.percentage * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={group.percentage * 100} className="w-full" />
                  </div>
                ))}
                
                <div className="mt-6">
                  <h5 className="font-medium mb-2">Haplogrupos</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Materno (mtDNA)</p>
                      <p className="font-medium">{genomicProfile.ancestryAnalysis?.haplogroups.maternal}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Paterno (Y-DNA)</p>
                      <p className="font-medium">{genomicProfile.ancestryAnalysis?.haplogroups.paternal}</p>
                    </div>
                  </div>
                </div>
                
                {genomicProfile.ancestryAnalysis?.migrationPatterns && (
                  <div className="mt-6">
                    <h5 className="font-medium mb-2">Patrones de Migración</h5>
                    <div className="space-y-2">
                      {genomicProfile.ancestryAnalysis.migrationPatterns.map((pattern, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{pattern.region}</span>
                            <span className="text-sm text-gray-600">{pattern.timeframe}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{pattern.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
