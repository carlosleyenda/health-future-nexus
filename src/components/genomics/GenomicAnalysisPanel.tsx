
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  Dna, AlertTriangle, TrendingUp, Globe, Baby, 
  FileText, Download, Eye, Search
} from 'lucide-react';
import type { GenomicProfile } from '@/types/genomics';

interface GenomicAnalysisPanelProps {
  genomicProfile: GenomicProfile | null | undefined;
}

export default function GenomicAnalysisPanel({ genomicProfile }: GenomicAnalysisPanelProps) {
  const [selectedVariant, setSelectedVariant] = useState<any>(null);

  if (!genomicProfile) {
    return (
      <div className="text-center py-12">
        <Dna className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-600">No hay datos genómicos disponibles</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Sequence Quality Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Métricas de Calidad de Secuenciación
          </CardTitle>
          <CardDescription>
            Indicadores de calidad y cobertura del análisis genómico
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {genomicProfile.qualityMetrics.q30Percentage.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Calidad Q30</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {genomicProfile.qualityMetrics.averageCoverage.toFixed(1)}x
              </div>
              <div className="text-sm text-gray-600">Cobertura Promedio</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {(genomicProfile.qualityMetrics.mappedReads / 1000000).toFixed(0)}M
              </div>
              <div className="text-sm text-gray-600">Lecturas Mapeadas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {genomicProfile.qualityMetrics.duplicateRate.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Tasa de Duplicados</div>
            </div>
          </div>
          
          {genomicProfile.qualityMetrics.qualityPassed ? (
            <Alert className="mt-4">
              <TrendingUp className="h-4 w-4" />
              <AlertDescription>
                <strong>Calidad Aprobada:</strong> Los datos genómicos cumplen con todos los 
                estándares de calidad para análisis clínico.
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="mt-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Advertencia de Calidad:</strong> Algunos aspectos de la secuenciación 
                no cumplen con los estándares óptimos. Consulte con su genetista.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Disease Predisposition */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            Predisposición a Enfermedades
          </CardTitle>
          <CardDescription>
            Análisis de riesgo genético para condiciones comunes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {genomicProfile.diseasePredisposition?.map((disease) => (
              <div key={disease.condition} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-lg">{disease.condition}</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant={disease.evidenceLevel === 'definitive' ? 'default' : 'secondary'}>
                      Evidencia {disease.evidenceLevel}
                    </Badge>
                    <Badge variant={disease.riskScore > 70 ? 'destructive' : disease.riskScore > 40 ? 'default' : 'secondary'}>
                      {disease.riskScore > 70 ? 'Alto Riesgo' : disease.riskScore > 40 ? 'Riesgo Moderado' : 'Bajo Riesgo'}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Puntuación de Riesgo</div>
                    <div className="flex items-center gap-2">
                      <Progress value={disease.riskScore} className="flex-1" />
                      <span className="font-semibold">{disease.riskScore}%</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Riesgo Relativo</div>
                    <div className="text-lg font-semibold">{disease.relativeRisk}x</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Frecuencia Poblacional</div>
                    <div className="text-lg font-semibold">{(disease.populationFrequency * 100).toFixed(1)}%</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium mb-2">Factores de Riesgo:</h5>
                    <div className="flex flex-wrap gap-2">
                      {disease.riskFactors?.map((factor, index) => (
                        <Badge key={index} variant={factor.modifiable ? 'outline' : 'secondary'}>
                          {factor.factor} ({Math.round(factor.contribution * 100)}%)
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-medium mb-2">Recomendaciones:</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {disease.recommendations?.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-blue-600">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-medium mb-2">Variantes Asociadas:</h5>
                    <div className="space-y-2">
                      {disease.associatedVariants?.map((variant, index) => (
                        <div key={index} className="bg-gray-50 p-2 rounded text-sm">
                          <div className="flex items-center justify-between">
                            <span className="font-mono">
                              {variant.chromosome}:{variant.position} {variant.refAllele}>{variant.altAllele}
                            </span>
                            <Badge variant={variant.pathogenicity.clinvarSignificance === 'Pathogenic' ? 'destructive' : 'secondary'}>
                              {variant.pathogenicity.clinvarSignificance || 'VUS'}
                            </Badge>
                          </div>
                          {variant.geneSymbol && (
                            <div className="text-gray-600 mt-1">Gen: {variant.geneSymbol}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ancestry Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-blue-600" />
            Análisis de Ancestría
          </CardTitle>
          <CardDescription>
            Composición poblacional y relevancia médica
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">Composición Poblacional</h4>
              <div className="space-y-3">
                {genomicProfile.ancestry?.populations?.map((pop) => (
                  <div key={pop.population} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <div className="font-medium">{pop.population}</div>
                      <div className="text-sm text-gray-600">{pop.region}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{pop.percentage.toFixed(1)}%</div>
                      <div className="text-sm text-gray-600">Confianza: {Math.round(pop.confidence * 100)}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Implicaciones Médicas</h4>
              <div className="space-y-2">
                {genomicProfile.ancestry?.medicalRelevance?.map((relevance, index) => (
                  <div key={index} className="border rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">{relevance.condition}</h5>
                      <Badge variant="outline">
                        Riesgo: {(relevance.populationRisk * 100).toFixed(1)}%
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      Contribución ancestral: {Math.round(relevance.ancestryContribution * 100)}%
                    </div>
                    <ul className="text-sm space-y-1">
                      {relevance.recommendations?.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-blue-600">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Haplogrupos</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {genomicProfile.ancestry?.haplogroups?.map((haplo) => (
                  <div key={haplo.haplogroup} className="border rounded p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">{haplo.haplogroup}</h5>
                      <Badge variant="outline">{haplo.type}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{haplo.description}</p>
                    <div className="text-sm">
                      <div>Frecuencia: {(haplo.frequency * 100).toFixed(1)}%</div>
                      {haplo.medicalAssociations.length > 0 && (
                        <div className="mt-2">
                          <div className="font-medium">Asociaciones médicas:</div>
                          <ul className="mt-1">
                            {haplo.medicalAssociations.map((assoc, idx) => (
                              <li key={idx} className="text-gray-600">• {assoc}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Carrier Screening */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Baby className="h-5 w-5 text-pink-600" />
            Screening de Portadores
          </CardTitle>
          <CardDescription>
            Análisis de portadores para planificación reproductiva
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {genomicProfile.carrierScreening?.map((carrier) => (
              <div key={carrier.condition} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{carrier.condition}</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      carrier.carrierStatus === 'carrier' ? 'default' :
                      carrier.carrierStatus === 'affected' ? 'destructive' : 'secondary'
                    }>
                      {carrier.carrierStatus === 'carrier' ? 'Portador' :
                       carrier.carrierStatus === 'affected' ? 'Afectado' :
                       carrier.carrierStatus === 'non_carrier' ? 'No Portador' : 'Desconocido'}
                    </Badge>
                    {carrier.counselingRecommended && (
                      <Badge variant="outline">Consejería Recomendada</Badge>
                    )}
                  </div>
                </div>

                {carrier.carrierStatus === 'carrier' && (
                  <Alert className="mb-3">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Es portador de esta condición. Se recomienda evaluación genética 
                      de la pareja antes de la concepción.
                    </AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium mb-2">Riesgo Reproductivo:</h5>
                    <div className="space-y-1 text-sm">
                      <div>Hijo afectado: {(carrier.reproductiveRisk.affectedChildRisk * 100).toFixed(1)}%</div>
                      <div>Hijo portador: {(carrier.reproductiveRisk.carrierChildRisk * 100).toFixed(1)}%</div>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Recomendaciones:</h5>
                    <ul className="text-sm space-y-1">
                      {carrier.reproductiveRisk.recommendedTesting?.map((test, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-blue-600">•</span>
                          {test}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {carrier.variants.length > 0 && (
                  <div className="mt-4">
                    <h5 className="font-medium mb-2">Variantes Identificadas:</h5>
                    <div className="space-y-2">
                      {carrier.variants.map((variant, idx) => (
                        <div key={idx} className="bg-gray-50 p-2 rounded text-sm">
                          <div className="flex items-center justify-between">
                            <span className="font-mono">
                              {variant.chromosome}:{variant.position} {variant.refAllele}>{variant.altAllele}
                            </span>
                            <Badge variant="destructive">
                              {variant.pathogenicity.clinvarSignificance}
                            </Badge>
                          </div>
                          <div className="text-gray-600 mt-1">
                            Gen: {variant.geneSymbol} | {variant.consequence.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <Button variant="outline">
          <FileText className="h-4 w-4 mr-2" />
          Generar Reporte
        </Button>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Descargar VCF
        </Button>
        <Button variant="outline">
          <Search className="h-4 w-4 mr-2" />
          Explorar Variantes
        </Button>
      </div>
    </div>
  );
}
