
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Stethoscope, 
  Camera, 
  FileText, 
  Zap, 
  AlertTriangle, 
  CheckCircle,
  Eye,
  Heart,
  Pill,
  BookOpen,
  Microscope,
  Activity,
  Upload,
  Scan,
  TrendingUp
} from 'lucide-react';

interface DiagnosticResult {
  condition: string;
  probability: number;
  severity: 'low' | 'moderate' | 'high' | 'critical';
  redFlags: string[];
  recommendations: string[];
  urgencyLevel: number;
  specialtyReferral?: string;
  icdCode?: string;
}

interface ImageAnalysisResult {
  findings: string[];
  confidence: number;
  recommendations: string[];
  urgency: 'routine' | 'urgent' | 'immediate';
  specialty: string;
}

interface TreatmentRecommendation {
  therapy: string;
  dosage?: string;
  duration: string;
  responseTime: string;
  sideEffects: string[];
  alternatives: string[];
  monitoring: string[];
}

export default function MedicalDiagnosticAI() {
  const [symptoms, setSymptoms] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientGender, setPatientGender] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [diagnosticResults, setDiagnosticResults] = useState<DiagnosticResult[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageAnalysis, setImageAnalysis] = useState<ImageAnalysisResult | null>(null);
  const [clinicalNotes, setClinicalNotes] = useState('');
  const [documentationResult, setDocumentationResult] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSymptomAnalysis = async () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      const mockResults: DiagnosticResult[] = [
        {
          condition: 'Viral Upper Respiratory Infection',
          probability: 0.85,
          severity: 'low',
          redFlags: [],
          recommendations: ['Rest', 'Fluids', 'Symptomatic treatment'],
          urgencyLevel: 2,
          icdCode: 'J06.9'
        },
        {
          condition: 'Bacterial Pneumonia',
          probability: 0.15,
          severity: 'moderate',
          redFlags: ['Fever >38.5°C', 'Chest pain'],
          recommendations: ['Chest X-ray', 'Complete blood count', 'Consider antibiotics'],
          urgencyLevel: 7,
          specialtyReferral: 'Pulmonology',
          icdCode: 'J15.9'
        }
      ];
      setDiagnosticResults(mockResults);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleImageAnalysis = async () => {
    if (!imageFile) return;
    
    setIsAnalyzing(true);
    setTimeout(() => {
      const mockAnalysis: ImageAnalysisResult = {
        findings: [
          'No obvious malignant features detected',
          'Symmetric pigmentation pattern',
          'Regular border definition'
        ],
        confidence: 0.92,
        recommendations: [
          'Routine dermatologic follow-up in 6 months',
          'Patient education on skin self-examination',
          'Sun protection counseling'
        ],
        urgency: 'routine',
        specialty: 'Dermatology'
      };
      setImageAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleDocumentationAssist = async () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const structured = `
CHIEF COMPLAINT: ${symptoms}

HISTORY OF PRESENT ILLNESS:
Patient presents with ${symptoms}. 

ASSESSMENT AND PLAN:
Based on clinical presentation and analysis, differential diagnosis includes:
${diagnosticResults.map(result => `- ${result.condition} (${Math.round(result.probability * 100)}%)`).join('\n')}

RECOMMENDATIONS:
${diagnosticResults.flatMap(result => result.recommendations).join('\n- ')}

ICD-10 CODES:
${diagnosticResults.filter(r => r.icdCode).map(r => `${r.icdCode} - ${r.condition}`).join('\n')}
      `;
      setDocumentationResult(structured);
      setIsAnalyzing(false);
    }, 1500);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'moderate': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Disclaimer */}
      <Alert>
        <Brain className="h-4 w-4" />
        <AlertDescription>
          <strong>AI Diagnostic Assistant:</strong> Esta herramienta proporciona apoyo diagnóstico basado en IA. 
          Siempre debe combinarse con el juicio clínico profesional y no reemplaza la evaluación médica directa.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Symptom Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5" />
              Análisis de Síntomas
            </CardTitle>
            <CardDescription>
              Ingrese los síntomas y datos del paciente para análisis diagnóstico
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Edad del paciente"
                value={patientAge}
                onChange={(e) => setPatientAge(e.target.value)}
              />
              <Input
                placeholder="Género"
                value={patientGender}
                onChange={(e) => setPatientGender(e.target.value)}
              />
            </div>
            
            <Textarea
              placeholder="Describa los síntomas principales..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              rows={3}
            />
            
            <Textarea
              placeholder="Historia médica relevante..."
              value={medicalHistory}
              onChange={(e) => setMedicalHistory(e.target.value)}
              rows={2}
            />
            
            <Button 
              onClick={handleSymptomAnalysis}
              disabled={isAnalyzing || !symptoms}
              className="w-full"
            >
              <Brain className="h-4 w-4 mr-2" />
              {isAnalyzing ? 'Analizando...' : 'Analizar Síntomas'}
            </Button>
          </CardContent>
        </Card>

        {/* Image Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Análisis de Imágenes Médicas
            </CardTitle>
            <CardDescription>
              Subir imágenes para análisis dermatológico, radiológico o patológico
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600">
                Arrastre una imagen aquí o haga clic para seleccionar
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload">
                <Button variant="outline" className="mt-2" asChild>
                  <span>Seleccionar Imagen</span>
                </Button>
              </label>
            </div>
            
            {imageFile && (
              <div className="text-sm text-gray-600">
                Archivo seleccionado: {imageFile.name}
              </div>
            )}
            
            <Button 
              onClick={handleImageAnalysis}
              disabled={isAnalyzing || !imageFile}
              className="w-full"
            >
              <Scan className="h-4 w-4 mr-2" />
              {isAnalyzing ? 'Analizando Imagen...' : 'Analizar Imagen'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Diagnostic Results */}
      {diagnosticResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Microscope className="h-5 w-5" />
              Resultados Diagnósticos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {diagnosticResults.map((result, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg">{result.condition}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {Math.round(result.probability * 100)}% probabilidad
                      </Badge>
                      <Badge className={getSeverityColor(result.severity)}>
                        {result.severity}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="text-sm text-gray-600 mb-1">Nivel de urgencia</div>
                    <Progress value={result.urgencyLevel * 10} className="h-2" />
                    <div className="text-xs text-gray-500 mt-1">
                      {result.urgencyLevel}/10
                    </div>
                  </div>

                  {result.redFlags.length > 0 && (
                    <Alert className="mb-3">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Banderas rojas:</strong> {result.redFlags.join(', ')}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <strong>Recomendaciones:</strong>
                      <ul className="list-disc list-inside mt-1">
                        {result.recommendations.map((rec, idx) => (
                          <li key={idx}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                    
                    {result.specialtyReferral && (
                      <div>
                        <strong>Referencia a especialidad:</strong>
                        <p className="mt-1">{result.specialtyReferral}</p>
                      </div>
                    )}
                  </div>

                  {result.icdCode && (
                    <div className="mt-3 text-xs text-gray-500">
                      Código ICD-10: {result.icdCode}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Image Analysis Results */}
      {imageAnalysis && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Análisis de Imagen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Confianza del análisis</span>
                <Badge variant="outline">
                  {Math.round(imageAnalysis.confidence * 100)}%
                </Badge>
              </div>
              
              <Progress value={imageAnalysis.confidence * 100} />
              
              <div>
                <h4 className="font-semibold mb-2">Hallazgos:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {imageAnalysis.findings.map((finding, idx) => (
                    <li key={idx}>{finding}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Recomendaciones:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {imageAnalysis.recommendations.map((rec, idx) => (
                    <li key={idx}>{rec}</li>
                  ))}
                </ul>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <span>
                  <strong>Urgencia:</strong> {imageAnalysis.urgency}
                </span>
                <span>
                  <strong>Especialidad:</strong> {imageAnalysis.specialty}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Documentation Assistant */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Asistente de Documentación
          </CardTitle>
          <CardDescription>
            Generación automática de notas clínicas y códigos ICD-10
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Ingrese notas clínicas adicionales..."
            value={clinicalNotes}
            onChange={(e) => setClinicalNotes(e.target.value)}
            rows={3}
          />
          
          <Button 
            onClick={handleDocumentationAssist}
            disabled={isAnalyzing || diagnosticResults.length === 0}
            className="w-full"
          >
            <FileText className="h-4 w-4 mr-2" />
            Generar Documentación
          </Button>
          
          {documentationResult && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Documentación Generada:</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <pre className="text-sm whitespace-pre-wrap">{documentationResult}</pre>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Precisión Diagnóstica</p>
                <p className="text-2xl font-bold">94.2%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Casos Analizados</p>
                <p className="text-2xl font-bold">12,847</p>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tiempo Ahorrado</p>
                <p className="text-2xl font-bold">3.5h</p>
              </div>
              <Zap className="h-8 w-8 text-purple-600" />
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
    </div>
  );
}
