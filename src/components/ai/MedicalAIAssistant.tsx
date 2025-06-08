
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
  Users, TrendingUp, Activity, Heart 
} from 'lucide-react';
import { useMedicalAI } from '@/hooks/usePersonalizedAI';
import { useAuthStore } from '@/store/auth';
import AIChat from './AIChat';

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
          <strong>Importante:</strong> Este asistente de IA es solo para apoyo educativo y no reemplaza 
          el juicio médico profesional. Siempre consulte con un médico calificado para diagnósticos 
          y tratamientos definitivos.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Panel de herramientas */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-600" />
                Asistente Médico de IA
              </CardTitle>
              <CardDescription>
                Herramientas avanzadas para apoyo en diagnóstico y análisis médico
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="symptoms" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="symptoms">Síntomas</TabsTrigger>
                  <TabsTrigger value="drugs">Medicamentos</TabsTrigger>
                  <TabsTrigger value="emergency">Emergencias</TabsTrigger>
                  <TabsTrigger value="education">Educación</TabsTrigger>
                </TabsList>

                <TabsContent value="symptoms" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Análisis de Síntomas</h3>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Ingresa un síntoma..."
                          value={newSymptom}
                          onChange={(e) => setNewSymptom(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addSymptom()}
                        />
                        <Button onClick={addSymptom}>Agregar</Button>
                      </div>
                    </div>

                    {symptoms.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Síntomas ingresados:</p>
                        <div className="flex flex-wrap gap-2">
                          {symptoms.map((symptom, index) => (
                            <Badge 
                              key={index} 
                              variant="secondary" 
                              className="cursor-pointer"
                              onClick={() => removeSymptom(symptom)}
                            >
                              {symptom} ×
                            </Badge>
                          ))}
                        </div>
                        <Button 
                          onClick={handleSymptomAnalysis}
                          disabled={isAnalyzing}
                          className="w-full"
                        >
                          <Stethoscope className="h-4 w-4 mr-2" />
                          {isAnalyzing ? 'Analizando...' : 'Analizar Síntomas'}
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="drugs" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Verificación de Interacciones</h3>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Ingresa un medicamento..."
                          value={newMedication}
                          onChange={(e) => setNewMedication(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addMedication()}
                        />
                        <Button onClick={addMedication}>Agregar</Button>
                      </div>
                    </div>

                    {medications.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Medicamentos:</p>
                        <div className="flex flex-wrap gap-2">
                          {medications.map((medication, index) => (
                            <Badge 
                              key={index} 
                              variant="secondary" 
                              className="cursor-pointer"
                              onClick={() => removeMedication(medication)}
                            >
                              {medication} ×
                            </Badge>
                          ))}
                        </div>
                        {medications.length >= 2 && (
                          <Button 
                            onClick={handleDrugInteractionCheck}
                            disabled={isAnalyzing}
                            className="w-full"
                          >
                            <Pill className="h-4 w-4 mr-2" />
                            {isAnalyzing ? 'Verificando...' : 'Verificar Interacciones'}
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="emergency" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Detector de Emergencias</h3>
                      <Textarea
                        placeholder="Describe la situación médica..."
                        value={emergencyDescription}
                        onChange={(e) => setEmergencyDescription(e.target.value)}
                        rows={4}
                      />
                    </div>
                    
                    <Button 
                      onClick={handleEmergencyDetection}
                      disabled={isAnalyzing || !emergencyDescription.trim()}
                      className="w-full"
                      variant="destructive"
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      {isAnalyzing ? 'Evaluando...' : 'Evaluar Urgencia'}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="education" className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Educación en Salud</h3>
                    <p className="text-sm text-muted-foreground">
                      Usa el chat de IA para obtener información educativa sobre condiciones de salud, 
                      tratamientos y prevención.
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Diabetes
                      </Button>
                      <Button variant="outline" size="sm">
                        <Heart className="h-4 w-4 mr-2" />
                        Hipertensión
                      </Button>
                      <Button variant="outline" size="sm">
                        <Activity className="h-4 w-4 mr-2" />
                        Ejercicio
                      </Button>
                      <Button variant="outline" size="sm">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Nutrición
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Resultados del análisis */}
              {analysisResult && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Resultado del Análisis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="whitespace-pre-wrap">{analysisResult}</p>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Chat de IA */}
        <div>
          <AIChat
            context="medical"
            title={user?.role === 'doctor' ? 'Asistente Clínico' : 'Asistente de Salud'}
            placeholder={
              user?.role === 'doctor' 
                ? 'Pregunta sobre diagnóstico, tratamiento o guidelines...'
                : 'Pregunta sobre salud, síntomas o prevención...'
            }
          />
        </div>
      </div>

      {/* Estadísticas rápidas para doctores */}
      {user?.role === 'doctor' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Consultas Hoy</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
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
                  <p className="text-sm font-medium text-muted-foreground">Tiempo Ahorrado</p>
                  <p className="text-2xl font-bold">2.5h</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Alertas Críticas</p>
                  <p className="text-2xl font-bold">3</p>
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
