import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Stethoscope, FileText, Brain, Users, Camera, 
  Pill, ChartBar, Shield, BookOpen, Activity
} from 'lucide-react';
import AIChat from './AIChat';
import { useRoleBasedAI } from '@/hooks/useRoleBasedAI';

export default function DoctorAI() {
  const { config, hasCapability } = useRoleBasedAI();
  const [patientSymptoms, setPatientSymptoms] = useState('');
  const [clinicalNotes, setClinicalNotes] = useState('');
  const [medications, setMedications] = useState('');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">{config.title}</h1>
        <p className="text-muted-foreground">{config.description}</p>
      </div>

      {/* Professional Disclaimer */}
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          <strong>Responsabilidad Profesional:</strong> Esta IA proporciona apoyo diagnóstico basado en evidencia. 
          La decisión clínica final y la responsabilidad médica siempre recae en el profesional de la salud.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Professional AI Tools */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="diagnosis" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="diagnosis">Diagnóstico</TabsTrigger>
              <TabsTrigger value="documentation">Documentación</TabsTrigger>
              <TabsTrigger value="prescriptions">Recetas</TabsTrigger>
              <TabsTrigger value="imaging">Imágenes</TabsTrigger>
              <TabsTrigger value="research">Investigación</TabsTrigger>
            </TabsList>

            {hasCapability('medical_diagnosis') && (
              <TabsContent value="diagnosis">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Stethoscope className="h-5 w-5" />
                      Apoyo Diagnóstico Inteligente
                    </CardTitle>
                    <CardDescription>
                      IA avanzada para diagnóstico diferencial y recomendaciones clínicas
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Síntomas y Hallazgos Clínicos</label>
                      <Textarea
                        value={patientSymptoms}
                        onChange={(e) => setPatientSymptoms(e.target.value)}
                        placeholder="Ingrese síntomas, signos vitales, hallazgos físicos, historia clínica relevante..."
                        className="min-h-[100px]"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline">
                        <Brain className="h-4 w-4 mr-2" />
                        Diagnóstico Diferencial
                      </Button>
                      <Button variant="outline">
                        <Activity className="h-4 w-4 mr-2" />
                        Análisis de Riesgo
                      </Button>
                      <Button variant="outline">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Guías Clínicas
                      </Button>
                      <Button variant="outline">
                        <ChartBar className="h-4 w-4 mr-2" />
                        Probabilidades
                      </Button>
                    </div>

                    <Button className="w-full" disabled={!patientSymptoms.trim()}>
                      Generar Análisis Diagnóstico
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {hasCapability('medical_documentation') && (
              <TabsContent value="documentation">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Documentación Médica Automática
                    </CardTitle>
                    <CardDescription>
                      Generación inteligente de notas SOAP, reportes y documentación clínica
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Notas Clínicas</label>
                      <Textarea
                        value={clinicalNotes}
                        onChange={(e) => setClinicalNotes(e.target.value)}
                        placeholder="Dictado o notas libres de la consulta..."
                        className="min-h-[120px]"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 gap-3">
                      <Button variant="outline" className="justify-start">
                        <FileText className="h-4 w-4 mr-2" />
                        Generar Nota SOAP
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Códigos ICD-10 Sugeridos
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Users className="h-4 w-4 mr-2" />
                        Resumen para Paciente
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <ChartBar className="h-4 w-4 mr-2" />
                        Reporte Ejecutivo
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {hasCapability('prescription_writing') && (
              <TabsContent value="prescriptions">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Pill className="h-5 w-5" />
                      Asistente de Prescripciones
                    </CardTitle>
                    <CardDescription>
                      IA para prescripciones seguras con verificación de interacciones
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Medicamentos Actuales del Paciente</label>
                      <Input
                        value={medications}
                        onChange={(e) => setMedications(e.target.value)}
                        placeholder="Lista de medicamentos actuales separados por coma..."
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline">
                        <Pill className="h-4 w-4 mr-2" />
                        Verificar Interacciones
                      </Button>
                      <Button variant="outline">
                        <Activity className="h-4 w-4 mr-2" />
                        Dosificación Sugerida
                      </Button>
                      <Button variant="outline">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Alternativas Genéricas
                      </Button>
                      <Button variant="outline">
                        <Shield className="h-4 w-4 mr-2" />
                        Contraindicaciones
                      </Button>
                    </div>

                    <Alert>
                      <Pill className="h-4 w-4" />
                      <AlertDescription>
                        Siempre verificar dosis, contraindicaciones e interacciones antes de prescribir
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            <TabsContent value="imaging">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5" />
                    Análisis de Imágenes Médicas
                  </CardTitle>
                  <CardDescription>
                    IA para análisis radiológico y diagnóstico por imágenes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex flex-col gap-2">
                      <Camera className="h-6 w-6" />
                      <span className="text-sm">Rayos X</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col gap-2">
                      <Activity className="h-6 w-6" />
                      <span className="text-sm">Tomografía</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col gap-2">
                      <Brain className="h-6 w-6" />
                      <span className="text-sm">Resonancia</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col gap-2">
                      <Stethoscope className="h-6 w-6" />
                      <span className="text-sm">Ecografía</span>
                    </Button>
                  </div>
                  
                  <Alert>
                    <Camera className="h-4 w-4" />
                    <AlertDescription>
                      La interpretación de imágenes médicas requiere validación por radiólogo certificado
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="research">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Investigación y Evidencia
                  </CardTitle>
                  <CardDescription>
                    Acceso a literatura médica y medicina basada en evidencia
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Búsqueda en PubMed
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <ChartBar className="h-4 w-4 mr-2" />
                      Metaanálisis Recientes
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="h-4 w-4 mr-2" />
                      Guías Actualizadas
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Ensayos Clínicos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Professional AI Chat */}
        <div>
          <AIChat
            context="clinical"
            title="Consultor Clínico IA"
            placeholder="Consulte diagnósticos diferenciales, tratamientos, dosis, interacciones..."
          />
          
          {/* Professional Metrics */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-sm">Métricas Profesionales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Consultas IA Hoy</span>
                <Badge variant="secondary">24</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Precisión Diagnóstica</span>
                <Badge variant="secondary">94%</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tiempo Ahorrado</span>
                <Badge variant="secondary">3.2h</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Professional Features */}
      <Card>
        <CardHeader>
          <CardTitle>Herramientas Profesionales Disponibles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {config.mainFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}