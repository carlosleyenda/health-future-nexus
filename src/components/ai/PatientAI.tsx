import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, Calendar, BookOpen, AlertTriangle, Activity, 
  Pill, Phone, TrendingUp, Shield
} from 'lucide-react';
import AIChat from './AIChat';
import { useRoleBasedAI } from '@/hooks/useRoleBasedAI';

export default function PatientAI() {
  const { config, hasCapability } = useRoleBasedAI();
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [newSymptom, setNewSymptom] = useState('');

  const addSymptom = () => {
    if (newSymptom.trim() && !symptoms.includes(newSymptom.trim())) {
      setSymptoms([...symptoms, newSymptom.trim()]);
      setNewSymptom('');
    }
  };

  const removeSymptom = (symptom: string) => {
    setSymptoms(symptoms.filter(s => s !== symptom));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">{config.title}</h1>
        <p className="text-muted-foreground">{config.description}</p>
      </div>

      {/* Disclaimer */}
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          <strong>Importante:</strong> Esta IA es solo para información educativa. 
          No reemplaza el consejo médico profesional. Consulte siempre a su médico.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main AI Tools */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="symptoms" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="symptoms">Síntomas</TabsTrigger>
              <TabsTrigger value="wellness">Bienestar</TabsTrigger>
              <TabsTrigger value="education">Educación</TabsTrigger>
              <TabsTrigger value="emergency">Emergencia</TabsTrigger>
            </TabsList>

            {hasCapability('symptom_analysis') && (
              <TabsContent value="symptoms">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Análisis de Síntomas
                    </CardTitle>
                    <CardDescription>
                      Describe tus síntomas para obtener información educativa básica
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        value={newSymptom}
                        onChange={(e) => setNewSymptom(e.target.value)}
                        placeholder="Ej: dolor de cabeza, fiebre..."
                        onKeyPress={(e) => e.key === 'Enter' && addSymptom()}
                      />
                      <Button onClick={addSymptom} variant="outline">
                        Agregar
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {symptoms.map((symptom) => (
                        <Badge key={symptom} variant="secondary" className="cursor-pointer" onClick={() => removeSymptom(symptom)}>
                          {symptom} ×
                        </Badge>
                      ))}
                    </div>

                    {symptoms.length > 0 && (
                      <Button className="w-full">
                        Analizar Síntomas
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {hasCapability('wellness_tracking') && (
              <TabsContent value="wellness">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5" />
                      Seguimiento de Bienestar
                    </CardTitle>
                    <CardDescription>
                      Monitorea y mejora tu salud general
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="h-20 flex flex-col gap-2">
                        <Activity className="h-6 w-6" />
                        <span className="text-sm">Actividad Física</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex flex-col gap-2">
                        <Heart className="h-6 w-6" />
                        <span className="text-sm">Signos Vitales</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex flex-col gap-2">
                        <Pill className="h-6 w-6" />
                        <span className="text-sm">Medicamentos</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex flex-col gap-2">
                        <TrendingUp className="h-6 w-6" />
                        <span className="text-sm">Progreso</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {hasCapability('health_education') && (
              <TabsContent value="education">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Educación en Salud
                    </CardTitle>
                    <CardDescription>
                      Aprende sobre condiciones, tratamientos y prevención
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Condiciones Comunes
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Heart className="h-4 w-4 mr-2" />
                        Prevención Cardiovascular
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Activity className="h-4 w-4 mr-2" />
                        Ejercicio y Nutrición
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Pill className="h-4 w-4 mr-2" />
                        Uso Seguro de Medicamentos
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {hasCapability('emergency_detection') && (
              <TabsContent value="emergency">
                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600">
                      <AlertTriangle className="h-5 w-5" />
                      Detección de Emergencias
                    </CardTitle>
                    <CardDescription>
                      Evaluación rápida de situaciones urgentes
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert className="border-red-200">
                      <Phone className="h-4 w-4" />
                      <AlertDescription>
                        En caso de emergencia médica real, llama al <strong>911</strong> inmediatamente
                      </AlertDescription>
                    </Alert>
                    
                    <div className="grid grid-cols-1 gap-3">
                      <Button variant="outline" className="justify-start border-orange-200">
                        <AlertTriangle className="h-4 w-4 mr-2 text-orange-500" />
                        Dolor de Pecho
                      </Button>
                      <Button variant="outline" className="justify-start border-red-200">
                        <AlertTriangle className="h-4 w-4 mr-2 text-red-500" />
                        Dificultad para Respirar
                      </Button>
                      <Button variant="outline" className="justify-start border-yellow-200">
                        <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                        Síntomas Neurológicos
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>

        {/* AI Chat Assistant */}
        <div>
          <AIChat
            context="medical"
            title="Asistente Personal"
            placeholder="Pregunta sobre tu salud, síntomas, medicamentos..."
          />
          
          {/* Quick Actions */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-sm">Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {hasCapability('appointment_scheduling') && (
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Agendar Cita
                </Button>
              )}
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Heart className="h-4 w-4 mr-2" />
                Ver Mi Perfil de Salud
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <BookOpen className="h-4 w-4 mr-2" />
                Historial Médico
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Mis Funcionalidades de IA</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {config.mainFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}