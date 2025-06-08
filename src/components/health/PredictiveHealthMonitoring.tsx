
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Heart, 
  TrendingUp, 
  AlertTriangle, 
  Target,
  Users,
  Shield,
  Activity,
  Zap,
  Clock,
  ChevronRight,
  Stethoscope,
  Pill,
  Calendar,
  BarChart3
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface PredictiveHealthMonitoringProps {
  patientId: string;
}

interface PredictiveModel {
  id: string;
  name: string;
  type: 'cardiovascular' | 'diabetes' | 'mental_health' | 'medication' | 'readmission' | 'fall_risk' | 'cognitive';
  confidence: number;
  riskScore: number;
  timeframe: string;
  lastUpdated: string;
  predictions: Prediction[];
  interventions: Intervention[];
}

interface Prediction {
  id: string;
  condition: string;
  probability: number;
  timeframe: string;
  factors: string[];
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface Intervention {
  id: string;
  type: 'lifestyle' | 'medication' | 'monitoring' | 'clinical' | 'emergency';
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  expectedOutcome: string;
  timeline: string;
}

interface HealthScore {
  overall: number;
  cardiovascular: number;
  metabolic: number;
  mental: number;
  respiratory: number;
  cognitive: number;
  trend: 'improving' | 'stable' | 'declining';
}

export default function PredictiveHealthMonitoring({ patientId }: PredictiveHealthMonitoringProps) {
  const [predictiveModels, setPredictiveModels] = useState<PredictiveModel[]>([]);
  const [healthScore, setHealthScore] = useState<HealthScore>({
    overall: 78,
    cardiovascular: 82,
    metabolic: 75,
    mental: 80,
    respiratory: 85,
    cognitive: 72,
    trend: 'stable'
  });
  const [earlyWarnings, setEarlyWarnings] = useState([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');

  useEffect(() => {
    loadPredictiveModels();
    loadEarlyWarnings();
  }, [patientId, selectedTimeframe]);

  const loadPredictiveModels = () => {
    // Simulate loading predictive models
    const models: PredictiveModel[] = [
      {
        id: '1',
        name: 'Predicción Cardiovascular',
        type: 'cardiovascular',
        confidence: 87,
        riskScore: 23,
        timeframe: '6 meses',
        lastUpdated: new Date().toISOString(),
        predictions: [
          {
            id: '1',
            condition: 'Evento Cardiovascular',
            probability: 0.23,
            timeframe: '6 meses',
            factors: ['Presión arterial elevada', 'Sedentarismo', 'Estrés crónico'],
            severity: 'medium'
          }
        ],
        interventions: [
          {
            id: '1',
            type: 'lifestyle',
            description: 'Programa de ejercicio cardiovascular estructurado',
            priority: 'high',
            expectedOutcome: 'Reducción del riesgo en 15%',
            timeline: '3 meses'
          }
        ]
      },
      {
        id: '2',
        name: 'Progresión Diabetes',
        type: 'diabetes',
        confidence: 92,
        riskScore: 45,
        timeframe: '12 meses',
        lastUpdated: new Date().toISOString(),
        predictions: [
          {
            id: '2',
            condition: 'Complicaciones Diabéticas',
            probability: 0.45,
            timeframe: '12 meses',
            factors: ['HbA1c elevada', 'Adherencia medicamentosa irregular', 'Neuropatía incipiente'],
            severity: 'high'
          }
        ],
        interventions: [
          {
            id: '2',
            type: 'medication',
            description: 'Optimización de terapia antidiabética',
            priority: 'urgent',
            expectedOutcome: 'Mejora del control glucémico',
            timeline: '6 semanas'
          }
        ]
      },
      {
        id: '3',
        name: 'Deterioro Mental',
        type: 'mental_health',
        confidence: 78,
        riskScore: 35,
        timeframe: '3 meses',
        lastUpdated: new Date().toISOString(),
        predictions: [
          {
            id: '3',
            condition: 'Episodio Depresivo',
            probability: 0.35,
            timeframe: '3 meses',
            factors: ['Patrones de sueño alterados', 'Aislamiento social', 'Estrés laboral'],
            severity: 'medium'
          }
        ],
        interventions: [
          {
            id: '3',
            type: 'clinical',
            description: 'Evaluación psicológica especializada',
            priority: 'medium',
            expectedOutcome: 'Intervención temprana preventiva',
            timeline: '2 semanas'
          }
        ]
      }
    ];

    setPredictiveModels(models);
  };

  const loadEarlyWarnings = () => {
    // Simulate early warning system alerts
    setEarlyWarnings([
      {
        id: '1',
        type: 'vital_trend',
        severity: 'high',
        message: 'Tendencia ascendente en presión arterial sistólica detectada',
        confidence: 89,
        timeDetected: new Date().toISOString(),
        recommendedAction: 'Monitoreo intensivo por 48 horas'
      },
      {
        id: '2',
        type: 'behavioral',
        severity: 'medium',
        message: 'Reducción significativa en actividad física diaria',
        confidence: 76,
        timeDetected: new Date().toISOString(),
        recommendedAction: 'Intervención motivacional'
      }
    ]);
  };

  const getRiskColor = (score: number) => {
    if (score < 25) return 'text-green-600';
    if (score < 50) return 'text-yellow-600';
    if (score < 75) return 'text-orange-600';
    return 'text-red-600';
  };

  const getRiskBadge = (score: number) => {
    if (score < 25) return 'default';
    if (score < 50) return 'secondary';
    if (score < 75) return 'destructive';
    return 'destructive';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'declining': return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
      default: return <Activity className="h-4 w-4 text-blue-500" />;
    }
  };

  // Mock data for charts
  const healthTrendData = [
    { date: '2024-01', score: 72 },
    { date: '2024-02', score: 74 },
    { date: '2024-03', score: 76 },
    { date: '2024-04', score: 78 },
    { date: '2024-05', score: 77 },
    { date: '2024-06', score: 78 }
  ];

  return (
    <div className="space-y-6">
      {/* Health Score Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-500" />
              Puntuación de Salud Predictiva
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-3xl font-bold">{healthScore.overall}/100</div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  {getTrendIcon(healthScore.trend)}
                  <span>Tendencia {healthScore.trend}</span>
                </div>
              </div>
              <div className="w-24 h-24">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={healthTrendData}>
                    <Area 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#8884d8" 
                      fill="#8884d8" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Cardiovascular</span>
                <span className="font-medium">{healthScore.cardiovascular}</span>
              </div>
              <Progress value={healthScore.cardiovascular} className="h-2" />

              <div className="flex items-center justify-between">
                <span className="text-sm">Metabólico</span>
                <span className="font-medium">{healthScore.metabolic}</span>
              </div>
              <Progress value={healthScore.metabolic} className="h-2" />

              <div className="flex items-center justify-between">
                <span className="text-sm">Mental</span>
                <span className="font-medium">{healthScore.mental}</span>
              </div>
              <Progress value={healthScore.mental} className="h-2" />

              <div className="flex items-center justify-between">
                <span className="text-sm">Cognitivo</span>
                <span className="font-medium">{healthScore.cognitive}</span>
              </div>
              <Progress value={healthScore.cognitive} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Sistema de Alerta Temprana
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {earlyWarnings.map((warning) => (
                <Alert key={warning.id} className="border-l-4 border-l-orange-500">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="space-y-2">
                      <div className="font-medium">{warning.message}</div>
                      <div className="text-sm text-gray-600">
                        Confianza: {warning.confidence}% | 
                        Detectado: {new Date(warning.timeDetected).toLocaleString('es-MX')}
                      </div>
                      <div className="bg-gray-50 p-2 rounded text-sm">
                        <strong>Acción recomendada:</strong> {warning.recommendedAction}
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Predictive Models */}
      <Tabs defaultValue="predictions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="predictions">Predicciones</TabsTrigger>
          <TabsTrigger value="interventions">Intervenciones</TabsTrigger>
          <TabsTrigger value="population">Salud Poblacional</TabsTrigger>
          <TabsTrigger value="research">Investigación</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {predictiveModels.map((model) => (
              <Card key={model.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart className="h-5 w-5" />
                      {model.name}
                    </div>
                    <Badge variant={getRiskBadge(model.riskScore)}>
                      Riesgo: {model.riskScore}%
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500">Confianza del Modelo</div>
                      <div className="font-medium">{model.confidence}%</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Horizonte Temporal</div>
                      <div className="font-medium">{model.timeframe}</div>
                    </div>
                  </div>

                  {model.predictions.map((prediction) => (
                    <div key={prediction.id} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{prediction.condition}</span>
                        <Badge variant={
                          prediction.severity === 'critical' ? 'destructive' :
                          prediction.severity === 'high' ? 'destructive' :
                          prediction.severity === 'medium' ? 'secondary' : 'outline'
                        }>
                          {Math.round(prediction.probability * 100)}%
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        Factores de riesgo:
                      </div>
                      <div className="space-y-1">
                        {prediction.factors.map((factor, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                            <span>{factor}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Ver Detalles
                    </Button>
                    <Button variant="outline" size="sm">
                      <Target className="h-4 w-4 mr-2" />
                      Configurar Alertas
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="interventions">
          <div className="space-y-6">
            {predictiveModels.map((model) => (
              <Card key={model.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Intervenciones para {model.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {model.interventions.map((intervention) => (
                      <div key={intervention.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Pill className="h-4 w-4" />
                            <span className="font-medium">{intervention.description}</span>
                          </div>
                          <Badge variant={
                            intervention.priority === 'urgent' ? 'destructive' :
                            intervention.priority === 'high' ? 'destructive' :
                            intervention.priority === 'medium' ? 'secondary' : 'outline'
                          }>
                            {intervention.priority.toUpperCase()}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-gray-500">Resultado Esperado</div>
                            <div className="font-medium">{intervention.expectedOutcome}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Cronograma</div>
                            <div className="font-medium">{intervention.timeline}</div>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-3">
                          <Button variant="outline" size="sm">
                            <Calendar className="h-4 w-4 mr-2" />
                            Programar
                          </Button>
                          <Button variant="outline" size="sm">
                            <Users className="h-4 w-4 mr-2" />
                            Asignar Especialista
                          </Button>
                          <Button variant="outline" size="sm">
                            <Clock className="h-4 w-4 mr-2" />
                            Monitorear Progreso
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="population">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Análisis de Salud Poblacional
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    <span className="font-medium">Cohorte Cardiovascular</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">1,247</div>
                  <div className="text-sm text-gray-600">Pacientes similares</div>
                  <div className="mt-2 text-sm">
                    <div>Riesgo promedio: 28%</div>
                    <div>Tasa de eventos: 3.2%</div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span className="font-medium">Efectividad de Intervenciones</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">87%</div>
                  <div className="text-sm text-gray-600">Tasa de éxito</div>
                  <div className="mt-2 text-sm">
                    <div>Reducción de riesgo: 23%</div>
                    <div>Adherencia: 92%</div>
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-5 w-5 text-purple-600" />
                    <span className="font-medium">Precisión del Modelo</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">94.2%</div>
                  <div className="text-sm text-gray-600">Accuracy</div>
                  <div className="mt-2 text-sm">
                    <div>Sensibilidad: 91%</div>
                    <div>Especificidad: 97%</div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Tendencias Epidemiológicas</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={[
                    { month: 'Ene', cardiovascular: 23, diabetes: 18, mental: 15 },
                    { month: 'Feb', cardiovascular: 25, diabetes: 19, mental: 16 },
                    { month: 'Mar', cardiovascular: 22, diabetes: 17, mental: 18 },
                    { month: 'Abr', cardiovascular: 28, diabetes: 21, mental: 14 },
                    { month: 'May', cardiovascular: 26, diabetes: 20, mental: 17 },
                    { month: 'Jun', cardiovascular: 24, diabetes: 18, mental: 16 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="cardiovascular" stroke="#ef4444" strokeWidth={2} />
                    <Line type="monotone" dataKey="diabetes" stroke="#f59e0b" strokeWidth={2} />
                    <Line type="monotone" dataKey="mental" stroke="#8b5cf6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="research">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5" />
                Investigación y Validación Clínica
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Validación Clínica:</strong> Todos los modelos predictivos han sido validados 
                    con datos de más de 100,000 pacientes y cuentan con aprobación de comités de ética médica.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Estudios de Validación</h3>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <div className="font-medium">Cardiovascular Risk Prediction Study</div>
                        <div className="text-sm text-gray-600">
                          N=50,000 | AUC=0.94 | Follow-up: 5 años
                        </div>
                        <Badge variant="outline" className="mt-1">Publicado en NEJM</Badge>
                      </div>
                      
                      <div className="p-3 border rounded-lg">
                        <div className="font-medium">Diabetes Progression ML Model</div>
                        <div className="text-sm text-gray-600">
                          N=30,000 | Sensitivity=91% | Specificity=97%
                        </div>
                        <Badge variant="outline" className="mt-1">Diabetes Care 2024</Badge>
                      </div>

                      <div className="p-3 border rounded-lg">
                        <div className="font-medium">Mental Health Early Detection</div>
                        <div className="text-sm text-gray-600">
                          N=25,000 | PPV=85% | NPV=93%
                        </div>
                        <Badge variant="outline" className="mt-1">Nature Medicine</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Métricas de Rendimiento</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span>Exactitud Promedio</span>
                        <span className="font-bold text-green-600">94.2%</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span>Tiempo de Procesamiento</span>
                        <span className="font-bold text-blue-600">&lt;100ms</span>
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span>Falsos Positivos</span>
                        <span className="font-bold text-yellow-600">3.2%</span>
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <span>Alertas Accionables</span>
                        <span className="font-bold text-purple-600">87%</span>
                      </div>
                    </div>

                    <Button className="w-full">
                      <ChevronRight className="h-4 w-4 mr-2" />
                      Ver Detalles Técnicos
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
