
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Download, 
  Brain,
  Heart,
  Activity,
  Zap,
  Wind,
  Moon
} from 'lucide-react';

interface AdvancedHealthAnalyticsProps {
  patientId: string;
}

export default function AdvancedHealthAnalytics({ patientId }: AdvancedHealthAnalyticsProps) {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [predictions, setPredictions] = useState<any[]>([]);

  // Simulated advanced health data
  const healthTrends = [
    { date: '2024-06-01', heartRate: 72, bloodPressure: 120, stress: 3, sleep: 7.5, activity: 8500 },
    { date: '2024-06-02', heartRate: 75, bloodPressure: 118, stress: 4, sleep: 6.8, activity: 9200 },
    { date: '2024-06-03', heartRate: 68, bloodPressure: 122, stress: 2, sleep: 8.1, activity: 7800 },
    { date: '2024-06-04', heartRate: 71, bloodPressure: 119, stress: 5, sleep: 6.2, activity: 8900 },
    { date: '2024-06-05', heartRate: 74, bloodPressure: 121, stress: 3, sleep: 7.8, activity: 9500 },
    { date: '2024-06-06', heartRate: 69, bloodPressure: 117, stress: 2, sleep: 8.5, activity: 8200 },
    { date: '2024-06-07', heartRate: 73, bloodPressure: 120, stress: 4, sleep: 7.2, activity: 8800 },
  ];

  const sleepAnalysis = [
    { phase: 'Profundo', duration: 2.5, percentage: 31 },
    { phase: 'Ligero', duration: 4.2, percentage: 53 },
    { phase: 'REM', duration: 1.3, percentage: 16 }
  ];

  const stressPatterns = [
    { time: '06:00', level: 2 },
    { time: '09:00', level: 4 },
    { time: '12:00', level: 6 },
    { time: '15:00', level: 5 },
    { time: '18:00', level: 7 },
    { time: '21:00', level: 3 },
    { time: '23:00', level: 2 }
  ];

  const airQualityData = [
    { parameter: 'PM2.5', value: 15, limit: 25, status: 'good' },
    { parameter: 'PM10', value: 22, limit: 50, status: 'good' },
    { parameter: 'O3', value: 45, limit: 100, status: 'moderate' },
    { parameter: 'NO2', value: 18, limit: 40, status: 'good' }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
    // Simulate health alerts generation
    const generateAlerts = () => {
      const newAlerts = [
        {
          id: 1,
          type: 'critical',
          title: 'Frecuencia Cardíaca Elevada',
          message: 'Tu frecuencia cardíaca ha estado por encima de 85 bpm durante 2 horas',
          time: '2024-06-08T10:30:00Z',
          severity: 'high'
        },
        {
          id: 2,
          type: 'warning',
          title: 'Patrón de Sueño Irregular',
          message: 'Has dormido menos de 7 horas en los últimos 3 días',
          time: '2024-06-08T08:00:00Z',
          severity: 'medium'
        },
        {
          id: 3,
          type: 'info',
          title: 'Actividad Física Excelente',
          message: 'Has superado tu meta diaria de pasos en 5 días consecutivos',
          time: '2024-06-08T09:15:00Z',
          severity: 'low'
        }
      ];
      setAlerts(newAlerts);
    };

    // Simulate health predictions
    const generatePredictions = () => {
      const newPredictions = [
        {
          condition: 'Hipertensión',
          risk: 25,
          timeframe: '6 meses',
          factors: ['Estrés elevado', 'Actividad física irregular'],
          confidence: 78
        },
        {
          condition: 'Trastorno del Sueño',
          risk: 40,
          timeframe: '3 meses',
          factors: ['Patrones irregulares', 'Estrés nocturno'],
          confidence: 85
        }
      ];
      setPredictions(newPredictions);
    };

    generateAlerts();
    generatePredictions();
  }, [patientId]);

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      case 'medium': return <TrendingUp className="h-4 w-4" />;
      case 'low': return <Activity className="h-4 w-4" />;
      default: return <Heart className="h-4 w-4" />;
    }
  };

  const exportHealthData = () => {
    console.log('Exporting health data...');
    // Simulate data export
  };

  return (
    <div className="space-y-6">
      {/* Health Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Alertas de Salud
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {alerts.map((alert) => (
            <Alert key={alert.id} className="border-l-4">
              <div className="flex items-start gap-3">
                {getAlertIcon(alert.severity)}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{alert.title}</h4>
                    <Badge variant={getAlertColor(alert.severity)}>
                      {alert.severity === 'high' ? 'Crítico' : 
                       alert.severity === 'medium' ? 'Importante' : 'Información'}
                    </Badge>
                  </div>
                  <AlertDescription className="mt-1">
                    {alert.message}
                  </AlertDescription>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(alert.time).toLocaleString('es-MX')}
                  </p>
                </div>
              </div>
            </Alert>
          ))}
        </CardContent>
      </Card>

      {/* Predictive Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-500" />
            Análisis Predictivo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {predictions.map((prediction, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{prediction.condition}</h4>
                  <Badge variant={prediction.risk > 30 ? 'destructive' : 'secondary'}>
                    {prediction.risk}% riesgo
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  Periodo: {prediction.timeframe}
                </p>
                <div className="space-y-1">
                  <p className="text-xs font-medium">Factores de riesgo:</p>
                  {prediction.factors.map((factor: string, idx: number) => (
                    <p key={idx} className="text-xs text-gray-500">• {factor}</p>
                  ))}
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Confianza: {prediction.confidence}%
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Multi-metric Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Tendencias Integradas</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={healthTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString('es-MX', { month: 'short', day: 'numeric' })} />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip labelFormatter={(value) => new Date(value).toLocaleDateString('es-MX')} />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="heartRate" stroke="#ef4444" strokeWidth={2} name="Frecuencia Cardíaca" />
                <Line yAxisId="left" type="monotone" dataKey="bloodPressure" stroke="#3b82f6" strokeWidth={2} name="Presión Arterial" />
                <Line yAxisId="right" type="monotone" dataKey="stress" stroke="#f59e0b" strokeWidth={2} name="Nivel de Estrés" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Sleep Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Moon className="h-5 w-5 text-indigo-500" />
              Análisis de Sueño
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sleepAnalysis}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="percentage"
                  label={({ phase, percentage }) => `${phase}: ${percentage}%`}
                >
                  {sleepAnalysis.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Porcentaje']} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Stress Patterns */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Patrones de Estrés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={stressPatterns}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[0, 10]} />
                <Tooltip formatter={(value) => [`${value}/10`, 'Nivel de Estrés']} />
                <Area type="monotone" dataKey="level" stroke="#f59e0b" fill="#fbbf24" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Air Quality Monitor */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wind className="h-5 w-5 text-green-500" />
              Calidad del Aire
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {airQualityData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{item.parameter}</p>
                    <p className="text-sm text-gray-500">Límite: {item.limit}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">{item.value}</p>
                    <Badge variant={item.status === 'good' ? 'default' : 'secondary'}>
                      {item.status === 'good' ? 'Bueno' : 'Moderado'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity and Exercise Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Análisis de Actividad Física</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={healthTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString('es-MX', { month: 'short', day: 'numeric' })} />
              <YAxis />
              <Tooltip 
                labelFormatter={(value) => new Date(value).toLocaleDateString('es-MX')}
                formatter={(value) => [`${value} pasos`, 'Actividad']}
              />
              <Bar dataKey="activity" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Export and Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Exportar Datos de Salud</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button onClick={exportHealthData} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Descargar Informe Completo
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Compartir con Médico
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Generar Recomendaciones
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
