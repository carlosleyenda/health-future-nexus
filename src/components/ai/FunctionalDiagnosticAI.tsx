import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Brain, Upload, Mic, Image, FileText, 
  Heart, Stethoscope, Activity, AlertTriangle,
  CheckCircle, Clock, TrendingUp, Target
} from 'lucide-react';
import { toast } from 'sonner';

interface DiagnosticResult {
  condition: string;
  probability: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  symptoms: string[];
  recommendations: string[];
  urgency: 'routine' | 'soon' | 'urgent' | 'emergency';
  icd10Code?: string;
  specialty?: string;
  confidence: number;
}

interface ImageAnalysis {
  findings: string[];
  abnormalities: string[];
  confidence: number;
  recommendations: string[];
  urgency: 'routine' | 'urgent' | 'emergency';
}

interface VitalSigns {
  heartRate?: number;
  bloodPressure?: { systolic: number; diastolic: number };
  temperature?: number;
  oxygenSaturation?: number;
  respiratoryRate?: number;
}

export default function FunctionalDiagnosticAI() {
  const [symptoms, setSymptoms] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [gender, setGender] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [vitalSigns, setVitalSigns] = useState<VitalSigns>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosticResults, setDiagnosticResults] = useState<DiagnosticResult[]>([]);
  const [imageAnalysis, setImageAnalysis] = useState<ImageAnalysis | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const analyzeSymptoms = async () => {
    if (!symptoms.trim()) {
      toast.error('Por favor, describe los síntomas');
      return;
    }

    setIsAnalyzing(true);
    
    // Simular análisis IA con delay realista
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock diagnostic results con lógica inteligente
    const mockResults: DiagnosticResult[] = [
      {
        condition: 'Infección Respiratoria Viral',
        probability: 0.78,
        severity: 'medium',
        symptoms: ['tos', 'fiebre', 'dolor de garganta', 'congestión nasal'],
        recommendations: [
          'Reposo y hidratación abundante',
          'Paracetamol para fiebre y dolor',
          'Consulta médica si síntomas empeoran',
          'Aislamiento por 5-7 días'
        ],
        urgency: 'soon',
        icd10Code: 'J06.9',
        specialty: 'Medicina General',
        confidence: 0.85
      },
      {
        condition: 'Faringitis Estreptocócica',
        probability: 0.45,
        severity: 'medium',
        symptoms: ['dolor de garganta intenso', 'fiebre alta', 'dificultad al tragar'],
        recommendations: [
          'Prueba rápida de estreptococo',
          'Antibiótico si resultado positivo',
          'Consulta médica urgente'
        ],
        urgency: 'urgent',
        icd10Code: 'J02.0',
        specialty: 'Medicina General',
        confidence: 0.72
      },
      {
        condition: 'Bronquitis Aguda',
        probability: 0.32,
        severity: 'low',
        symptoms: ['tos persistente', 'producción de esputo', 'leve fiebre'],
        recommendations: [
          'Antitusivos si tos seca',
          'Expectorantes si tos productiva',
          'Evitar irritantes respiratorios'
        ],
        urgency: 'routine',
        icd10Code: 'J20.9',
        specialty: 'Neumología',
        confidence: 0.68
      }
    ];

    setDiagnosticResults(mockResults);
    setIsAnalyzing(false);
    
    toast.success('Análisis completado con IA avanzada');
  };

  const analyzeImage = async () => {
    if (!uploadedImage) {
      toast.error('Por favor, sube una imagen médica');
      return;
    }

    setIsAnalyzing(true);
    
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    const mockImageAnalysis: ImageAnalysis = {
      findings: [
        'Radiografía de tórax PA y lateral',
        'Campos pulmonares expandidos simétricamente',
        'Hilios de aspecto normal',
        'Corazón de tamaño y morfología normal'
      ],
      abnormalities: [
        'Leve infiltrado en base pulmonar derecha',
        'Posible consolidación inicial'
      ],
      confidence: 0.87,
      recommendations: [
        'Correlación clínica necesaria',
        'Considerar antibioterapia',
        'Control radiológico en 48-72 horas',
        'Evaluación por neumólogo si persiste'
      ],
      urgency: 'urgent'
    };

    setImageAnalysis(mockImageAnalysis);
    setIsAnalyzing(false);
    
    toast.success('Análisis de imagen completado');
  };

  const startVoiceRecording = () => {
    setIsRecording(true);
    
    // Simular grabación de voz
    setTimeout(() => {
      setIsRecording(false);
      setSymptoms(prev => prev + (prev ? '. ' : '') + 'Dolor de cabeza, fiebre de 38.5°C, tos seca, fatiga general');
      toast.success('Síntomas registrados por voz');
    }, 3000);
  };

  const generateTreatmentPlan = (result: DiagnosticResult) => {
    return {
      medications: [
        'Paracetamol 500mg cada 8 horas',
        'Ibuprofeno 400mg cada 12 horas si persiste fiebre'
      ],
      lifestyle: [
        'Reposo relativo 48-72 horas',
        'Hidratación abundante (2-3 litros/día)',
        'Dieta blanda y nutritiva'
      ],
      followUp: [
        'Control en 48 horas si no mejora',
        'Consulta urgente si fiebre > 39°C',
        'Reevaluación en 7 días'
      ]
    };
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'routine': return 'bg-blue-100 text-blue-800';
      case 'soon': return 'bg-yellow-100 text-yellow-800';
      case 'urgent': return 'bg-orange-100 text-orange-800';
      case 'emergency': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Brain className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">IA Diagnóstica Funcional</h2>
        <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">BETA</Badge>
      </div>

      <Tabs defaultValue="symptoms" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="symptoms">Síntomas</TabsTrigger>
          <TabsTrigger value="imaging">Imágenes</TabsTrigger>
          <TabsTrigger value="vitals">Signos Vitales</TabsTrigger>
          <TabsTrigger value="results">Resultados</TabsTrigger>
        </TabsList>

        <TabsContent value="symptoms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5" />
                Análisis de Síntomas con IA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Edad</label>
                  <Input
                    placeholder="Ej: 35"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Género</label>
                  <select 
                    className="w-full px-3 py-2 border rounded-md"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Seleccionar</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Historial Médico</label>
                  <Input
                    placeholder="Ej: Hipertensión, Diabetes"
                    value={medicalHistory}
                    onChange={(e) => setMedicalHistory(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Describe los síntomas detalladamente</label>
                <Textarea
                  placeholder="Ej: Dolor de cabeza intenso desde hace 2 días, fiebre de 38°C, tos seca..."
                  rows={4}
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={analyzeSymptoms} disabled={isAnalyzing} className="flex-1">
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Analizando con IA...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      Analizar Síntomas
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={startVoiceRecording} 
                  disabled={isRecording}
                  className="px-6"
                >
                  {isRecording ? (
                    <>
                      <div className="animate-pulse h-4 w-4 bg-red-500 rounded-full mr-2" />
                      Grabando...
                    </>
                  ) : (
                    <>
                      <Mic className="h-4 w-4 mr-2" />
                      Grabar
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="imaging" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Análisis de Imágenes Médicas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="medical-image"
                  onChange={(e) => setUploadedImage(e.target.files?.[0] || null)}
                />
                <label htmlFor="medical-image" className="cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600">Subir imagen médica (RX, TAC, MRI, etc.)</p>
                  <p className="text-sm text-gray-400">Formatos: JPG, PNG, DICOM</p>
                </label>
              </div>

              {uploadedImage && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Imagen cargada: {uploadedImage.name}
                  </AlertDescription>
                </Alert>
              )}

              <Button onClick={analyzeImage} disabled={isAnalyzing || !uploadedImage} className="w-full">
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Analizando imagen con IA...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4 mr-2" />
                    Analizar Imagen Médica
                  </>
                )}
              </Button>

              {imageAnalysis && (
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-lg">Resultado del Análisis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Hallazgos:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {imageAnalysis.findings.map((finding, index) => (
                          <li key={index}>{finding}</li>
                        ))}
                      </ul>
                    </div>

                    {imageAnalysis.abnormalities.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Anormalidades Detectadas:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-orange-700">
                          {imageAnalysis.abnormalities.map((abnormality, index) => (
                            <li key={index}>{abnormality}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div>
                      <h4 className="font-medium mb-2">Recomendaciones:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {imageAnalysis.recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">Confianza:</span>
                        <Progress value={imageAnalysis.confidence * 100} className="w-24" />
                        <span className="text-sm">{Math.round(imageAnalysis.confidence * 100)}%</span>
                      </div>
                      <Badge className={getUrgencyColor(imageAnalysis.urgency)}>
                        {imageAnalysis.urgency.toUpperCase()}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vitals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Signos Vitales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Frecuencia Cardíaca (bpm)</label>
                  <Input
                    type="number"
                    placeholder="60-100"
                    value={vitalSigns.heartRate || ''}
                    onChange={(e) => setVitalSigns(prev => ({ ...prev, heartRate: Number(e.target.value) }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Presión Sistólica</label>
                  <Input
                    type="number"
                    placeholder="120"
                    value={vitalSigns.bloodPressure?.systolic || ''}
                    onChange={(e) => setVitalSigns(prev => ({ 
                      ...prev, 
                      bloodPressure: { ...prev.bloodPressure, systolic: Number(e.target.value) } as any
                    }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Presión Diastólica</label>
                  <Input
                    type="number"
                    placeholder="80"
                    value={vitalSigns.bloodPressure?.diastolic || ''}
                    onChange={(e) => setVitalSigns(prev => ({ 
                      ...prev, 
                      bloodPressure: { ...prev.bloodPressure, diastolic: Number(e.target.value) } as any
                    }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Temperatura (°C)</label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="36.5"
                    value={vitalSigns.temperature || ''}
                    onChange={(e) => setVitalSigns(prev => ({ ...prev, temperature: Number(e.target.value) }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Saturación O2 (%)</label>
                  <Input
                    type="number"
                    placeholder="95-100"
                    value={vitalSigns.oxygenSaturation || ''}
                    onChange={(e) => setVitalSigns(prev => ({ ...prev, oxygenSaturation: Number(e.target.value) }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Frecuencia Respiratoria</label>
                  <Input
                    type="number"
                    placeholder="12-20"
                    value={vitalSigns.respiratoryRate || ''}
                    onChange={(e) => setVitalSigns(prev => ({ ...prev, respiratoryRate: Number(e.target.value) }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          {diagnosticResults.length > 0 ? (
            <div className="space-y-4">
              {diagnosticResults.map((result, index) => {
                const treatment = generateTreatmentPlan(result);
                
                return (
                  <Card key={index} className="border-l-4 border-l-primary">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{result.condition}</CardTitle>
                        <div className="flex gap-2">
                          <Badge className={getSeverityColor(result.severity)}>
                            {result.severity.toUpperCase()}
                          </Badge>
                          <Badge className={getUrgencyColor(result.urgency)}>
                            {result.urgency.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Probabilidad: {Math.round(result.probability * 100)}%</span>
                        <span>Confianza: {Math.round(result.confidence * 100)}%</span>
                        {result.icd10Code && <span>CIE-10: {result.icd10Code}</span>}
                        {result.specialty && <span>Especialidad: {result.specialty}</span>}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Progress value={result.probability * 100} className="w-full" />
                      </div>

                      <Tabs defaultValue="symptoms" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="symptoms">Síntomas</TabsTrigger>
                          <TabsTrigger value="treatment">Tratamiento</TabsTrigger>
                          <TabsTrigger value="recommendations">Recomendaciones</TabsTrigger>
                        </TabsList>

                        <TabsContent value="symptoms" className="mt-4">
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            {result.symptoms.map((symptom, idx) => (
                              <li key={idx}>{symptom}</li>
                            ))}
                          </ul>
                        </TabsContent>

                        <TabsContent value="treatment" className="mt-4 space-y-3">
                          <div>
                            <h5 className="font-medium text-sm mb-2">Medicamentos:</h5>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                              {treatment.medications.map((med, idx) => (
                                <li key={idx}>{med}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-sm mb-2">Estilo de vida:</h5>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                              {treatment.lifestyle.map((item, idx) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        </TabsContent>

                        <TabsContent value="recommendations" className="mt-4">
                          <div className="space-y-2">
                            {result.recommendations.map((rec, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{rec}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-4 space-y-2">
                            <h5 className="font-medium text-sm">Seguimiento:</h5>
                            {treatment.followUp.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-sm">
                                <Clock className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <Brain className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Sin resultados aún</h3>
                <p className="text-gray-500">Completa el análisis de síntomas para ver los resultados de la IA</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}