
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Camera, 
  TrendingUp, 
  Target, 
  AlertTriangle,
  CheckCircle,
  Upload,
  Zap,
  Activity
} from 'lucide-react';
import type { MedicalImageAnalysis, SymptomAnalysis, PredictiveHealthModel } from '@/types/advanced-ai';

interface AdvancedMedicalAIProps {
  patientId: string;
}

export default function AdvancedMedicalAI({ patientId }: AdvancedMedicalAIProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [symptoms, setSymptoms] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [imageAnalysis, setImageAnalysis] = useState<MedicalImageAnalysis | null>(null);
  const [symptomAnalysis, setSymptomAnalysis] = useState<SymptomAnalysis | null>(null);
  const [predictiveModel, setPredictiveModel] = useState<PredictiveHealthModel | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    try {
      // Mock análisis de imagen médica
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const mockAnalysis: MedicalImageAnalysis = {
        id: 'img-analysis-1',
        patientId,
        imageUrl: URL.createObjectURL(selectedFile),
        imageType: 'xray',
        analysisResults: {
          findings: [
            {
              category: 'Pulmonary',
              description: 'Posible infiltrado en lóbulo inferior derecho',
              severity: 'medium',
              confidence: 0.85,
              boundingBox: { x: 120, y: 80, width: 60, height: 40 },
              recommendation: 'Evaluación clínica adicional recomendada'
            },
            {
              category: 'Cardiac',
              description: 'Silueta cardíaca dentro de límites normales',
              severity: 'low',
              confidence: 0.92,
              recommendation: 'Sin hallazgos significativos'
            }
          ],
          confidence: 0.87,
          processingTime: 2.3,
          model: 'MedicalVision-AI-v2.1',
          version: '2.1.0'
        },
        createdAt: new Date().toISOString()
      };

      setImageAnalysis(mockAnalysis);
    } catch (error) {
      console.error('Error analyzing image:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeSymptoms = async () => {
    if (!symptoms.trim()) return;

    setIsAnalyzing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const mockSymptomAnalysis: SymptomAnalysis = {
        id: 'symptom-analysis-1',
        patientId,
        symptoms: [
          {
            symptom: 'Dolor de cabeza',
            severity: 6,
            duration: '2 días',
            frequency: 'Intermitente'
          },
          {
            symptom: 'Fiebre',
            severity: 7,
            duration: '1 día',
            frequency: 'Constante'
          }
        ],
        analysis: {
          possibleConditions: [
            {
              condition: 'Infección viral respiratoria',
              icd10Code: 'J06.9',
              probability: 0.75,
              severity: 'moderate',
              description: 'Infección viral común del tracto respiratorio superior',
              commonTreatments: ['Reposo', 'Hidratación', 'Analgésicos']
            },
            {
              condition: 'Migraña',
              icd10Code: 'G43.9',
              probability: 0.45,
              severity: 'moderate',
              description: 'Episodio de cefalea primaria',
              commonTreatments: ['Triptanes', 'Antiinflamatorios', 'Reposo en ambiente oscuro']
            }
          ],
          urgencyLevel: 'medium',
          recommendations: [
            'Monitorear temperatura corporal',
            'Mantener hidratación adecuada',
            'Consultar médico si los síntomas empeoran'
          ],
          nextSteps: [
            'Evaluación médica en 24-48 horas',
            'Pruebas de laboratorio si persiste fiebre'
          ],
          disclaimers: [
            'Este análisis es solo informativo',
            'No reemplaza la evaluación médica profesional',
            'Busque atención médica inmediata si presenta síntomas graves'
          ]
        },
        createdAt: new Date().toISOString()
      };

      setSymptomAnalysis(mockSymptomAnalysis);
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generatePredictiveModel = async () => {
    setIsAnalyzing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2500));

      const mockPredictiveModel: PredictiveHealthModel = {
        id: 'pred-model-1',
        patientId,
        modelType: 'cardiovascular_risk',
        inputFeatures: {
          age: 45,
          bmi: 26.5,
          systolicBP: 135,
          diastolicBP: 85,
          cholesterol: 220,
          smoking: false,
          diabetes: false,
          familyHistory: true
        },
        predictions: {
          riskScore: 0.15,
          timeframe: '10 años',
          confidence: 0.89,
          riskFactors: [
            'Presión arterial ligeramente elevada',
            'Colesterol borderline alto',
            'Historia familiar de enfermedad cardiovascular'
          ],
          preventiveActions: [
            'Reducir ingesta de sodio',
            'Aumentar actividad física a 150 min/semana',
            'Control periódico de presión arterial',
            'Dieta baja en grasas saturadas'
          ]
        },
        lastUpdated: new Date().toISOString(),
        nextUpdateDue: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
      };

      setPredictiveModel(mockPredictiveModel);
    } catch (error) {
      console.error('Error generating predictive model:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'default';
      case 'medium': return 'secondary';
      case 'high': return 'destructive';
      case 'critical': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center">
          <Brain className="h-6 w-6 mr-2" />
          IA Médica Avanzada
        </h2>
        <Badge variant="outline">
          <Zap className="h-3 w-3 mr-1" />
          Powered by AI
        </Badge>
      </div>

      <Tabs defaultValue="image-analysis" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="image-analysis">Análisis de Imágenes</TabsTrigger>
          <TabsTrigger value="symptom-analysis">Análisis de Síntomas</TabsTrigger>
          <TabsTrigger value="predictive-health">Salud Predictiva</TabsTrigger>
        </TabsList>

        <TabsContent value="image-analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Camera className="h-5 w-5 mr-2" />
                Análisis de Imágenes Médicas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Subir Imagen Médica (Rayos X, Resonancia, TAC, etc.)
                </label>
                <div className="flex items-center space-x-4">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="flex-1"
                  />
                  <Button 
                    onClick={analyzeImage} 
                    disabled={!selectedFile || isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <Activity className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Upload className="h-4 w-4 mr-2" />
                    )}
                    Analizar
                  </Button>
                </div>
              </div>

              {selectedFile && (
                <div className="mt-4">
                  <img 
                    src={URL.createObjectURL(selectedFile)} 
                    alt="Medical image" 
                    className="max-w-md mx-auto rounded-lg shadow-lg"
                  />
                </div>
              )}

              {imageAnalysis && (
                <div className="mt-6 space-y-4">
                  <h3 className="text-lg font-semibold">Resultados del Análisis</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="font-semibold text-xl">
                        {(imageAnalysis.analysisResults.confidence * 100).toFixed(1)}%
                      </div>
                      <div className="text-sm text-gray-600">Confianza</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="font-semibold text-xl">
                        {imageAnalysis.analysisResults.processingTime}s
                      </div>
                      <div className="text-sm text-gray-600">Tiempo de Análisis</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="font-semibold text-xl">
                        {imageAnalysis.analysisResults.findings.length}
                      </div>
                      <div className="text-sm text-gray-600">Hallazgos</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {imageAnalysis.analysisResults.findings.map((finding, index) => (
                      <Card key={index}>
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start mb-2">
                            <Badge variant={getSeverityColor(finding.severity)}>
                              {finding.category}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              Confianza: {(finding.confidence * 100).toFixed(1)}%
                            </span>
                          </div>
                          <p className="font-medium mb-2">{finding.description}</p>
                          <p className="text-sm text-gray-600">{finding.recommendation}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="symptom-analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Análisis de Síntomas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Describe tus síntomas
                </label>
                <Textarea
                  placeholder="Ej: Tengo dolor de cabeza desde hace 2 días, fiebre de 38°C, y me siento cansado..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  rows={4}
                />
              </div>

              <Button 
                onClick={analyzeSymptoms} 
                disabled={!symptoms.trim() || isAnalyzing}
                className="w-full"
              >
                {isAnalyzing ? (
                  <Activity className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Brain className="h-4 w-4 mr-2" />
                )}
                Analizar Síntomas
              </Button>

              {symptomAnalysis && (
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Análisis Completado</h3>
                    <Badge variant={symptomAnalysis.analysis.urgencyLevel === 'high' ? 'destructive' : 'secondary'}>
                      Urgencia: {symptomAnalysis.analysis.urgencyLevel}
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Posibles Condiciones:</h4>
                      {symptomAnalysis.analysis.possibleConditions.map((condition, index) => (
                        <Card key={index} className="mb-2">
                          <CardContent className="pt-4">
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="font-medium">{condition.condition}</h5>
                              <div className="text-right">
                                <div className="text-sm font-medium">
                                  {(condition.probability * 100).toFixed(0)}%
                                </div>
                                <Progress value={condition.probability * 100} className="w-20 h-2" />
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{condition.description}</p>
                            <div className="text-xs text-gray-500">
                              Código ICD-10: {condition.icd10Code}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Recomendaciones:</h4>
                      <ul className="space-y-1">
                        {symptomAnalysis.analysis.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2 text-yellow-800">Importante:</h4>
                      <ul className="space-y-1">
                        {symptomAnalysis.analysis.disclaimers.map((disclaimer, index) => (
                          <li key={index} className="text-sm text-yellow-700">
                            • {disclaimer}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictive-health" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Modelo Predictivo de Salud
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Genera predicciones personalizadas basadas en tu historial médico y factores de riesgo.
              </p>

              <Button 
                onClick={generatePredictiveModel} 
                disabled={isAnalyzing}
                className="w-full"
              >
                {isAnalyzing ? (
                  <Activity className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Target className="h-4 w-4 mr-2" />
                )}
                Generar Modelo Predictivo
              </Button>

              {predictiveModel && (
                <div className="mt-6 space-y-4">
                  <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {(predictiveModel.predictions.riskScore * 100).toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-600">
                      Riesgo cardiovascular a {predictiveModel.predictions.timeframe}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Confianza: {(predictiveModel.predictions.confidence * 100).toFixed(1)}%
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Factores de Riesgo</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {predictiveModel.predictions.riskFactors.map((factor, index) => (
                            <li key={index} className="flex items-start">
                              <AlertTriangle className="h-4 w-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{factor}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Acciones Preventivas</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {predictiveModel.predictions.preventiveActions.map((action, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{action}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="text-xs text-gray-500 text-center">
                    Próxima actualización: {new Date(predictiveModel.nextUpdateDue).toLocaleDateString()}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
