
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Brain, Stethoscope, AlertTriangle, Pill, BookOpen,
  Users, TrendingUp, Activity, Heart, Camera, FileText, CheckCircle 
} from 'lucide-react';
import { useMedicalAI } from '@/hooks/usePersonalizedAI';
import { useAuthStore } from '@/store/auth';
import AIChat from './AIChat';
import MedicalDiagnosticAI from './MedicalDiagnosticAI';

export default function MedicalAIAssistant() {
  const { user } = useAuthStore();
  const { 
    analyzeSymptoms, 
    checkDrugInteractions, 
    getHealthEducation, 
    detectEmergency,
    canUseMedicalAI 
  } = useMedicalAI();

  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [newSymptom, setNewSymptom] = useState('');
  const [medications, setMedications] = useState<string[]>([]);
  const [newMedication, setNewMedication] = useState('');
  const [analysisResult, setAnalysisResult] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [emergencyDescription, setEmergencyDescription] = useState('');

  const addSymptom = () => {
    if (newSymptom.trim() && !symptoms.includes(newSymptom.trim())) {
      setSymptoms([...symptoms, newSymptom.trim()]);
      setNewSymptom('');
    }
  };

  const removeSymptom = (symptom: string) => {
    setSymptoms(symptoms.filter(s => s !== symptom));
  };

  const addMedication = () => {
    if (newMedication.trim() && !medications.includes(newMedication.trim())) {
      setMedications([...medications, newMedication.trim()]);
      setNewMedication('');
    }
  };

  const removeMedication = (medication: string) => {
    setMedications(medications.filter(m => m !== medication));
  };

  const handleSymptomAnalysis = async () => {
    if (symptoms.length === 0) return;
    
    setIsAnalyzing(true);
    try {
      const result = await analyzeSymptoms(symptoms);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDrugInteractionCheck = async () => {
    if (medications.length < 2) return;
    
    setIsAnalyzing(true);
    try {
      const result = await checkDrugInteractions(medications);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Error checking drug interactions:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleEmergencyDetection = async () => {
    if (!emergencyDescription.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const result = await detectEmergency(emergencyDescription);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Error detecting emergency:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (!canUseMedicalAI) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-amber-500" />
          <p className="text-gray-600">No tienes permisos para usar el asistente médico de IA.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Disclaimer */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Importante:</strong> Este asistente de IA es solo para apoyo educativo y diagnóstico. 
          No reemplaza el juicio médico profesional. Siempre consulte con un médico calificado 
          para diagnósticos y tratamientos definitivos.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enhanced AI Tools Panel */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-600" />
                Asistente Médico de IA Avanzado
              </CardTitle>
              <CardDescription>
                Suite completa de herramientas de IA para diagnóstico, análisis de imágenes y documentación médica
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="diagnostic" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="diagnostic">Diagnóstico</TabsTrigger>
                  <TabsTrigger value="imaging">Imágenes</TabsTrigger>
                  <TabsTrigger value="nlp">Documentación</TabsTrigger>
                  <TabsTrigger value="precision">Medicina Precisa</TabsTrigger>
                  <TabsTrigger value="learning">Aprendizaje</TabsTrigger>
                </TabsList>

                <TabsContent value="diagnostic">
                  <MedicalDiagnosticAI />
                </TabsContent>

                <TabsContent value="imaging">
                  <div className="space-y-4">
                    <h3 className="font-semibold mb-2">Análisis de Imágenes Médicas</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
                        <Camera className="h-6 w-6" />
                        <span className="text-sm">Dermatología</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
                        <Activity className="h-6 w-6" />
                        <span className="text-sm">Radiología</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
                        <Heart className="h-6 w-6" />
                        <span className="text-sm">Cardiología</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex flex-col items-center gap-2">
                        <Stethoscope className="h-6 w-6" />
                        <span className="text-sm">Patología</span>
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="nlp">
                  <div className="space-y-4">
                    <h3 className="font-semibold mb-2">Procesamiento de Lenguaje Natural</h3>
                    <div className="grid grid-cols-1 gap-3">
                      <Button variant="outline" className="justify-start">
                        <FileText className="h-4 w-4 mr-2" />
                        Generación de Notas SOAP
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Códigos ICD-10 Automáticos
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Users className="h-4 w-4 mr-2" />
                        Resúmenes para Pacientes
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Análisis de Literatura
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="precision">
                  <div className="space-y-4">
                    <h3 className="font-semibold mb-2">Medicina de Precisión</h3>
                    <Alert>
                      <Brain className="h-4 w-4" />
                      <AlertDescription>
                        Análisis genómico y farmacogenómico para tratamiento personalizado
                      </AlertDescription>
                    </Alert>
                    <div className="grid grid-cols-1 gap-3">
                      <Button variant="outline" className="justify-start">
                        <Pill className="h-4 w-4 mr-2" />
                        Dosificación Personalizada
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Activity className="h-4 w-4 mr-2" />
                        Predicción de Respuesta
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Users className="h-4 w-4 mr-2" />
                        Ensayos Clínicos
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="learning">
                  <div className="space-y-4">
                    <h3 className="font-semibold mb-2">Aprendizaje Continuo</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">94.2%</div>
                            <div className="text-sm text-gray-600">Precisión del Modelo</div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">125K</div>
                            <div className="text-sm text-gray-600">Casos Entrenados</div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        El sistema utiliza aprendizaje federado para mejorar continuamente 
                        manteniendo la privacidad de los datos del paciente.
                      </AlertDescription>
                    </Alert>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* AI Chat Assistant */}
        <div>
          <AIChat
            context="medical"
            title="Asistente Diagnóstico IA"
            placeholder="Consulte sobre síntomas, diagnósticos diferenciales, guías clínicas..."
          />
        </div>
      </div>

      {/* AI Performance Metrics for Medical Professionals */}
      {user?.role === 'doctor' && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Diagnósticos Hoy</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <Stethoscope className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Precisión IA</p>
                  <p className="text-2xl font-bold">94%</p>
                </div>
                <Brain className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Imágenes Analizadas</p>
                  <p className="text-2xl font-bold">18</p>
                </div>
                <Camera className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tiempo Ahorrado</p>
                  <p className="text-2xl font-bold">3.2h</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Alertas Críticas</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
